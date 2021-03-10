import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectConnection } from '@nestjs/typeorm';
import {
    Allow,
    Ctx,
    ListQueryBuilder,
    Permission,
    Product, ProductService,
    RequestContext, Transaction,
    TransactionalConnection,
    translateDeep,

} from '@vendure/core';

import { Connection, Brackets } from 'typeorm';
import { MutationSetProductStatusArgs, QueryProductsArgs } from '../generated-admin-types';
import { Translated } from '@vendure/core/dist/common/types/locale-types';
import { PaginatedList } from '@vendure/common/lib/shared-types';
import { MutationCreateProductArgs, UpdateProductInput } from '@vendure/common/lib/generated-types';

@Resolver()
export class ProductManagementResolver {
    constructor(
        private connection: TransactionalConnection,
        private listQueryBuilder: ListQueryBuilder,
        private productService: ProductService,
    ) {}

    @Query()
    @Allow(Permission.ReadCatalog)
    async productGrid(
        @Ctx() ctx: RequestContext,
        @Args() args: QueryProductsArgs,
    ): Promise<PaginatedList<Translated<Product>>> {
        let search = args.options?.filter?.name?.contains || '';
        const qb = this.listQueryBuilder
            .build(Product, args.options || undefined, {
                    relations: ['featuredAsset', 'assets', 'channels', 'facetValues', 'facetValues.facet'],
                    channelId: ctx.channelId,
                    where: { deletedAt: null }
                }
            )
            .innerJoin('product.variants', 'productVariant')
            .innerJoin('productVariant.translations', 'productVariantTranslation');
        if(search) {
            qb.where('productVariant.sku like :q OR productVariantTranslation.name like :q', { q: `%${search}%` })
        }
        return qb.getManyAndCount()
            .then(async ([products, totalItems]) => {
                const items = products.map(product =>
                    translateDeep(product, ctx.languageCode, ['facetValues', ['facetValues', 'facet']]),
                );
                return {
                    items,
                    totalItems,
                };
            });
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.CreateCatalog)
    async createProduct(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationCreateProductArgs,
    ): Promise<Translated<Product>> {
        const { input } = args;
        let res = await this.productService.create(ctx, input);

        let update: UpdateProductInput = {
            id: res.id,
            enabled: false,
            customFields: {
                status: 'Pending'
            }
        }

        return this.productService.update(ctx, update);;
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.CreateCatalog)
    async setProductStatus(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationSetProductStatusArgs,
    ){
        let update: UpdateProductInput = {
            id: args.productID,
            enabled: args.status == 'Approval',
            customFields: {
                status: args.status
            }
        }
        return this.productService.update(ctx, update);
    }

}
