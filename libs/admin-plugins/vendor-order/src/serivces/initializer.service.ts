import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { DEFAULT_CHANNEL_CODE } from "@vendure/common/lib/shared-constants";
import {VendorService} from "./vendor.service";
import {Administrator, ConfigService, Order, TransactionalConnection} from "@vendure/core";
import {Vendor} from "../entities/vendor.entity";
import {VendorInfo} from "../entities/vendor-info.entity";
import {VendorContact} from "../entities/vendor-contact.entity";
import {VendorMarketingContact} from "../entities/vendor-marketing-contact.entity";
import {VendorBank} from "../entities/vendor-bank.entity";

@Injectable()
export class InitializerService implements OnModuleInit {

    constructor(
        private connection: TransactionalConnection,
        private vendorService: VendorService,
        private configService: ConfigService
    ) {
    }

    onModuleInit() {
        this.initVedorForDefaultChannel();
    }

    private async initVedorForDefaultChannel() {

        let defaultChannel = await this.vendorService.findChannelByCode(DEFAULT_CHANNEL_CODE);

        const { superadminCredentials } = this.configService.authOptions;
        let admin = await this.connection.getRepository(Administrator)
            .createQueryBuilder("admin")
            .leftJoinAndSelect("admin.user", "user")
            .where("user.identifier = :identifier", {identifier: superadminCredentials.identifier})
            .getOne();
        // create customer for admin
        if (admin && defaultChannel) {
            let checkVendor = await this.vendorService.findVendorByEmail(admin.emailAddress);
            if (!checkVendor) {
                const vendor = new Vendor({
                    firstName: admin.firstName,
                    lastName: admin.lastName,
                    email: admin.emailAddress,
                    phone: '8655076261',
                    GSTINID: '27DQGPS4819Q1ZV',
                    state: 'MAHARASHTRA',
                    ownerName: admin.firstName + '' + admin.lastName,
                    ownerEmail: admin.emailAddress,
                    user: admin.user,
                    channel: defaultChannel,
                    verified: true
                });
                // save vendor
                const createdVendor = await this.connection.getRepository(Vendor).save(vendor);
                // save vendorInfo
                const vendorInfo = await this.connection.getRepository(VendorInfo).save({
                    vendor: createdVendor,
                    brandName: DEFAULT_CHANNEL_CODE,
                    regAddress: "232 Sai Krupa Society,Malad East mumbai 400097",
                    countryCode: "IN",
                    postalCode: "400097",
                    panno: "DQGPS4819Q",
                    GSTINID: "27DQGPS4819Q1ZV",
                    state: "Mumbai",
                    ADHAR: "2521141111125",
                    aboutUs: "Vendure-marketplace Is Online Jewellery supplier store ",
                    staffEmail: "storeofapp88@gmail.com",
                    phone: "7718888149",
                });
                // save vendorContact
                const vendorContact = await this.connection.getRepository(VendorContact).save({
                    vendor: createdVendor,
                    contactName: 'admin',
                    pickupAddress: '232 Sai Krupa Society,Malad East mumbai 400097',
                    email: 'storeofapp88@gmail.com',
                    phone: '7718888149'
                });
                // save vendorMarketingContact
                const vendorMarketingContact = await this.connection.getRepository(VendorMarketingContact).save({
                    vendor: createdVendor,
                    name: '',
                    emailAddress: '',
                    phone: '',
                });
                // save vendorBank
                const vendorBank = await this.connection.getRepository(VendorBank).save({
                    vendor: createdVendor,
                    account: '',
                    code: '',
                    address: '',
                    type: 'SAVING',
                    isCheck: ''
                });
            }

        }

    }
}