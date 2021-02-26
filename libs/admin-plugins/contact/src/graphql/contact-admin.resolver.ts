import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {InjectConnection} from '@nestjs/typeorm';
import {
    Allow,
    Ctx,
    getEntityOrThrow,
    ListQueryBuilder,
    patchEntity,
    Permission,
    RequestContext,
    Transaction,
    TransactionalConnection,
} from '@vendure/core';
import {Connection} from 'typeorm';

import {Contact} from '../entities/contact.entity';
import {MutationUpdateContactArgs, QueryContactArgs, QueryContactsArgs,} from '../generated-admin-types';

@Resolver()
export class ContactAdminResolver {
    constructor(
        private connection: TransactionalConnection,
        private listQueryBuilder: ListQueryBuilder,
    ) {}

    @Query()
    @Allow(Permission.ReadPromotion)
    async contacts(@Ctx() ctx: RequestContext, @Args() args: QueryContactsArgs) {
        return this.listQueryBuilder
            .build(Contact, args.options || undefined, {
                    relations: ['channels'],
                    channelId: ctx.channelId,
                }
            )
            .getManyAndCount()
            .then(([items, totalItems]) => ({
                items,
                totalItems,
            }));
    }

    @Query()
    @Allow(Permission.ReadPromotion)
    async contact(@Ctx() ctx: RequestContext, @Args() args: QueryContactArgs) {
        return this.connection.getRepository(Contact).findOne(args.id, {
            relations: ['author'],
        });
    }

    @Mutation()
    @Allow(Permission.DeletePromotion)
    async deleteContact(
        @Ctx() ctx: RequestContext,
        @Args() args: QueryContactArgs
    ) {
        const contactObject = await this.connection.getRepository(Contact).findOne(args.id);
        if(contactObject){
            await this.connection.getRepository(Contact).remove(contactObject);
            return {error: "false", message: "Delete the contact successfully!"};
        }
        return {error: "true", message: "Can not found contact record to delete. Please try again!"};
    }

    @Mutation()
    @Allow(Permission.UpdatePromotion)
    async updateContact(
        @Ctx() ctx: RequestContext,
        @Args() { input }: MutationUpdateContactArgs,
    ) {
        const contact = await getEntityOrThrow(this.connection, Contact, input.id);
        const originalResponse = contact.response;
        const originalSubject = contact.subject;
        const originalBody = contact.body;
        const originalState = contact.state;
        const originalTags = contact.tags;
        const originalAdminNote = contact.adminNote;
        const originalAdminUserId = contact.adminUserId;
        const updatedContact = patchEntity(contact, input as any);
        let isUpdated = false;
        if (input.response !== originalResponse) {
            updatedContact.responseCreatedAt = new Date();
            //trigger send response email
        }
        if (input.subject !== originalSubject) {
            isUpdated = true
        }
        if (input.body !== originalBody) {
            isUpdated = true
        }
        if (input.state !== originalState) {
            isUpdated = true
        }
        if (input.tags !== originalTags) {
            isUpdated = true
        }
        if (input.adminNote !== originalAdminNote) {
            isUpdated = true
        }
        if (input.adminUserId !== originalAdminUserId) {
            isUpdated = true
        }
        if(isUpdated){
            updatedContact.updatedAt = new Date();
        }
        return this.connection.getRepository(Contact).save(updatedContact);
    }

}
