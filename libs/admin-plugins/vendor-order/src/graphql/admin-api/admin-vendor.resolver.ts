import {Args, Mutation, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import {Allow, Ctx, RequestContext, RoleService, UserService} from "@vendure/core";
import {Permission} from '@vendure/common/lib/generated-types';
import {VendorService} from "../../serivces/vendor.service";
import {
    MutationDeleteVendorArgs,
    MutationUpdateVendorArgs,
    MutationUpdateVendorBankArgs,
    MutationUpdateVendorContactArgs,
    MutationUpdateVendorInfoArgs,
    MutationUpdateVendorMaketingContactArgs, QueryGetVendorByIdArgs,
    QueryVendorsArgs
} from '../../generated-admin-types';
import {Vendor} from "../../entities/vendor.entity";

@Resolver('Vendor')
export class AdminVendorResolver {
    constructor(
        private vendorService: VendorService,
        private userService: UserService,
    ) {}


    @Query()
    @Allow(Permission.SuperAdmin, Permission.Owner)
    async vendors(
        @Ctx() ctx: RequestContext,
        @Args() args: QueryVendorsArgs
    ) {
        return this.vendorService.vendors(args);
    }

    @Query()
    @Allow(Permission.UpdateOrder, Permission.Owner)
    async activeVendor(
        @Ctx() ctx: RequestContext
    ) {
        if(ctx.activeUserId){
            let user = await this.userService.getUserById(ctx, ctx.activeUserId);
            if(user){
                return this.vendorService.findVendorByEmail(user.identifier);
            }

        }

    }

    @Mutation()
    @Allow(Permission.SuperAdmin)
    async deleteVendor(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationDeleteVendorArgs
    ){
        return this.vendorService.softDelete(ctx, args.id);
    }

    @Mutation()
    @Allow(Permission.UpdateOrder)
    async updateVendor(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationUpdateVendorArgs,
    ){
        const { input } = args;
        return this.vendorService.updateVendor(input);
    }

    @Mutation()
    @Allow(Permission.UpdateOrder)
    async updateVendorInfo(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationUpdateVendorInfoArgs,
    ){
        const { input } = args;
        return this.vendorService.updateVendorInfo(input);
    }

    @Mutation()
    @Allow(Permission.UpdateOrder)
    async updateVendorBank(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationUpdateVendorBankArgs,
    ){
        const { input } = args;
        return this.vendorService.updateVendorBank(input);
    }

    @Mutation()
    @Allow(Permission.UpdateOrder)
    async updateVendorContact(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationUpdateVendorContactArgs,
    ){
        const { input } = args;
        return this.vendorService.updateVendorContact(input);
    }

    @Mutation()
    @Allow(Permission.UpdateOrder)
    async updateVendorMaketingContact(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationUpdateVendorMaketingContactArgs,
    ){
        const { input } = args;
        return this.vendorService.updateVendorMaketingContact(input);
    }

    @Query()
    @Allow(Permission.UpdateOrder, Permission.Owner)
    async getVendorByID(
        @Ctx() ctx: RequestContext,
        @Args() args: QueryGetVendorByIdArgs,
    ): Promise<Vendor | undefined > {
        return await this.vendorService.findVendorById(args.id);
    }

}