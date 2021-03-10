import {Args, Mutation, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import {Allow, CountryService, Ctx, RequestContext, RoleService} from "@vendure/core";
import {
    MutationCreateVendorArgs,
    MutationCreateVendorBankArgs,
    MutationCreateVendorContactArgs,
    MutationCreateVendorInfoArgs,
    MutationCreateVendorMarketingContactArgs, MutationVerifyVendorAccountArgs,
    QueryGetVendorByBrandArgs,
    QueryGetVendorByEmailArgs, VerifyResponse,
} from "../../generated-shop-types";
import {Vendor} from "../../entities/vendor.entity";
import {Permission} from '@vendure/common/lib/generated-types';
import {VendorService} from "../../serivces";
import {VendorBank} from "../../entities/vendor-bank.entity";
import {VendorContact} from "../../entities/vendor-contact.entity";
import {VendorInfo} from "../../entities/vendor-info.entity";
import {VendorMarketingContact} from "../../entities/vendor-marketing-contact.entity";
import {VendorDelhiveryApiService} from "../../serivces/delhivery-api.sevice";

@Resolver('Vendor')
export class VendorResolver {

    constructor(
        private vendorService: VendorService,
        private delhiveryApiService: VendorDelhiveryApiService,
        private countryService: CountryService
    ) {}

    @Mutation()
    @Allow(Permission.UpdateOrder, Permission.Owner)
    async createVendor(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationCreateVendorArgs,
    ): Promise<Vendor> {
        return await this.vendorService.createVendor(ctx, args.input)
    }

    @Mutation()
    @Allow(Permission.UpdateOrder, Permission.Owner)
    async createVendorInfo(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationCreateVendorInfoArgs,
    ): Promise<VendorInfo> {
        let vendor = await this.vendorService.findVendorById(args.input.vendorId);
        if(vendor){
            return await this.vendorService.createVendorInfo(ctx, args.input, vendor);
        } else {
            throw new Error('Cannot found vendorId');
        }

    }

    @Mutation()
    @Allow(Permission.UpdateOrder, Permission.Owner)
    async createVendorBank(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationCreateVendorBankArgs,
    ): Promise<VendorBank> {
        let vendor = await this.vendorService.findVendorById(args.input.vendorId);
        if(vendor){
            return await this.vendorService.createVendorBank(ctx, args.input, vendor);
        }else {
            throw new Error('Cannot found vendorId');
        }
    }

    @Mutation()
    @Allow(Permission.UpdateOrder, Permission.Owner)
    async createVendorContact(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationCreateVendorContactArgs,
    ): Promise<VendorContact> {
        let vendor = await this.vendorService.findVendorById(args.input.vendorId);
        if(vendor){
            // let country = await this.countryService.findOneByCode(ctx, args.input.countryCode);
            let data = {
                "contact_name": args.input.contactName,
                "email": args.input.email,
                "phone": args.input.phone,
            };
            return await this.vendorService.createVendorContact(ctx, args.input, vendor);
        }

        throw new Error('Please check your seller input');

    }

    @Mutation()
    @Allow(Permission.UpdateOrder, Permission.Owner)
    async createVendorMarketingContact(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationCreateVendorMarketingContactArgs,
    ): Promise<VendorMarketingContact> {
        let vendor = await this.vendorService.findVendorById(args.input.vendorId);
        if(vendor){
            return await this.vendorService.createVendorMarketingContact(ctx, args.input, vendor);
        }else {
            throw new Error('Cannot found vendorId');
        }

    }

    @Query()
    @Allow(Permission.UpdateOrder, Permission.Owner)
    async getVendorByBrand(
        @Ctx() ctx: RequestContext,
        @Args() args: QueryGetVendorByBrandArgs,
    ): Promise<Vendor | undefined > {
        return await this.vendorService.findVendorByChannelCode(args.brand);
    }

    @Query()
    @Allow(Permission.UpdateOrder, Permission.Owner)
    async getVendorByEmail(
        @Ctx() ctx: RequestContext,
        @Args() args: QueryGetVendorByEmailArgs,
    ): Promise<Vendor | undefined > {
        return await this.vendorService.findVendorByEmail(args.email);
    }

    @Mutation()
    @Allow(Permission.Public)
    async verifyVendorAccount(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationVerifyVendorAccountArgs,
    ): Promise<VerifyResponse> {

        const { token, password } = args;
        return this.vendorService.verifyVendorEmailAddress(
            ctx,
            token,
            password || undefined,
        );
    }

}