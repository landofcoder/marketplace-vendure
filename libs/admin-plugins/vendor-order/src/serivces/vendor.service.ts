import { Injectable, OnModuleInit, Inject, forwardRef } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import {
    Administrator,
    AdministratorService,
    Channel,
    ChannelService,
    ConfigService, CountryService,
    Customer,
    CustomerService,
    EventBus,
    getEntityOrThrow,
    ID,
    InternalServerError,
    isGraphQlErrorResult,
    ListQueryBuilder,
    NativeAuthenticationMethod,
    NATIVE_AUTH_STRATEGY_NAME,
    normalizeEmailAddress,
    patchEntity,
    RequestContext,
    RoleService,
    ShippingMethod, ShippingMethodService,
    TransactionalConnection,
    User,
    UserInputError,
    UserService
} from "@vendure/core";
import { Vendor } from "../entities/vendor.entity";
import { VendorInfo } from "../entities/vendor-info.entity";
import { CreateChannelInput, HistoryEntryType } from '@vendure/common/lib/generated-types';
import { VendorBank } from "../entities/vendor-bank.entity";
import { VendorContact } from "../entities/vendor-contact.entity";
import { VendorMarketingContact } from "../entities/vendor-marketing-contact.entity";
import { VendorRoleService } from "./vendor-role.service";
import { DEFAULT_CHANNEL_CODE } from '@vendure/common/lib/shared-constants';
import {
    CreateCustomerInput,
    DeletionResponse,
    DeletionResult,
    QueryVendorsArgs,
    UpdateVendorBankInput,
    UpdateVendorContactInput,
    UpdateVendorInfoInput,
    UpdateVendorInput,
    UpdateVendorMarketingInput,
    VendorBankInput,
    VendorContactInput,
    VendorInfoInput,
    VendorInput,
    VendorMarketingContactInput,
    VerifyResult
} from '../generated-admin-types';
import { HistoryService } from "@vendure/core/dist/service/services/history.service";
import { VendorRegistrationEvent } from '../events/vendor-register-event';
import {VerificationTokenGenerator} from "@vendure/core/dist/service/helpers/verification-token-generator/verification-token-generator";
import {VerifyResponse} from "../generated-shop-types";

@Injectable()
export class VendorService {
    private relations = ['user', 'user.roles', 'channel', 'banks', 'contacts', 'info', 'marketing'];

    constructor(
        private connection: TransactionalConnection,
        private listQueryBuilder: ListQueryBuilder,
        private customerService: CustomerService,
        private channelService: ChannelService,
        private roleService: RoleService,
        private vendorRoleService: VendorRoleService,
        private userService: UserService,
        private configService: ConfigService,
        private eventBus: EventBus,
        private historyService: HistoryService,
        private administratorService: AdministratorService,
        private verificationTokenGenerator: VerificationTokenGenerator,
    ) {

    }

    async findVendorByEmail(email: string): Promise<Vendor | undefined> {
        email = normalizeEmailAddress(email);
        return this.connection.getRepository(Vendor).findOne({
            relations: this.relations,
            where: {
                email: email,
                deletedAt: null
            }
        });
    }

    async findVendorById(id: ID): Promise<Vendor | undefined> {
        return await this.connection.getRepository(Vendor).findOne({
            relations: this.relations,
            where: {
                id,
                deletedAt: null
            }
        });
    }

    async findVendorBankByVendorId(vendorId: ID): Promise<VendorBank[]> {
        return await this.connection.getRepository(VendorBank).find({
            where: {
                vendor: { id: vendorId }
            }
        });
    }

    async findVendorContactByVendorId(vendorId: ID): Promise<VendorContact[]> {
        return await this.connection.getRepository(VendorContact).find({
            where: {
                vendor: { id: vendorId }
            }
        });
    }

    async findVendorInfoByVendorId(vendorId: ID): Promise<VendorInfo[]> {
        return await this.connection.getRepository(VendorInfo).find({
            where: {
                vendor: { id: vendorId }
            }
        });
    }

    async findVendorMarketingsContactByVendorId(vendorId: ID): Promise<VendorMarketingContact[]> {
        return await this.connection.getRepository(VendorMarketingContact).find({
            where: {
                vendor: { id: vendorId }
            }
        });
    }

