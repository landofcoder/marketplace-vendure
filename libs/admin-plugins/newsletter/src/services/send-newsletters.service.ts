import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { 
    JobQueue, 
    JobQueueService, 
    ID, 
    Product,
    Zone,
    Channel,
    EventBus,
    RequestContext,
    getEntityOrThrow,
    TransactionalConnection
 } from '@vendure/core';
import { NewsletterQueueJob, AddNewsletterQueueJob } from '../types';
import { SendNewsletterEvent } from '../events/newsletter-event';
import { Subscriber } from '../entities/subscriber.entity';
import { Newsletter } from '../entities/newsletter.entity';
import { NewsletterQueue } from '../entities/newsletter_queue.entity';
import { NewsletterQueueLink } from '../entities/newsletter_queue_link.entity';
import { LanguageCode } from '@vendure/common/lib/generated-types';

let jobNewsletterQueue: JobQueue<NewsletterQueueJob> | undefined;
let jobAddNewsletterQueue: JobQueue<AddNewsletterQueueJob> | undefined;

@Injectable()
export class SendNewsletterService implements OnModuleInit { 
    constructor(
        private jobQueueService: JobQueueService, 
        private connection: TransactionalConnection,
        private eventBus: EventBus,
        ) {}

  onModuleInit() {
    // This check ensures that only a single JobQueue is created, even if this
    // job itself.
    jobNewsletterQueue = this.jobQueueService.createQueue({
        name: 'send-newsletter-email',
        concurrency: 10,
        process: async job => {
            try {
                var result = null
                if(job.data.queueId){
                    var newsletterQueue = await getEntityOrThrow(this.connection, NewsletterQueue, job.data.queueId);
                    var today = new Date()
                    var limitSend = 20
                    today.setHours(0,0,0,0)
                    if(newsletterQueue && newsletterQueue.id && (newsletterQueue.queue_status == 1 || newsletterQueue.queue_status == 4)){
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
                            const totalQueueSubscribers = await this.connection
                                .getRepository(NewsletterQueueLink)
                                .createQueryBuilder('newsletter_queue_link')
                                .leftJoinAndSelect('newsletter_queue_link.subscriber', 'subscriber')
                                .leftJoinAndSelect('newsletter_queue_link.queue', 'newsletter_queue')
                                .where('newsletter_queue_link.queue.id = :queueId', { queueId: newsletterQueue.id })
                                .andWhere('newsletter_queue_link.letter_sent_at IS NULL')
                                .getCount()

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
                                await this.sendNewsletterEmail(listQueueSubscribers, newsletter);
                                result = newsletterQueue
                            }else {
                                sentToAll = true
                            }
                            if(sentToAll || parseInt(totalQueueSubscribers.toString()) === listQueueSubscribers.length){
                                newsletterQueue.queue_finish_at = new Date()
                                newsletterQueue.queue_status = 2
                                result = await this.connection.getRepository(NewsletterQueue).save(newsletterQueue);
                                if (!result) {
                                    return;
                                }
                                job.complete(result);
                            }
                        }
                    }
                }
                
              } catch (e) {
                job.fail(e);
              }
        },
    });
    const queues = this.jobQueueService.getJobQueues()
    var isExistsQueueAdd = false
    if(queues.length){
        for(var i=0;i<queues.length;i++){
            if(queues[i].name == "add-newsletter-queue"){
                isExistsQueueAdd = true;
                break
            }
        }
    }
    if(!isExistsQueueAdd){
        jobAddNewsletterQueue = this.jobQueueService.createQueue({
            name: 'add-newsletter-queue',
            concurrency: 5,
            process: async job => {
                try {
                    await this.setupSendNewsletterQueue();
                    job.complete();
                } catch (e) {
                    job.fail(e);
                }
            },
        });

        if(jobAddNewsletterQueue){
            jobAddNewsletterQueue.add({ limitQueue: "10" })
        }
    }
    return false
  }
  
  addNewsletterQueueId(queueId: string, totalSubscribers?: number) {
    // Add a new job to the queue and immediately return the
    if(jobNewsletterQueue){
        if(totalSubscribers){
            jobNewsletterQueue.add({queueId: queueId}, {retries: totalSubscribers})
        }else {
            this.connection
            .getRepository(NewsletterQueueLink)
            .createQueryBuilder('newsletter_queue_link')
            .leftJoinAndSelect('newsletter_queue_link.subscriber', 'subscriber')
            .leftJoinAndSelect('newsletter_queue_link.queue', 'newsletter_queue')
            .where('newsletter_queue_link.queue.id = :queueId', { queueId: queueId })
            .andWhere('newsletter_queue_link.letter_sent_at IS NULL')
            .getCount()
            .then(total => {
                const convertedTotals = parseInt(total.toString())
                if(convertedTotals > 0 && jobNewsletterQueue){
                    jobNewsletterQueue.add({queueId: queueId}, {retries: total})
                }
            })
        }
        
    }
  }

  private setupSendNewsletterQueue() {
    const listNewsletterQueues = this.connection
                            .getRepository(NewsletterQueue)
                            .createQueryBuilder('newsletter_queue')
                            .where('(newsletter_queue.queue_status = :queueStatus) OR (newsletter_queue.queue_status = :queueStatusPending)', { queueStatus: 1, queueStatusPending: 4 })
                            .getMany()
                            .then(listItems => {
                                if(listItems && listItems.length && jobNewsletterQueue){
                                    for (const newsletterQueue of listItems) {
                                        this.addNewsletterQueueId(newsletterQueue.id as string);
                                        newsletterQueue.queue_status = 4
                                        this.connection.getRepository(NewsletterQueue).save(newsletterQueue);
                                    }
                                }
                            });

}

private sendNewsletterEmail(listQueueSubscribers: NewsletterQueueLink[], newsletter: Newsletter) {
    // e.g. call some external transcoding service
    const ctx = this.createRequestContext(false);
    listQueueSubscribers.map(queueLink => {
        var updateQueueLink = queueLink;
        updateQueueLink.letter_sent_at = new Date()
        this.connection.getRepository(NewsletterQueueLink).save(updateQueueLink);
        this.eventBus.publish(new SendNewsletterEvent(ctx, queueLink.subscriber, newsletter));
    })
}

private createRequestContext(pricesIncludeTax: boolean): RequestContext {
    const zoneDefault = new Zone({
        id: 'zoneDefault',
        name: 'Default Zone',
    });
    const channel = new Channel({
        defaultTaxZone: zoneDefault,
        pricesIncludeTax,
    });
    const ctx = new RequestContext({
        apiType: 'admin',
        channel,
        authorizedAsOwnerOnly: false,
        languageCode: LanguageCode.en,
        isAuthorized: true,
        session: {} as any,
    });
    return ctx;
}
}