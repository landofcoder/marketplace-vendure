import { InjectConnection } from '@nestjs/typeorm';
import { Args, Mutation, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import {
    Allow,
    Ctx,
    RequestContext,
    OrderService,
    CustomerService,
    SessionService,
    CountryService,
    Order,
    InternalServerError,
    ProductVariantService,
    ChannelService,
    IllegalOperationError,
    Channel,
    PaymentMethod,
    PaymentMethodService,
    OrderState, idsAreEqual, LanguageCode, Transaction, isGraphQlErrorResult, TransactionalConnection,
} from '@vendure/core';
import { ID, PaginatedList } from '@vendure/common/lib/shared-types';
import { VendorOrderChannelService } from '../../serivces/vendor-order-channel.service';
import {
    MutationAddItemToOrderVendorArgs,
    Permission,
    MutationAdjustOrderVendorLineArgs,
    MutationRemoveOrderVendorLineArgs,
    MutationSetCustomerForOrderVendorsArgs,
    MutationRemoveCouponCodeForOrderVendorArgs,
    MutationApplyCouponCodeForOrderVendorArgs,
    MutationAddPaymentToOrderVendorsArgs,
    MutationSetOrderVendorShippingAddressArgs,
    MutationSetOrderVendorBillingAddressArgs,
    MutationSetShippingMethodByOrderVendorArgs,
    MutationTransitionOrderToStateArgs,
    QueryEligibleVendorShippingMethodsArgs
} from '../../generated-shop-types';
import { QueryOrderArgs, ShippingMethodQuote, QueryPaymentMethodsArgs, QueryPaymentMethodArgs } from '@vendure/common/lib/generated-types';
import {VendorPromotionService} from "../../serivces/vendor-promotion.service";
import {VendorService} from "../../serivces";

@Resolver('Order')
export class ShopOrderResolver {
    constructor(
        private connection: TransactionalConnection,
        private orderService: OrderService,
        private customerService: CustomerService,
        private sessionService: SessionService,
        private countryService: CountryService,
        private productVariantService: ProductVariantService,
        private orderChannelService: VendorOrderChannelService,
        private channelService: ChannelService,
        private vendorPromotionService: VendorPromotionService,
        private vendorService: VendorService,
        private paymentMethodService: PaymentMethodService
    ) {}

    @ResolveField()
    async channel(@Ctx() ctx: RequestContext, @Args() args: QueryOrderArgs, @Parent() order: Order): Promise<Channel | undefined>  {
        return await this.orderChannelService.findChannelByOrder(order.id);
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.UpdateOrder, Permission.Owner)
    async addItemToOrderVendor(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationAddItemToOrderVendorArgs,
    ): Promise<Order[] | undefined > {
        await this.orderChannelService.checkChannelByProductVariantId(ctx,  args.productVariantId, args.channelId);
        let channel = await this.vendorService.findChannelByID(args.channelId);
        if(!channel){
            throw Error('cannot find channelId');
        } else {
            const req = RequestContext.deserialize({...ctx, _channel: channel} as any);
            const order = await this.getOrderFromChannel(req, args.channelId, true);
            let resultAdd = await this.orderService.addItemToOrder(
                ctx,
                order.id,
                args.productVariantId,
                args.quantity,
                (args as any).customFields,
            );
            return await this.getOrderVendorSession(ctx);
        }
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.UpdateOrder, Permission.Owner)
    async adjustOrderVendorLine(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationAdjustOrderVendorLineArgs,
    ): Promise<Order[] | undefined> {

        if(args.quantity === 0){
            await this.removeOrderVendorLine(ctx, { orderLineId: args.orderLineId})
        } else {
            const order = await this.orderChannelService.getOrderByOrderLine(ctx, args.orderLineId);
            await this.orderService.adjustOrderLine(
                ctx,
                order.id,
                args.orderLineId,
                args.quantity,
                (args as any).customFields,
            );
        }
        return await this.getOrderVendorSession(ctx);
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.UpdateOrder, Permission.Owner)
    async removeOrderVendorLine(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationRemoveOrderVendorLineArgs,
    ): Promise<Order[] | undefined> {
        const order = await this.orderChannelService.getOrderByOrderLine(ctx ,args.orderLineId);
        await this.orderService.removeItemFromOrder(
            ctx,
            order.id,
            args.orderLineId);

        // get orderInfo after remove line
        let orderInfo = await this.orderChannelService.findOrderByID(ctx, order.id);
        if (orderInfo && orderInfo.lines.length === 0){

            let listOrder = await this.orderChannelService.getOrderByOrderSession((order.customFields as any).session);

            // check order session
            if (ctx.session?.activeOrderId === order.id) {
                // remove order session
                await this.sessionService.unsetActiveOrder(ctx, ctx.session);
                delete ctx.session.activeOrderId;
                // get order by order.code

                if (listOrder.length > 1) {
                    let newOrderContext = listOrder.find(o => o.id !== order.id);
                    if (newOrderContext) {
                        await this.sessionService.setActiveOrder(ctx, ctx.session, newOrderContext);
                        ctx.session.activeOrderId = newOrderContext.id;
                    }
                }

            }

            // delete order
            await this.connection.getRepository(Order)
                .createQueryBuilder()
                .delete()
                .where("id = :id", {id: order.id})
                .execute();
        }

        return this.getOrderVendorSession(ctx);
    }

    @Query()
    @Allow(Permission.Owner)
    async activeOrderVendors(@Ctx() ctx: RequestContext): Promise<Order[] | undefined> {
        return this.getOrderVendorSession(ctx);
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.Owner)
    async setCustomerForOrderVendors(@Ctx() ctx: RequestContext, @Args() args: MutationSetCustomerForOrderVendorsArgs) {
        if (ctx.authorizedAsOwnerOnly) {
            if (ctx.activeUserId) {
                throw new IllegalOperationError('error.cannot-set-customer-for-order-when-logged-in');
            }
            const sessionOrders = await this.getOrderVendorSession(ctx);
            if (sessionOrders?.length) {
                const customer = await this.customerService.createOrUpdate(ctx, args.input as any, true);
                if (isGraphQlErrorResult(customer)) {
                    throw new Error('error.cannot-set-customer-for-order-when-logged-in');
                }
                return Promise.all(sessionOrders.map(async (o) => await this.orderService.addCustomerToOrder(ctx, o.id, customer) ));
            }
        }
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.UpdateOrder, Permission.Owner)
    async applyCouponCodeForOrderVendor(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationApplyCouponCodeForOrderVendorArgs,
    ): Promise<Order[] | undefined> {
        // check coupon code for channel.
        let channel = await this.orderChannelService.findChannelByOrder(args.orderId);
        if (channel){
            let promotions = await this.vendorPromotionService.getPromotionsByChannel(channel.id);
            if(promotions?.length){
                let check = promotions.find(o => o.couponCode === args.couponCode);
                if(check){
                    await this.orderService.applyCouponCode(ctx, args.orderId, args.couponCode);
                    return this.getOrderVendorSession(ctx);
                }
            }
        }
        throw new InternalServerError(`channel.not_find_coupon_code`);
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.UpdateOrder, Permission.Owner)
    async removeCouponCodeForOrderVendor(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationRemoveCouponCodeForOrderVendorArgs,
    ): Promise<Order[] | undefined> {
        // check coupon code for channel.
        let channel = await this.orderChannelService.findChannelByOrder(args.orderId);
        if (channel){
            let promotions = await this.vendorPromotionService.getPromotionsByChannel(channel.id);
            if(promotions?.length){
                let check = promotions.find(o => o.couponCode === args.couponCode);
                if(check){
                    await this.orderService.removeCouponCode(ctx, args.orderId, args.couponCode);
                    return this.getOrderVendorSession(ctx);
                }
            }
        }
        throw new InternalServerError(`channel.not_find_coupon_code`);
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.UpdateOrder, Permission.Owner)
    async addPaymentToOrderVendors(@Ctx() ctx: RequestContext, @Args() args: MutationAddPaymentToOrderVendorsArgs) {
        if (ctx.authorizedAsOwnerOnly) {

            const sessionOrders = await this.getOrderVendorSession(ctx);

            if (sessionOrders && sessionOrders.length) {
                let sessionOrderIds = sessionOrders.map(o=> o.id);
                // check arrOrder input in session;
                // if (!orderNotInSession.length){
                    return sessionOrderIds.map(async orderId => {

                        const order = await this.orderService.addPaymentToOrder(ctx, orderId, args.input);
                        if (isGraphQlErrorResult(order)) {
                            throw new InternalServerError(`Cannot not add payment to order`);
                        }
                        if (order.active === false) {
                            if (order.customer) {
                                const addresses = await this.customerService.findAddressesByCustomerId(
                                    ctx,
                                    order.customer.id,
                                );
                                // If the Customer has no addresses yet, use the shipping address data
                                // to populate the initial default Address.
                                if (addresses.length === 0 && order.shippingAddress?.country) {
                                    const address = order.shippingAddress;
                                    await this.customerService.createAddress(ctx, order.customer.id as string, {
                                        ...address,
                                        streetLine1: address.streetLine1 || '',
                                        streetLine2: address.streetLine2 || '',
                                        countryCode: address.countryCode || '',
                                        defaultBillingAddress: true,
                                        defaultShippingAddress: true,
                                    });
                                }
                            }
                        }

                    //     return order;

                    })
                // } else {
                //     throw new InternalServerError(`Cannot not found orders ${orderNotInSession} in your session`);
                // }
            } else{
                throw new InternalServerError(`Cannot not found orders in your session`);
            }

        }
    }

    // @Query()
    // @Allow(Permission.Owner)
    // async nextOrderStates(@Ctx() ctx: RequestContext): Promise<ReadonlyArray<string>> {
    //     if (ctx.authorizedAsOwnerOnly) {
    //         const sessionOrder = await this.getOrderFromContext(ctx, true);
    //         return this.orderService.getNextOrderStates(sessionOrder);
    //     }
    //     return [];
    // }
    //
    @Transaction()
    @Mutation()
    @Allow(Permission.Owner)
    async transitionOrderVendorToState(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationTransitionOrderToStateArgs,
    ): Promise<Order[] | undefined> {
        if (ctx.authorizedAsOwnerOnly) {
            const sessionOrders = await this.getOrderVendorSession(ctx);

            if (sessionOrders && sessionOrders.length) {
                if(args.state === "ArrangingPayment"){
                    //check shipping method in array order
                    let checkShipping = sessionOrders.filter(o => o.shippingMethodId === null);
                    if(checkShipping?.length){
                        throw new Error("Please choose shipping method for all packages ");
                    }
                }

                let result = await Promise.all(sessionOrders.map(async o => await this.orderService.transitionToState(ctx, o.id, args.state as OrderState)));
                return this.getOrderVendorSession(ctx);
            } else {
                throw new InternalServerError(`Cannot not found orders in your session`);
            }

        }
    }


    @Mutation()
    @Allow(Permission.Owner)
    async setOrderVendorShippingAddress(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationSetOrderVendorShippingAddressArgs,
    ): Promise<Order[] | undefined> {
        if (ctx.authorizedAsOwnerOnly) {
            const sessionOrders = await this.getOrderVendorSession(ctx);
            if (sessionOrders) {
                let orders = await Promise.all(
                    sessionOrders.map(
                        async (o) => await this.orderService.setShippingAddress(ctx, o.id, args.input as any)
                    )
                );
                return orders;
            }
            return undefined;
        }
    }

    @Mutation()
    @Allow(Permission.Owner)
    async setOrderVendorBillingAddress(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationSetOrderVendorBillingAddressArgs,
    ): Promise<Order[] | undefined> {
        if (ctx.authorizedAsOwnerOnly) {
            const sessionOrders = await this.getOrderVendorSession(ctx);
            if (sessionOrders) {
                let orders = await Promise.all(
                    sessionOrders.map(
                        async (o) => await this.orderService.setBillingAddress(ctx, o.id, args.input as any)
                    )
                );
                return orders;
            }
            return undefined;
        }
    }

    @Query()
    @Allow(Permission.Owner)
    async eligibleVendorShippingMethods(
        @Ctx() ctx: RequestContext,
        @Args() arg: QueryEligibleVendorShippingMethodsArgs
    ): Promise<ShippingMethodQuote[]> {
        if (ctx.authorizedAsOwnerOnly) {
            const sessionOrder = await this.getOrderVendorSession(ctx);
            if (sessionOrder && sessionOrder.length > 0) {
                // check order id in session
                const orderIds = sessionOrder.map(o => o.id);
                if(orderIds.indexOf(arg.id) > -1){
                    // get channel by orderID
                    let channel = await this.orderChannelService.findChannelByOrder(arg.id);
                    let req = RequestContext.deserialize({...ctx, _channel: channel} as any);
                    return this.orderService.getEligibleShippingMethods(req, arg.id);
                }
            }
        }
        return [];
    }

    @Mutation()
    @Allow(Permission.Owner)
    async setShippingMethodByOrderVendor(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationSetShippingMethodByOrderVendorArgs
    ): Promise<Order[] | undefined> {
        if (ctx.authorizedAsOwnerOnly) {
            await this.orderService.setShippingMethod(ctx, args.oderId, args.shippingMethodId);
            return this.getOrderVendorSession(ctx);
        }
    }

    async getOrderVendorSession(ctx: RequestContext): Promise<Order[] | undefined >{
        if (!ctx.session) {
            throw new InternalServerError(`error.no-active-session`);
        }

        if (ctx.authorizedAsOwnerOnly || ctx.isAuthorized) {
            let orderSessions = ctx.session.activeOrderId
                ? await this.orderChannelService.getPreviousOrderSession(ctx.session, ctx.session.activeOrderId, ctx)
                : await this.orderChannelService.getOrderByOrderSession(ctx.session.token);
            if (!orderSessions.length && ctx.activeUserId) {
                orderSessions = await this.orderChannelService.getActiveOrderForUserAndChannel(ctx, ctx.activeUserId);
            }

            let activeOrderSessions = orderSessions?.length ? orderSessions.filter(order => order.active === true) : undefined;
            if (activeOrderSessions) {
                let arrId = activeOrderSessions.map(o => o.id);
                return await this.orderChannelService.findByArrId(ctx, arrId)
            }
        }
    }

    @Query()
    @Allow(Permission.Owner)
    async order(@Ctx() ctx: RequestContext, @Args() args: QueryOrderArgs): Promise<Order | undefined> {
        const order = await this.orderChannelService.findOrderByID(ctx, args.id);
        if (order && ctx.authorizedAsOwnerOnly) {
            const orderUserId = order.customer && order.customer.user && order.customer.user.id;
            if (idsAreEqual(ctx.activeUserId, orderUserId)) {
                return order;
            } else {
                return;
            }
        }
    }

    @Query()
    paymentMethods(
        @Ctx() ctx: RequestContext,
        @Args() args: QueryPaymentMethodsArgs,
    ): Promise<PaginatedList<PaymentMethod>> {
        return this.paymentMethodService.findAll(ctx, args.options || undefined);
    }

    @Query()
    paymentMethod(
        @Ctx() ctx: RequestContext,
        @Args() args: QueryPaymentMethodArgs,
    ): Promise<PaymentMethod | undefined> {
        return this.paymentMethodService.findOne(ctx, args.id);
    }

    private async getOrderFromChannel(ctx: RequestContext, channelId: ID, createIfNotExists?: true): Promise<Order> {
        if (!ctx.session) {
            throw new InternalServerError(`error.no-active-session`);
        }

        //check find order by token
        let token = ctx.session.token;

        let previousOrders = ctx.session.activeOrderId
            ? await this.orderChannelService.getPreviousOrderSession(ctx.session, ctx.session.activeOrderId, ctx)
            : [];

        let order;
        if(!previousOrders.length){
            if (ctx.activeUserId) {
                previousOrders = await this.orderChannelService.getActiveOrderForUserAndChannel(ctx, ctx.activeUserId);
            }

        }
        // find order channel
        let orderChannel = previousOrders.find(o => {
            if(o.channels.length > 1){
                return o.channels[1].id === channelId && o.active === true
            } else{
                return o.channels[0].id === channelId && o.active === true
            }
        });
        if (!orderChannel) {
            if(previousOrders.length > 0){ token = (previousOrders[0].customFields as any).session }
            order = await this.orderChannelService.createOrder(ctx, ctx.activeUserId, token, channelId);
            await this.sessionService.setActiveOrder(ctx, ctx.session, order);
        } else {
            order = orderChannel
        }

        return order
    }

}