    async createVendor(ctx: RequestContext, input: VendorInput): Promise<Vendor> {
        input.email = normalizeEmailAddress(input.email);

        const existingVendor = await this.findVendorByEmail(input.email);
        const existingUser = await this.userService.getUserByEmailAddress(ctx, input.email);

        let customer;
        if (existingVendor && existingUser) {
            throw new UserInputError(`Email in vendor register must be unique!`);
        } else if (existingUser && !existingVendor) {
            // create vendor from customer
            if (ctx.activeUserId) {
                customer = await this.connection.getRepository(Customer).findOne({
                    relations: ['user'],
                    where: {
                        user: { id: ctx.activeUserId },
                        deletedAt: null,
                    },
                });
                if (!customer || !customer.user) {
                    throw new Error("Cannot found customer");
                } else{
                    // add token for user
                    const nativeAuthMethod = customer.user.getNativeAuthenticationMethod();
                    nativeAuthMethod.verificationToken = this.verificationTokenGenerator.generateVerificationToken();
                    await this.connection.getRepository(NativeAuthenticationMethod).save(nativeAuthMethod);
                }

            } else {
                throw new Error("Please login before registration!");
            }
        } else {
            // create new customer
            let customerInput: CreateCustomerInput = {
                firstName: input.firstName,
                lastName: input.lastName,
                phoneNumber: input.phone,
                emailAddress: input.email
            }
            // create customer
            customer = await this.createCustomer(ctx, customerInput, input.password || undefined);
        }

        if (customer?.user) {
            // create admin
            const administrator = new Administrator({
                firstName: input.firstName,
                lastName: input.lastName,
                emailAddress: input.email,
                user: customer.user,
                deletedAt: new Date()
            });
            await this.connection.getRepository(Administrator).save(administrator);

            const vendor = new Vendor(input);
            vendor.user = customer.user as any;
            // save vendor
            const createdVendor = await this.connection.getRepository(Vendor).save(vendor);
            // send email to verify vendor

            this.eventBus.publish(new VendorRegistrationEvent(ctx, customer.user));
            return createdVendor;
        } else {
            throw new Error('Cannot find user in customer');
        }
    }

    async createVendorInfo(ctx: RequestContext, input: VendorInfoInput, vendor: Vendor): Promise<VendorInfo> {
        // check channel code in system
        let checkVendor = await this.findVendorByChannelCode(input.brandName);
        let checkChannel = await this.findChannelByCode(input.brandName);
        if (checkVendor || checkChannel) {
            throw new Error("brainName must be unique");
        }

        //create Channel
        let channelInput: CreateChannelInput = {
            code: input.brandName,
            token: this.generateToken(),
            defaultLanguageCode: ctx.languageCode as any || 'en_US' as any,
            pricesIncludeTax: false,
            currencyCode: input?.currencyCode as any || 'INR' as any, //CurrencyCode,
            defaultTaxZoneId: input?.defaultTaxZoneId || 1 as any,
            defaultShippingZoneId: input?.defaultShippingZoneId || 1 as any,
        }
        const channel = await this.channelService.create(ctx, channelInput);
        if (isGraphQlErrorResult(channel)) {
            throw new Error("create channel Error");
        }
        const superAdminRole = await this.roleService.getSuperAdminRole();
        const customerRole = await this.roleService.getCustomerRole();
        await this.roleService.assignRoleToChannel(ctx, superAdminRole.id, channel.id);
        await this.roleService.assignRoleToChannel(ctx, customerRole.id, channel.id);
        // update channel in vendor
        vendor.channel = channel;
        await this.connection.getRepository(Vendor).save(vendor);

        // add shipping method for channel
        // let req = RequestContext.deserialize({...ctx, _channel: channel} as any);
        await this.assignDefaultShippingToChannel(ctx, channel.id);

        //create role
        let role = await this.vendorRoleService.createRoleForVendor({ code: input.brandName, description: 'role for vendor', permissions: [] }, [channel])
        //update user role
        let user = vendor?.user;
        if (user) {
            user.roles = [role];
            await this.connection.getRepository(User).save(user);
        }
        const vendorInfo = new VendorInfo(input);
        vendorInfo.vendor = vendor;
        return this.connection.getRepository(VendorInfo).save(vendorInfo);

    }

    async createVendorBank(ctx: RequestContext, input: VendorBankInput, vendor: Vendor): Promise<VendorBank> {
        const vendorBank = new VendorBank(input);
        vendorBank.vendor = vendor;
        return this.connection.getRepository(VendorBank).save(vendorBank);
    }

    async createVendorContact(ctx: RequestContext, input: VendorContactInput, vendor: Vendor): Promise<VendorContact> {

        const vendorContact = new VendorContact(input);
        vendorContact.vendor = vendor;
        return await this.connection.getRepository(VendorContact).save(vendorContact);
    }

