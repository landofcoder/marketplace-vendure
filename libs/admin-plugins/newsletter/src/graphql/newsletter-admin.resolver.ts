import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectConnection } from '@nestjs/typeorm';
import {
    Allow,
    Ctx,
    getEntityOrThrow,
    ListQueryBuilder,
    Permission,
    RequestContext,
    EventBus,
    TransactionalConnection,
} from '@vendure/core';
import { Connection } from 'typeorm';
import { TemplateType } from '../types';
import { NewsletterQueue } from '../entities/newsletter_queue.entity';
import { NewsletterQueueLink } from '../entities/newsletter_queue_link.entity';
import { Newsletter } from '../entities/newsletter.entity';
import { Subscriber } from '../entities/subscriber.entity';
import { SendNewsletterService } from '../services/send-newsletters.service';
import {
    MutationUpdateNewsletterArgs,
    MutationSendNewsletterArgs,
    MutationAddNewsletterQueueArgs,
    MutationSendNewsletterQueueArgs,
    MutationDeleteNewsletterQueueArgs,
    QueryNewsletterArgs,
    QueryNewslettersArgs,
} from '../generated-admin-types';
import { SendNewsletterEvent } from '../events/newsletter-event';

@Resolver()
export class NewsletterAdminResolver {
    constructor(
        private connection: TransactionalConnection,
        private listQueryBuilder: ListQueryBuilder,
        private eventBus: EventBus,
        private sendNewsletterService: SendNewsletterService
    ) {
    }

    @Query()
    @Allow(Permission.ReadPromotion)
    async newsletters(@Ctx() ctx: RequestContext, @Args() args: QueryNewslettersArgs) {
        return this.listQueryBuilder
            .build(Newsletter, args.options || undefined)
            .getManyAndCount()
            .then(([items, totalItems]) => ({
                items,
                totalItems,
            }));
    }

    @Query()
    @Allow(Permission.ReadPromotion)
    async newsletter(@Ctx() ctx: RequestContext, @Args() args: QueryNewsletterArgs) {
        return this.connection.getRepository(Newsletter).findOne(args.id, {});
    }

    @Mutation()
    @Allow(Permission.DeletePromotion)
    async deleteNewsletter(
        @Ctx() ctx: RequestContext,
        @Args() args: QueryNewsletterArgs
    ) {
        const newsletterObject = await this.connection.getRepository(Newsletter).findOne(args.id);
        if(newsletterObject){
            await this.connection.getRepository(Newsletter).remove(newsletterObject);
            return {error: "false", message: "Delete the newsletter template successfully!"};
        }
        return {error: "true", message: "Can not found newsletter template record to delete. Please try again!"};
    }

    @Mutation()
    @Allow(Permission.UpdatePromotion)
    async updateNewsletter(
        @Ctx() ctx: RequestContext,
        @Args() { input }: MutationUpdateNewsletterArgs,
    ) {
        var isValid = true
        var ResNewsletter = new Newsletter({
            subject: input.subject,
            customerGroupId: (typeof(input.customerGroupId)!="undefined" && input.customerGroupId)?parseInt(input.customerGroupId):0,
            templateContent: input.templateContent,
            template_name: input.template_name,
            templateCss: input.templateCss,
            type: (input.type as TemplateType),
            status: input.status,
            priority: input.priority
        })
        var newsletter =  new Newsletter({})
        if(input.id && parseInt(input.id) > 0){
            newsletter = await getEntityOrThrow(this.connection, Newsletter, input.id);
            var isUpdated = false
            if(newsletter.id){
                if (input.templateContent) {
                    isUpdated = true
                    newsletter.templateContent = input.templateContent
                    if(input.type =='text'){
                        newsletter.templateContent = newsletter.templateContent.replace(/(<([^>]+)>)/gi, "")
                    }
                }
                if (input.template_name) {
                    isUpdated = true
                    newsletter.template_name = input.template_name
                }
                if (input.subject) {
                    isUpdated = true
                    newsletter.subject = input.subject
                }

                if (input.customerGroupId) {
                    isUpdated = true
                    newsletter.customerGroupId = parseInt(input.customerGroupId)
                }
                if (input.templateCss) {
                    isUpdated = true
                    newsletter.templateCss = input.templateCss
                }
                if (input.params) {
                    isUpdated = true
                    newsletter.params = input.params
                }
                if (input.status) {
                    isUpdated = true
                    newsletter.status = input.status
                }
                if (input.type) {
                    isUpdated = true
                    newsletter.type = input.type as TemplateType
                }
                if(isUpdated){
                    newsletter.updatedAt = new Date();
                }
            }else{
                isValid = false
            }
        }else {
            newsletter = ResNewsletter
        }
        if(isValid){
            return this.connection.getRepository(Newsletter).save(newsletter);
        }else {
            return ResNewsletter
        }
    }

