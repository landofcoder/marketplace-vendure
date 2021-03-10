import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectConnection } from '@nestjs/typeorm';
import {
    Allow,
    Ctx,
    Permission,
    ListQueryBuilder,
    TransactionalConnection,
    RequestContext,
    Transaction
} from '@vendure/core';
import { MutationUpdateSeoConfigArgs } from '../generated-admin-types';
import { SEOConfigService } from '../services/seo-config.service'

@Resolver()
export class AdminSEOConfigResolver {
    constructor(
        private connection: TransactionalConnection,
        private listQueryBuilder: ListQueryBuilder,
        private seoConfigService: SEOConfigService
    ) {}

    @Query()
    @Allow(Permission.ReadCatalog)
    async getSEOConfig(@Ctx() ctx: RequestContext){
        return this.seoConfigService.getDefault()
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.CreateCatalog)
    async updateSEOConfig(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationUpdateSeoConfigArgs,
    ){
        return this.seoConfigService.update(args.input);
    }
}

@Resolver()
export class ShopSEOConfigResolver {
    constructor(
        private connection: TransactionalConnection,
        private listQueryBuilder: ListQueryBuilder,
        private seoConfigService: SEOConfigService
    ) {}

    @Query()
    @Allow(Permission.Owner)
    async getSEOConfig(@Ctx() ctx: RequestContext){
        return this.seoConfigService.getDefault()
    }

}