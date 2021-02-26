import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectConnection } from '@nestjs/typeorm';
import {
    Allow,
    Ctx,
    ListQueryBuilder,
    Permission,
    Product,
    RequestContext,
    TransactionalConnection,
    translateDeep,

} from '@vendure/core';

import { Connection, Brackets } from 'typeorm';
import { QueryProductsArgs } from '../generated-admin-types';
import { Translated } from '@vendure/core/dist/common/types/locale-types';
import { PaginatedList } from '@vendure/common/lib/shared-types';

@Resolver()
export class ProductManagementResolver {
    constructor(
        private connection: TransactionalConnection,
        private listQueryBuilder: ListQueryBuilder,
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

}