    @Mutation()
    @Allow(Permission.UpdatePromotion)
    async sendNewsletter(
        @Ctx() ctx: RequestContext,
        @Args() { input }: MutationSendNewsletterArgs,
    ) {
        if(input){
            const subscriber = await this.connection
                .getRepository(Subscriber)
                .createQueryBuilder('subscriber')
                .where('subscriber.email = :email', { email: input.email })
                .andWhere('subscriber.status = :status', { status: "subscribed" })
                .getOne()

            if(subscriber && subscriber.id){
                const newsletter = await getEntityOrThrow(this.connection, Newsletter, input.newsletterId);
                if(newsletter.id){
                    this.eventBus.publish(new SendNewsletterEvent(ctx, subscriber, newsletter));
                    return newsletter;
                }else {
                    return new Newsletter({})
                }   
            }else {
                return new Newsletter({})
            }
        }else {
            return new Newsletter({})
        }
    }

    @Mutation()
    @Allow(Permission.UpdatePromotion)
    async addNewsletterQueue(
        @Ctx() ctx: RequestContext,
        @Args() { input }: MutationAddNewsletterQueueArgs,
    ) {
        if(input){
            const newsletter = await getEntityOrThrow(this.connection, Newsletter, input.newsletterId);
            if(newsletter && newsletter.id){
                var subject = newsletter.subject
                var templateContent = newsletter.templateContent
                var templateCss = newsletter.templateCss
                if(input.subject){
                    subject = input.subject
                }
                if(input.templateContent){
                    templateContent = input.templateContent
                }
                if(input.templateCss){
                    templateCss = input.templateCss
                }
                const newsletterQueue = new NewsletterQueue({
                    templateId: (newsletter.id as number),
                    newsletter_subject: subject,
                    newsletter_template_name: newsletter.template_name,
                    newsletter_text: templateContent,
                    newsletter_styles: templateCss,
                    newsletter_params: newsletter.params,
                    queue_status: 1,
                    queue_start_at: input.startAt
                })
                const returnNewsletterQueue =  await this.connection.getRepository(NewsletterQueue).save(newsletterQueue);
                if(returnNewsletterQueue){
                    const subscribers = await this.connection
                        .getRepository(Subscriber)
                        .createQueryBuilder('subscriber')
                        .andWhere('subscriber.status = :status', { status: "subscribed" })
                        .getMany()
                    if(subscribers && subscribers.length){
                        subscribers.map(async subscriber => {
                            const newsletterQueueLink = new NewsletterQueueLink({
                                queue: returnNewsletterQueue,
                                subscriber: subscriber
                            })
                            await this.connection.getRepository(NewsletterQueueLink).save(newsletterQueueLink);
                        })
                    }
                    //add queue id to cron job send newsletter queue
                    this.sendNewsletterService.addNewsletterQueueId(returnNewsletterQueue.id.toString(), subscribers.length)
                }
                return returnNewsletterQueue;
                
            }else {
                return new NewsletterQueue({})
            }
        }else {
            return new NewsletterQueue({})
        }
    }

