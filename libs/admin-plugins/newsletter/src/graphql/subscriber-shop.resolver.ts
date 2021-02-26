import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { InjectConnection } from '@nestjs/typeorm';
import {
    Ctx,
    Customer,
    getEntityOrThrow,
    ListQueryBuilder,
    RequestContext,
    EventBus,
    TransactionalConnection
} from '@vendure/core';
import { Connection } from 'typeorm';
import * as EmailValidator from 'email-validator';
import { Subscriber } from '../entities/subscriber.entity';
import { MutationSubmitSubscriberArgs, MutationSubmitUnSubscriberArgs } from '../generated-shop-types';
import { SendSubscriberEvent, SendUnSubscriberEvent } from '../events/newsletter-event';
import * as CryptoJS from 'crypto-js';

@Resolver()
export class SubscriberShopResolver {
    constructor(
        private connection: TransactionalConnection,
        private listQueryBuilder: ListQueryBuilder,
        private eventBus: EventBus,
    ) {}

    @Mutation()
    async submitSubscriber(
        @Ctx() ctx: RequestContext,
        @Args() { input }: MutationSubmitSubscriberArgs,
    ) {
        var isVerified = false
        const checkSubscriber = await this.connection
                .getRepository(Subscriber)
                .createQueryBuilder('subscriber')
                .where('subscriber.email = :email', { email: input.email })
                .getOne()

        const subscriber = new Subscriber(input);

        if(!checkSubscriber){
            subscriber.status = 'subscribed';
            const verifyEmailAddress = EmailValidator.validate(subscriber.email);
            if (input.customerId) {
                const customer = await this.connection.getEntityOrThrow(ctx, Customer, parseInt(input.customerId));
                subscriber.author = customer;
                if(!subscriber.customerFirstName){
                    subscriber.customerFirstName = customer.firstName
                }
                if(!subscriber.customerLastName){
                    subscriber.customerLastName = customer.lastName
                }
                if(!subscriber.customerPhone){
                    subscriber.customerPhone = customer.phoneNumber
                }
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
                if(!subscriber.customerPhone){
                    subscriber.customerPhone = ""
                }
                const dateTimeString = new Date();
                const text = subscriber.email+"|"+dateTimeString;
                subscriber.subscriberToken = CryptoJS.SHA512(text).toString(CryptoJS.enc.Hex);
                const subscriberObject = await this.connection.getRepository(Subscriber).save(subscriber);
                this.eventBus.publish(new SendSubscriberEvent(ctx, subscriberObject));
                return subscriberObject
            }else {
                return subscriber
            }
        }else {
            return subscriber
        }
    }

    @Mutation()
    async submitUnSubscriber(
        @Ctx() ctx: RequestContext,
        @Args() { input }: MutationSubmitUnSubscriberArgs,
    ) {
        if (input.token) {
            var subscriber = await this.connection
                .getRepository(Subscriber)
                .createQueryBuilder('subscriber')
                .where('subscriber.subscriberToken = :token', { token: input.token })
                .andWhere('subscriber.status = :status', { status: "subscribed" })
                .getOne()

            if(subscriber){
                subscriber.status = "unsubscribed"
                const subscriberObject = await this.connection.getRepository(Subscriber).save(subscriber);
                this.eventBus.publish(new SendUnSubscriberEvent(ctx, subscriberObject));
                return subscriberObject
            }
        }
        return new Subscriber({})
    }
}
