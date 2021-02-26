import {Args, Mutation, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import {Allow, Ctx, RequestContext, RoleService} from "@vendure/core";
import { VendorService } from "../../serivces/vendor.service";
import { VendorInfo } from "../../entities/vendor-info.entity";
import { Vendor } from '../../entities/vendor.entity';
import { VendorBank } from "../../entities/vendor-bank.entity";
import { VendorMarketingContact } from "../../entities/vendor-marketing-contact.entity";
import { VendorContact } from '../../entities/vendor-contact.entity';

@Resolver('Vendor')
export class VendorEntityResolver {
    constructor(
        private vendorService: VendorService,
    ) {
    }

    @ResolveField()
    async banks(
        @Ctx() ctx: RequestContext,
        @Parent() vendor: Vendor,
    ): Promise<Array<VendorBank>> {
        return this.vendorService.findVendorBankByVendorId(vendor.id);
    }

    @ResolveField()
    async contacts(
        @Ctx() ctx: RequestContext,
        @Parent() vendor: Vendor,
    ): Promise<Array<VendorContact>> {
        return this.vendorService.findVendorContactByVendorId(vendor.id);
    }

    @ResolveField()
    async info(
        @Ctx() ctx: RequestContext,
        @Parent() vendor: Vendor,
    ): Promise<Array<VendorInfo>> {
        return this.vendorService.findVendorInfoByVendorId(vendor.id);
    }

    @ResolveField()
    async marketing(
        @Ctx() ctx: RequestContext,
        @Parent() vendor: Vendor,
    ): Promise<Array<VendorMarketingContact>> {
        return this.vendorService.findVendorMarketingsContactByVendorId(vendor.id);
    }
}