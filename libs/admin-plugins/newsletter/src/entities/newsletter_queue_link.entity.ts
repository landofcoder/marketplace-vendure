/* eslint-disable @typescript-eslint/no-unused-vars */
import { DeepPartial, VendureEntity } from '@vendure/core';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Subscriber } from './subscriber.entity';
import { NewsletterQueue } from './newsletter_queue.entity';

@Entity()
export class NewsletterQueueLink extends VendureEntity {
    constructor(input?: DeepPartial<NewsletterQueueLink>) {
        super(input);
    }

    @ManyToOne(type => NewsletterQueue)
    queue: NewsletterQueue;

    @ManyToOne(type => Subscriber)
    subscriber: Subscriber;

    @Column({ nullable: true, default: null })
    letter_sent_at: Date;
}
