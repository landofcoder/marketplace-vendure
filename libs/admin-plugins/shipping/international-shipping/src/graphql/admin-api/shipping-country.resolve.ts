import {Args, Mutation, Query, Resolver, ResolveField, Parent} from '@nestjs/graphql';
import { Permission } from '@vendure/common/lib/generated-types';
import { PaginatedList } from '@vendure/common/lib/shared-types';
import {Allow, Ctx, RequestContext, Transaction} from "@vendure/core";
import {ShippingCountryService} from "../../services/shipping-country.service";
import {
    MutationCreateShippingCountryArgs,
    MutationDeleteShippingCountryArgs,
    MutationUpdateShippingCountryArgs,
    QueryShippingCountriesArgs,
    QueryShippingCountryArgs,
    DeletionResponse, ShippingCountryPriceList
} from "../../generated-admin-types";

@Resolver()
export class ShippingCountryResolve {
    constructor(
        private shippingCountryService: ShippingCountryService
    ) {
    }

    @Query()
    @Allow(Permission.SuperAdmin)
    async shippingCountries(
        @Ctx() ctx: RequestContext,
        @Args() args: QueryShippingCountriesArgs,
    ){
        let result = await this.shippingCountryService.findAll(ctx, args?.options);
        return result;
    }

    @Query()
    @Allow(Permission.SuperAdmin)
    async shippingCountry(
        @Ctx() ctx: RequestContext,
        @Args() args: QueryShippingCountryArgs,
    ) {
        return this.shippingCountryService.findOne(ctx, args.id);
    }


    @Transaction()
    @Mutation()
    @Allow(Permission.SuperAdmin)
    async createShippingCountry(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationCreateShippingCountryArgs,
    ){
        return this.shippingCountryService.create(ctx, args.input);
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.SuperAdmin)
    async updateShippingCountry(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationUpdateShippingCountryArgs,
    ) {
        return this.shippingCountryService.update(ctx, args.input);
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.SuperAdmin)
    async deleteShippingCountry(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationDeleteShippingCountryArgs,
    ): Promise<DeletionResponse> {
        return this.shippingCountryService.delete(ctx, args.id);
    }
}