    @Mutation()
    @Allow(Permission.UpdatePromotion)
    async sendNewsletterQueue(
        @Ctx() ctx: RequestContext,
        @Args() { input }: MutationSendNewsletterQueueArgs,
    ) {
        if(input){
            var newsletterQueue = await getEntityOrThrow(this.connection, NewsletterQueue, input.queueId);
            var limitSend = 20
            var today = new Date()
            today.setHours(0,0,0,0)
            
            if(newsletterQueue && newsletterQueue.id && newsletterQueue.queue_status == 1){
                const queue_start_at = new Date(newsletterQueue.queue_start_at)
                if(queue_start_at <= today) {
                    
                    var sentToAll = false
                    var newsletter = new Newsletter({
                        id: newsletterQueue.templateId,
                        template_name: newsletterQueue.newsletter_template_name,
                        templateContent: newsletterQueue.newsletter_text,
                        templateCss: newsletterQueue.newsletter_styles,
                        subject: newsletterQueue.newsletter_subject,
                        type: "html",
                        status: 1,
                        params: newsletterQueue.newsletter_params
                    })
                    
                    try{
                        const listQueueSubscribers = await this.connection
                                    .getRepository(NewsletterQueueLink)
                                    .createQueryBuilder('newsletter_queue_link')
                                    .leftJoinAndSelect('newsletter_queue_link.subscriber', 'subscriber')
                                    .leftJoinAndSelect('newsletter_queue_link.queue', 'newsletter_queue')
                                    .where('newsletter_queue_link.queue.id = :queueId', { queueId: newsletterQueue.id })
                                    .andWhere('newsletter_queue_link.letter_sent_at IS NULL')
                                    .limit(limitSend)
                                    .getMany()

                        if(listQueueSubscribers && listQueueSubscribers.length){
                            listQueueSubscribers.map(queueLink => {
                                var updateQueueLink = queueLink;
                                updateQueueLink.letter_sent_at = new Date()
                                this.connection.getRepository(NewsletterQueueLink).save(updateQueueLink);
                                this.eventBus.publish(new SendNewsletterEvent(ctx, queueLink.subscriber, newsletter));
                            })
                        }else {
                            sentToAll = true
                        }
                        
                    }catch(error){
                        
                    }
                    if(sentToAll){
                        newsletterQueue.queue_finish_at = new Date()
                        newsletterQueue.queue_status = 2
                        return this.connection.getRepository(NewsletterQueue).save(newsletterQueue);
                    }
                }
                return newsletterQueue;
            }else {
                return new NewsletterQueue({})
            }
        }else {
            return new NewsletterQueue({})
        }
    }