    async createVendorMarketingContact(ctx: RequestContext, input: VendorMarketingContactInput, vendor: Vendor): Promise<VendorMarketingContact> {
        const marketingContact = new VendorMarketingContact(input);
        marketingContact.vendor = vendor
        return this.connection.getRepository(VendorMarketingContact).save(marketingContact);
    }

    async findVendorByChannelCode(code: string): Promise<Vendor | undefined> {
        return await this.connection
            .getRepository(Vendor)
            .createQueryBuilder('vendor')
            .leftJoinAndSelect('vendor.banks', 'bank')
            .leftJoinAndSelect('vendor.contacts', 'contact')
            .leftJoinAndSelect('vendor.info', 'info')
            .leftJoinAndSelect('vendor.marketing', 'marketing')
            .leftJoinAndSelect('vendor.user', 'user')
            .leftJoinAndSelect('vendor.channel', 'channel')
            .where('channel.code = :code', { code })
            .getOne();
    }

    async findChannelByCode(code: string): Promise<Channel | undefined> {
        return await this.connection
            .getRepository(Channel)
            .createQueryBuilder('channel')
            .leftJoinAndSelect('channel.defaultShippingZone', 'defaultShippingZone')
            .leftJoinAndSelect('channel.defaultTaxZone', 'defaultTaxZone')
            .where('channel.code = :code', { code })
            .getOne();
    }

    async findChannelByID(id: ID): Promise<Channel | undefined> {
        return await this.connection
            .getRepository(Channel)
            .createQueryBuilder('channel')
            .leftJoinAndSelect('channel.defaultShippingZone', 'defaultShippingZone')
            .leftJoinAndSelect('channel.defaultTaxZone', 'defaultTaxZone')
            .where('channel.id = :id', { id })
            .getOne();
    }

    async vendors(args: QueryVendorsArgs) {
        return this.listQueryBuilder
            .build(Vendor, args.options || undefined, {
                relations: this.relations,
                where: {
                    deletedAt: null
                }
            })
            .getManyAndCount()
            .then(([items, totalItems]) => ({
                items,
                totalItems,
            }));
    }

    async softDelete(ctx: RequestContext, vendorId: ID): Promise<DeletionResponse> {
        const vendor = await this.findVendorById(vendorId);
        if (vendor) {
            vendor.deletedAt = new Date();
            await this.connection.getRepository(Vendor).save(vendor, { reload: false });
            return {
                result: DeletionResult.Deleted,
            }
        }

        return {
            result: DeletionResult.NotDeleted,
            message: "Cannot find vendor"
        }

    }

    async updateVendor(input: UpdateVendorInput) {
        let existing = await getEntityOrThrow(this.connection, Vendor, input.id);
        let vendor = patchEntity(existing, input);
        return this.connection.getRepository(Vendor).save(vendor);
    }

    async updateVendorInfo(input: UpdateVendorInfoInput) {
        let existing = await getEntityOrThrow(this.connection, VendorInfo, input.id);
        let vendorInfo = patchEntity(existing, input);
        return this.connection.getRepository(VendorInfo).save(vendorInfo);
    }

    async updateVendorBank(input: UpdateVendorBankInput) {
        let existing = await getEntityOrThrow(this.connection, VendorBank, input.id);
        let vendorBank = patchEntity(existing, input);
        return this.connection.getRepository(VendorBank).save(vendorBank);
    }

    async updateVendorContact(input: UpdateVendorContactInput) {
        let existing = await getEntityOrThrow(this.connection, VendorContact, input.id);
        let vendorContact = patchEntity(existing, input);
        return this.connection.getRepository(VendorContact).save(vendorContact);
    }

    async updateVendorMaketingContact(input: UpdateVendorMarketingInput) {
        let existing = await getEntityOrThrow(this.connection, VendorMarketingContact, input.id);
        let vendorMarketingContact = patchEntity(existing, input);
        return this.connection.getRepository(VendorMarketingContact).save(vendorMarketingContact);
    }

