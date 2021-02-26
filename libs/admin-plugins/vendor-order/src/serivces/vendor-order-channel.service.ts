import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import {
    ProductVariant,
    ProductVariantService,
    RequestContext,
    translateDeep,
    Channel,
    Order,
    ConfigService,
    CustomerService,
    ListQueryBuilder,
    SessionService,
    CachedSession, Product, OrderLine, OrderService, ChannelService, TransactionalConnection, isGraphQlErrorResult
} from "@vendure/core";
import {Translated} from "@vendure/core/dist/common/types/locale-types";
import { ID, PaginatedList } from '@vendure/common/lib/shared-types';
import {OrderStateMachine} from "@vendure/core/dist/service/helpers/order-state-machine/order-state-machine";
import { DEFAULT_CHANNEL_CODE } from '@vendure/common/lib/shared-constants';

@Injectable()
export class VendorOrderChannelService {
    constructor(
        private connection: TransactionalConnection,
        private configService: ConfigService,
        private productVariantService: ProductVariantService,
        private customerService: CustomerService,
        private orderStateMachine: OrderStateMachine,
        private listQueryBuilder: ListQueryBuilder,
        private sessionService: SessionService,
        private orderService: OrderService,
        private channelService: ChannelService
    ) {
    }

    async findChannelByOrder(orderId: ID): Promise<Channel | undefined> {
        let order = await this.connection
            .getRepository(Order)
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.channels', 'channel')
            .leftJoinAndSelect('channel.defaultShippingZone', 'defaultShippingZone')
            .leftJoinAndSelect('channel.defaultTaxZone', 'defaultTaxZone')
            .where('order.id = :orderId', { orderId })
            .getOne();
        if(order){
            if(order.channels.length > 1){
                return order.channels.find(o=> o.code !== DEFAULT_CHANNEL_CODE)
            } else {
                return order.channels[0];
            }
        }
    }

    async getOrderByOrderLine(ctx: RequestContext, orderLineId : ID) : Promise<Order> {
        let order = await this.connection
            .getRepository(OrderLine)
            .createQueryBuilder('orderLine')
            .leftJoinAndSelect('orderLine.order', 'order')
            .where('orderLine.id = :orderLineId', { orderLineId })
            .getOne()
            .then((result) => {
                if (result) {
                    return result.order
                }
                throw new Error('Cannot found OrderLine');
            });
        let orders = ctx.session?.activeOrderId
            ? await this.getPreviousOrderSession(ctx.session, ctx.session.activeOrderId, ctx)
            : [];
        if(orders.length > 0 && orders.find(o=> o.id === order.id)){
            return order;
        } else {
            throw new Error('You are not in Order Session')
        }

    }

    async checkChannelByProductVariantId(ctx: RequestContext, productVariantId: ID, channelId: ID): Promise<boolean | undefined> {
        return await this.connection
            .getRepository(ProductVariant)
            .createQueryBuilder('variant')
            .leftJoinAndSelect('variant.product', 'product')
            .leftJoinAndSelect('product.channels', 'channel')
            .where('variant.id = :id', { id: productVariantId })
            .getOne()
            .then((result) => {
                if (result) {
                    let find = result.product.channels.find(o => (o.id === channelId));
                    if(find){
                        return true
                    }
                }
                throw new Error('Product cannot assign to channel');
            });
    }

    async getActiveOrderForUser(ctx: RequestContext, userId: ID): Promise<Order[] | []> {
        const customer = await this.customerService.findOneByUserId(ctx, userId);
        if (customer) {
            // find all active order for user
            const activeOrder = await this.connection.getRepository(Order).find({
                where: {
                    customer,
                    active: true,
                },
            });
            if (activeOrder) {
                return activeOrder
            }
        }
        return [];
    }

    async getActiveOrderForUserAndChannel(ctx: RequestContext, userId: ID, channelId?: ID): Promise<Order[] | []> {
        const customer = await this.customerService.findOneByUserId(ctx, userId);
        if (customer) {
            const order = await this.connection
                .getRepository(Order)
                .createQueryBuilder('order')
                .innerJoinAndSelect('order.customer', 'customer')
                .innerJoinAndSelect('order.channels', 'channel')
                .where('customer.id = :customerId', { customerId: userId })
                .andWhere('order.active = true')
                .andWhere('channel.id = :channelId', { channelId: channelId })
                .getMany();

            if(order){
                return order
            }
        }
        return [];
    }

