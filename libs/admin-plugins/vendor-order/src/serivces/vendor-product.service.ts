import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import {
    ListQueryBuilder,
    Promotion,
    RequestContext,
    ID,
    Product,
    ProductChannelEvent,
    ChannelService, ProductVariantService, EventBus, findByIdsInChannel, translateDeep, TransactionalConnection
} from "@vendure/core";
import {AssignProductsToChannelInput, Permission} from "../generated-admin-types";
import {Translated} from "@vendure/core/dist/common/types/locale-types";

@Injectable()
export class VendorProductService {
    private readonly relations = ['featuredAsset', 'assets', 'channels', 'facetValues', 'facetValues.facet'];

    constructor(
        private connection: TransactionalConnection,
        private channelService: ChannelService,
        private productVariantService: ProductVariantService,
        private eventBus: EventBus,
    ) {

    }

    async findByIds(ctx: RequestContext, productIds: ID[]): Promise<Array<Translated<Product>>> {
        return findByIdsInChannel(this.connection, Product, productIds, ctx.channelId, {
            relations: this.relations,
        }).then(products =>
            products.map(product =>
                translateDeep(product, ctx.languageCode, ['facetValues', ['facetValues', 'facet']]),
            ),
        );
    }

    async assignProductsToChannel(
        ctx: RequestContext,
        input: AssignProductsToChannelInput,
    ): Promise<Array<Translated<Product>>> {
        const productsWithVariants = await this.connection
            .getRepository(Product)
            .findByIds(input.productIds, {
                relations: ['variants'],
            });
        const priceFactor = input.priceFactor != null ? input.priceFactor : 1;
        for (const product of productsWithVariants) {
            await this.channelService.assignToChannels(ctx, Product, product.id, [input.channelId]);
            for (const variant of product.variants) {
                await this.productVariantService.createProductVariantPrice(
                    ctx,
                    variant.id,
                    variant.price * priceFactor,
                    input.channelId,
                );
            }
            this.eventBus.publish(new ProductChannelEvent(ctx, product, input.channelId, 'assigned'));
        }
        return this.findByIds(
            ctx,
            productsWithVariants.map(p => p.id),
        );
    }

}