    @Mutation()
    @Allow(Permission.UpdatePromotion)
    async deleteNewsletterQueue(
        @Ctx() ctx: RequestContext,
        @Args() { input }: MutationDeleteNewsletterQueueArgs,
    ) {
        var errorMsg = ""
        var isDeleteAll = false
        if(input){
            try{
                if(input.queueId){
                    const newsletterQueue = await getEntityOrThrow(this.connection, NewsletterQueue, input.queueId);
                    if(newsletterQueue){
                        await this.connection.getRepository(NewsletterQueueLink).delete({
                            queue: newsletterQueue
                        });
                        await this.connection.getRepository(NewsletterQueue).remove(newsletterQueue);
                        return {error: "false", message: "Deleted matched records on the table. Number items were deleted: 1"};
                    }
                }else if(input.status || input.startAt || input.finishAt) {
                    var listNewsletterQueues = null
                    var startAt = input.startAt
                    var finishAt = input.finishAt
                    if(startAt) {
                        var newStartAt = new Date(startAt);
                        startAt = newStartAt.getFullYear()+"-"+newStartAt.getMonth()+"-"+newStartAt.getDate();
                    }
                    if(finishAt) {
                        var newFinishAt = new Date(finishAt);
                        finishAt = newFinishAt.getFullYear()+"-"+newFinishAt.getMonth()+"-"+newFinishAt.getDate();
                    }
                    if(input.status && input.startAt && input.finishAt) {
                        
                        listNewsletterQueues = await this.connection
                                .getRepository(NewsletterQueue)
                                .createQueryBuilder('newsletter_queue')
                                .where('newsletter_queue.queue_status = :queueStatus', { queueStatus: input.status })
                                .andWhere('DATE_FORMAT(newsletter_queue.queue_start_at, "%Y-%m-%d") = :startAt', { startAt: startAt })
                                .andWhere('DATE_FORMAT(newsletter_queue.queue_finish_at, "%Y-%m-%d") = :finishAt', { finishAt: finishAt })
                                .getMany()
                    }else if(input.status && input.startAt){
                        listNewsletterQueues = await this.connection
                                .getRepository(NewsletterQueue)
                                .createQueryBuilder('newsletter_queue')
                                .where('newsletter_queue.queue_status = :queueStatus', { queueStatus: input.status })
                                .andWhere('DATE_FORMAT(newsletter_queue.queue_start_at, "%Y-%m-%d") = :startAt', { startAt: startAt })
                                .getMany()
                    }else if(input.status && input.finishAt){
                        listNewsletterQueues = await this.connection
                                .getRepository(NewsletterQueue)
                                .createQueryBuilder('newsletter_queue')
                                .where('newsletter_queue.queue_status = :queueStatus', { queueStatus: input.status })
                                .andWhere('DATE_FORMAT(newsletter_queue.queue_finish_at, "%Y-%m-%d") = :finishAt', { finishAt: finishAt })
                                .getMany()
                    }else if(input.startAt && input.finishAt){
                        listNewsletterQueues = await this.connection
                                .getRepository(NewsletterQueue)
                                .createQueryBuilder('newsletter_queue')
                                .where('DATE_FORMAT(newsletter_queue.queue_start_at, "%Y-%m-%d") = :startAt', { startAt: startAt })
                                .andWhere('DATE_FORMAT(newsletter_queue.queue_finish_at, "%Y-%m-%d") = :finishAt', { finishAt: finishAt })
                                .getMany()
                    }else if(input.startAt){
                        listNewsletterQueues = await this.connection
                                .getRepository(NewsletterQueue)
                                .createQueryBuilder('newsletter_queue')
                                .where('DATE_FORMAT(newsletter_queue.queue_start_at, "%Y-%m-%d") = :startAt', { startAt: startAt })
                                .getMany()
                    }else if(input.finishAt){
                        listNewsletterQueues = await this.connection
                                .getRepository(NewsletterQueue)
                                .createQueryBuilder('newsletter_queue')
                                .where('DATE_FORMAT(newsletter_queue.queue_finish_at, "%Y-%m-%d") = :finishAt', { finishAt: finishAt })
                                .getMany()
                    }else if(input.status){
                        listNewsletterQueues = await this.connection
                                .getRepository(NewsletterQueue)
                                .createQueryBuilder('newsletter_queue')
                                .where('newsletter_queue.queue_status = :queueStatus', { queueStatus: input.status })
                                .getMany()
                    }
                    if(listNewsletterQueues && listNewsletterQueues.length){
                        for (const newsletterQueue of listNewsletterQueues) {
                            await this.connection.getRepository(NewsletterQueueLink).delete({
                                queue: newsletterQueue
                            });
                            await this.connection.getRepository(NewsletterQueue).remove(newsletterQueue);
                        }
                        return {error: "false", message: "Deleted matched records on the table. Number items were deleted: "+listNewsletterQueues.length};
                    }
                }else {
                    isDeleteAll = true
                }
            }catch(error){
                errorMsg = "Can not delete records, have an errors when delete!"
            }
        }else {
            isDeleteAll = true
        }
        // if(isDeleteAll){
        //     await this.connection.getRepository(NewsletterQueue).clear()
        //     await this.connection.getRepository(NewsletterQueueLink).clear()
        //     return {error: "false", message: "Delete all records on the table!"};
        // }
        return {error: "true", message: "Can not found newsletter queue record to delete. Please try again!"};
    }

}
