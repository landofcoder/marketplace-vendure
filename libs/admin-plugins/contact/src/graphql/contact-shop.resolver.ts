import {Args, Mutation, Resolver} from '@nestjs/graphql';
import {InjectConnection} from '@nestjs/typeorm';
import {
    Channel,
    ChannelService,
    Ctx,
    Customer,
    EventBus,
    getEntityOrThrow,
    GlobalSettingsService,
    isGraphQlErrorResult,
    RequestContext,
    TransactionalConnection
} from '@vendure/core';
import {Connection} from 'typeorm';
import * as EmailValidator from 'email-validator';
import {Contact} from '../entities/contact.entity';
//import { ContactGlobalSettings } from '../types';
import {MutationSubmitContactArgs, MutationSubmitContactShopArgs} from '../generated-shop-types';
import {SendContactEvent} from '../events/send-contact-event';

@Resolver()
export class ContactShopResolver {
    constructor(
        private connection: TransactionalConnection,
        private eventBus: EventBus,
        private globalSettingsService: GlobalSettingsService,
        private channelService: ChannelService,
    ) {}


    @Mutation()
    async submitContact(
        @Ctx() ctx: RequestContext,
        @Args() { input }: MutationSubmitContactArgs,
    ) {
        let isVerified = false;
        const contact = new Contact(input);
        contact.state = 'new';
        const verifyEmailAddress = EmailValidator.validate(contact.authorEmail);
        if (input.customerId) {
            const customer = await this.connection.getEntityOrThrow(ctx, Customer, parseInt(input.customerId));
            contact.author = customer;
            contact.authorName = customer.firstName + " " + customer.lastName;
            if(!contact.authorPhone){
                contact.authorPhone = customer.phoneNumber
            }
        }
        if (input.channelId){
            const channel = await this.connection.getEntityOrThrow(ctx, Channel, input.channelId);
            contact.channels = channel;
        }
        if (input.captcha){
            //verify captcha code
            isVerified = true
        }
        if(verifyEmailAddress){
            isVerified = true
        }else {
            isVerified = false
        }
        if(isVerified){
            //trigger send response email
            contact.body = contact.message;
            contact.tags = "";
            contact.authorIp = "";
            if(!contact.authorPhone){
                contact.authorPhone = ""
            }
            const contactObject = await this.connection.getRepository(Contact).save(contact);
            const globalSettings  = await this.globalSettingsService.getSettings(ctx);
            if(globalSettings && globalSettings.customFields){
                const receiveEmailAddress = (globalSettings.customFields as any).receivedEmailAddress;
                this.eventBus.publish(new SendContactEvent(ctx, contactObject, receiveEmailAddress));
            }
            return contactObject
        }else {
            return contact
        }
    }

    @Mutation()
    async submitContactShop(
        @Ctx() ctx: RequestContext,
        @Args() { input }: MutationSubmitContactShopArgs,
    ) {
        let isVerified = false;
        const contactShop = new Contact(input);
        contactShop.state = 'new';
        const verifyEmailAddress = EmailValidator.validate(contactShop.authorEmail);
        if (input.customerId) {
            const customer = await this.connection.getEntityOrThrow(ctx, Customer, parseInt(input.customerId));
            contactShop.author = customer;
            contactShop.authorName = customer.firstName+" "+customer.lastName;
            if(!contactShop.authorPhone){
                contactShop.authorPhone = customer.phoneNumber
            }
        }
        if (input.channelId){
            const channel = await this.connection.getEntityOrThrow(ctx, Channel, input.channelId);
            contactShop.channels = channel;
        }
        if (input.captcha){
            //verify captcha code
            isVerified = true
        }
        if(verifyEmailAddress){
            isVerified = true
        }else {
            isVerified = false
        }
        if(isVerified){
            //trigger send response email
            contactShop.body = contactShop.message;
            contactShop.tags = "";
            contactShop.authorIp = "";
            if(!contactShop.authorPhone){
                contactShop.authorPhone = ""
            }
            const contactShopObject = await this.connection.getRepository(Contact).save(contactShop);
            const globalSettings  = await this.globalSettingsService.getSettings(ctx);
            if(globalSettings && globalSettings.customFields){
                const receiveEmailAddress = (globalSettings.customFields as any).receivedEmailAddress;
                this.eventBus.publish(new SendContactEvent(ctx, contactShopObject, receiveEmailAddress));
            }
            return contactShopObject
        }else {
            return contactShop
        }
    }
}