    async createOrder(ctx: RequestContext, userId?: ID, orderCode?: string, channelId?: ID): Promise<Order> {

        if(!orderCode || !channelId){
            throw new Error('Please input orderCode, channelID');
        }

        const newOrder = new Order({
            code: await this.configService.orderOptions.orderCodeStrategy.generate(ctx),
            state: this.orderStateMachine.getInitialState(),
            lines: [],
            couponCodes: [],
            shippingAddress: {},
            billingAddress: {},
            pendingAdjustments: [],
            subTotal: 0,
            subTotalBeforeTax: 0,
            currencyCode: ctx.channel.currencyCode,
            customFields: {
                session: orderCode
            }
        });
        if (userId) {
            const customer = await this.customerService.findOneByUserId(ctx, userId);
            if (customer) {
                newOrder.customer = customer;
            }
        }

        let defaultChannel = await this.channelService.getDefaultChannel();
        let channels = [ defaultChannel ] as any;
        if(defaultChannel.id !== channelId){
            let channel = await this.channelService.findOne(ctx, channelId);
            channels.push(channel);
        }
        newOrder.channels = channels;
        const order = await this.connection.getRepository(Order).save(newOrder);
        const transitionResult = await this.orderService.transitionToState(ctx, order.id, 'AddingItems');
        if (isGraphQlErrorResult(transitionResult)) {
            // this should never occur, so we will throw rather than return
            throw transitionResult;
        }
        return transitionResult;

    }

    async getPreviousOrderSession(session: CachedSession, orderId: ID, ctx: RequestContext): Promise<Order[] | []> {
        let order = await this.connection.getRepository(Order).findOne({
            relations: ['customer'],
            where: {
                id: orderId,
            }
        });
        if(order){
            if(order.active === true){
                let arrOrder = await this.connection
                    .getRepository(Order)
                    .createQueryBuilder('order')
                    .leftJoinAndSelect('order.channels', 'channel')
                    .where('order.customFieldsSession like :code', { code: (order.customFields as any).session })
                    .andWhere('order.active = true')
                    .getMany();
                if( ctx?.activeUserId && !order.customer){
                    const customer = await this.customerService.findOneByUserId(ctx, ctx.activeUserId);
                    if(customer){
                        for(const o of arrOrder){
                            await this.orderService.addCustomerToOrder(ctx,o.id, customer)
                        }
                    }
                }
                return arrOrder;
            } else {
                await this.sessionService.unsetActiveOrder(ctx, session);
            }
        }
        return []
    }

    async getOrderByOrderSession(code: string): Promise<Order[]> {

        return this.connection
            .getRepository(Order)
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.channels', 'channel')
            .where('order.customFieldsSession like :code', { code: code })
            .andWhere('order.active = true')
            .getMany();
    }

    async findByArrId(ctx: RequestContext, arrOrderId: ID[]): Promise<Order[] | undefined> {
        const orders = await this.connection
            .getRepository(ctx, Order)
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.customer', 'customer')
            .leftJoinAndSelect('order.lines', 'lines')
            .leftJoinAndSelect('lines.productVariant', 'productVariant')
            .leftJoinAndSelect('productVariant.taxCategory', 'prodVariantTaxCategory')
            .leftJoinAndSelect('productVariant.productVariantPrices', 'prices')
            .leftJoinAndSelect('productVariant.translations', 'translations')
            .leftJoinAndSelect('lines.featuredAsset', 'featuredAsset')
            .leftJoinAndSelect('lines.items', 'items')
            .leftJoinAndSelect('items.fulfillment', 'fulfillment')
            .leftJoinAndSelect('lines.taxCategory', 'lineTaxCategory')
            .where('order.id IN (:...arrOrderId)', { arrOrderId })
            .addOrderBy('lines.createdAt', 'ASC')
            .addOrderBy('items.createdAt', 'ASC')
            .getMany();
        if(orders.length){
            let result = orders.filter(o => o.lines.length > 0);
            if(result.length){
                return result.map(o=>{
                    o.lines.forEach((line) => {
                        line.productVariant = translateDeep(
                            this.productVariantService.applyChannelPriceAndTax(line.productVariant, ctx),
                            ctx.languageCode,
                        );
                    });
                    return o;
                })
            }
        }else{
            return undefined;
        }

    }

    async findOrderByID(ctx: RequestContext, orderId: ID): Promise<Order | undefined> {
        const order = await this.connection
            .getRepository(Order)
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.customer', 'customer')
            .leftJoinAndSelect('customer.user', 'user') // Used in de 'Order' query, guess this didn't work before?
            .leftJoinAndSelect('order.lines', 'lines')
            .leftJoinAndSelect('lines.productVariant', 'productVariant')
            .leftJoinAndSelect('productVariant.taxCategory', 'prodVariantTaxCategory')
            .leftJoinAndSelect('productVariant.productVariantPrices', 'prices')
            .leftJoinAndSelect('productVariant.translations', 'translations')
            .leftJoinAndSelect('lines.featuredAsset', 'featuredAsset')
            .leftJoinAndSelect('lines.items', 'items')
            .leftJoinAndSelect('items.fulfillment', 'fulfillment')
            .leftJoinAndSelect('lines.taxCategory', 'lineTaxCategory')
            .where('order.id = :orderId', { orderId })
            .addOrderBy('lines.createdAt', 'ASC')
            .addOrderBy('items.createdAt', 'ASC')
            .getOne();
        if (order) {
            order.lines.forEach(line => {
                line.productVariant = translateDeep(
                    this.productVariantService.applyChannelPriceAndTax(line.productVariant, ctx),
                    ctx.languageCode,
                );
            });
            return order;
        }
    }

}