    async createCustomer(ctx: RequestContext, input: CreateCustomerInput, password?: string): Promise<Customer> {
        input.emailAddress = normalizeEmailAddress(input.emailAddress);
        const customer = new Customer(input);

        const existingCustomer = await this.connection.getRepository(Customer).findOne({
            where: {
                emailAddress: input.emailAddress,
                deletedAt: null,
            },
        });
        const existingUser = await this.connection.getRepository(User).findOne({
            where: {
                identifier: input.emailAddress,
                deletedAt: null,
            },
        });

        if (existingCustomer || existingUser) {
            throw new UserInputError(`error.email-address-must-be-unique`);
        }
        customer.user = await this.userService.createCustomerUser(ctx, input.emailAddress, password);

        if (password && password !== '') {
            const verificationToken = customer.user.getNativeAuthenticationMethod().verificationToken;
            if (verificationToken) {
                let res = await this.userService.verifyUserByToken(ctx, verificationToken);
                if (isGraphQlErrorResult(res)) {
                    // In theory this should never be reached, so we will just
                    // throw the result
                    throw res;
                } else {
                    customer.user = res;
                }
            }
        } else {
            // send email to verify vendor
            // this.eventBus.publish(new AccountRegistrationEvent(ctx, customer.user));
        }
        const createdCustomer = await this.connection.getRepository(Customer).save(customer);

        await this.historyService.createHistoryEntryForCustomer({
            ctx,
            customerId: createdCustomer.id,
            type: HistoryEntryType.CUSTOMER_REGISTERED,
            data: {
                strategy: NATIVE_AUTH_STRATEGY_NAME,
            },
        });

        if (customer.user?.verified) {
            await this.historyService.createHistoryEntryForCustomer({
                ctx,
                customerId: createdCustomer.id,
                type: HistoryEntryType.CUSTOMER_VERIFIED,
                data: {
                    strategy: NATIVE_AUTH_STRATEGY_NAME,
                },
            });
        }
        return createdCustomer;
    }

    async verifyVendorEmailAddress(
        ctx: RequestContext,
        verificationToken: string,
        password?: string,
    ): Promise<VerifyResponse> {
        // check input vendor
        let findUser = await this.connection
            .getRepository(User)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.authenticationMethods', 'authenticationMethod')
            .addSelect('authenticationMethod.passwordHash')
            .where('authenticationMethod.verificationToken = :verificationToken', { verificationToken })
            .getOne();

        if(findUser) {
            const vendor = await this.findVendorByEmail(findUser.identifier);

            if (!vendor?.banks?.length && !vendor?.contacts?.length && !vendor?.marketing?.length && !vendor?.info?.length) {
                throw new Error(' Please input contact, marketing contact and bank info for vendor');
            }

            const user = await this.userService.verifyUserByToken(ctx, verificationToken, password);
            if (isGraphQlErrorResult(user)) {
                // In theory this should never be reached, so we will just
                // throw the result
                throw user;
            }
            if (user) {
                // verify customer
                const customer = await this.customerService.findOneByUserId(ctx, user.id);
                if (!customer) {
                    throw new InternalServerError('error.cannot-locate-customer-for-user');
                }
                await this.historyService.createHistoryEntryForCustomer({
                    customerId: customer.id,
                    ctx,
                    type: HistoryEntryType.CUSTOMER_VERIFIED,
                    data: {
                        strategy: NATIVE_AUTH_STRATEGY_NAME,
                    },
                });

                // verify vendor.
                if (vendor) {
                    vendor.verified = true;
                    await this.connection.getRepository(Vendor).save(vendor);
                }
                // active admin account
                const admin = await this.connection.getRepository(Administrator).findOne({
                    where: {
                        user: {id: user.id},
                    },
                });
                if (admin) {
                    admin.deletedAt = null;
                    await this.connection.getRepository(Administrator).save(admin);
                }

                return {
                    result: VerifyResult.Success
                };
            }
        }
        return {
            result: VerifyResult.Fail
        };
    }

    private async assignDefaultShippingToChannel(ctx: RequestContext, channelId: ID){

        let defaultChannel = await this.channelService.getDefaultChannel();
        const shippingMethods = await this.connection
            .getRepository(ShippingMethod)
            .createQueryBuilder('shipping')
            .leftJoinAndSelect('shipping.channels', 'channel')
            .where('channel.id = :channelId', { channelId: defaultChannel.id as any })
            .andWhere('shipping.deletedAt IS NULL')
            .andWhere('shipping.code like :code', { code: `%bavaan%`})
            .getMany();
        if (shippingMethods && shippingMethods.length) {
            shippingMethods.map(o => this.channelService.assignToChannels(ctx, ShippingMethod, o.id, [channelId]));
        }
    }

    private generateToken(): string {
        const randomString = () => Math.random().toString(36).substr(3, 10);
        return `${randomString()}${randomString()}`;
    }
}