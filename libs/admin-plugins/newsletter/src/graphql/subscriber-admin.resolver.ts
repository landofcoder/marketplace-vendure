import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectConnection } from '@nestjs/typeorm';
import {
    Allow,
    Ctx,
    getEntityOrThrow,
    ListQueryBuilder,
    patchEntity,
    Permission,
    EventBus,
    RequestContext,
    TransactionalConnection,
} from '@vendure/core';
import { Connection } from 'typeorm';

import { Subscriber } from '../entities/subscriber.entity';
import {
    MutationUpdateSubscriberArgs,
    QuerySubscriberArgs,
    QuerySubscribersArgs,
    
} from '../generated-admin-types';
import { SendUnSubscriberEvent } from '../events/newsletter-event';

@Resolver()
export class SubscriberAdminResolver {
    constructor(
        private connection: TransactionalConnection,
        private listQueryBuilder: ListQueryBuilder,
        private eventBus: EventBus,
    ) {}

    @Query()
    @Allow(Permission.ReadPromotion)
    async subscribers(@Ctx() ctx: RequestContext, @Args() args: QuerySubscribersArgs) {
        return this.listQueryBuilder
            .build(Subscriber, args.options || undefined)
            .getManyAndCount()
            .then(([items, totalItems]) => ({
                items,
                totalItems,
            }));
    }

    @Query()
    @Allow(Permission.ReadPromotion)
    async subscriber(@Ctx() ctx: RequestContext, @Args() args: QuerySubscriberArgs) {
        return this.connection.getRepository(Subscriber).findOne(args.id, {
            relations: ['author'],
        });
    }

    @Mutation()
    @Allow(Permission.DeletePromotion)
    async deleteSubscriber(
        @Ctx() ctx: RequestContext,
        @Args() args: QuerySubscriberArgs
    ) {
        const subscriberObject = await this.connection.getRepository(Subscriber).findOne(args.id);
        if(subscriberObject){
            await this.connection.getRepository(Subscriber).remove(subscriberObject);
            return {error: "false", message: "Delete the subscriber successfully!"};
        }
        return {error: "true", message: "Can not found subscriber record to delete. Please try again!"};
    }

    @Mutation()
    @Allow(Permission.DeletePromotion)
    async unSubscriber(
        @Ctx() ctx: RequestContext,
        @Args() args: QuerySubscriberArgs
    ) {
        var subscriberObject = await this.connection.getRepository(Subscriber).findOne(args.id);
        if(subscriberObject){
            if(subscriberObject.status == "subscribed"){
                subscriberObject.status = "unsubscribed"
                this.eventBus.publish(new SendUnSubscriberEvent(ctx, subscriberObject));
                return this.connection.getRepository(Subscriber).save(subscriberObject);
            }else {
                return subscriberObject
            }
        }
        return new Subscriber({});
    }

    @Mutation()
    @Allow(Permission.UpdatePromotion)
    async updateSubscriber(
        @Ctx() ctx: RequestContext,
        @Args() { input }: MutationUpdateSubscriberArgs,
    ) {
        const subscriber = await getEntityOrThrow(this.connection, Subscriber, input.id);
        const originalFirstName = subscriber.customerFirstName;
        const originalLastName = subscriber.customerLastName;
        const originalPhone = subscriber.customerPhone;
        const originalStatus = subscriber.status;
        const originalTags = subscriber.tags;
        const updatedSubscriber = patchEntity(subscriber, input as any);
        var isUpdated = false
        if (input.customerId) {
            isUpdated = true
            updatedSubscriber.type = "customer"
        }
        if (input.customerFirstName !== originalFirstName) {
            isUpdated = true
        }
        if (input.customerLastName !== originalLastName) {
            isUpdated = true
        }
        if (input.customerPhone !== originalPhone) {
            isUpdated = true
        }
        if (input.tags !== originalTags) {
            isUpdated = true
        }
        if (input.status !== originalStatus) {
            isUpdated = true
        }
        
        if(isUpdated){
            updatedSubscriber.updatedAt = new Date();
        }
        return this.connection.getRepository(Subscriber).save(updatedSubscriber);
    }

}
