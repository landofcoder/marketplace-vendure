/* eslint-disable @typescript-eslint/no-unused-vars */
import { DeepPartial, VendureEntity } from '@vendure/core';
import { Column, Entity } from 'typeorm';

@Entity()
export class NewsletterQueue extends VendureEntity {
    constructor(input?: DeepPartial<NewsletterQueue>) {
        super(input);
    }

    @Column('int', { nullable: true, default: 0 })
    templateId: number;

    @Column('varchar', { nullable: true, default: 'Newsletter Subject' })
    newsletter_subject: string;

    @Column('varchar', { nullable: true, default: '' })
    newsletter_template_name: string;

    @Column('text', { nullable: true, default: null })
    newsletter_text: string;

    @Column('text', { nullable: true, default: null })
    newsletter_styles: string;

    @Column('text', { nullable: true, default: null })
    newsletter_params: string;

    @Column('int', { nullable: true, default: 1 })
    queue_status: number; //0: disable 1: pending, 2: sent, 3: stop, 4: added to cron job

    @Column({ nullable: true, default: null })
    queue_start_at: Date;

    @Column({ nullable: true, default: null })
    queue_finish_at: Date;
}
