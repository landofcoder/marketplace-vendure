/* eslint-disable @typescript-eslint/no-unused-vars */
import {Channel, Customer, DeepPartial, Product, ProductVariant, VendureEntity} from '@vendure/core';
import { Column, Entity, ManyToOne } from 'typeorm';

import { ContactState } from '../types';
import {ChannelAware} from "@vendure/core/dist/common/types/common-types";

@Entity()
export class Contact extends VendureEntity{
    constructor(input?: DeepPartial<Contact>) {
        super(input);
    }

    @Column('integer', { nullable: true, default: null })
    channelId: number;

    @Column()
    subject: string;

    @Column()
    message: string;

    @Column('text')
    body: string;

    @ManyToOne(type => Customer)
    author: Customer;

    @Column()
    authorName: string;

    @Column()
    authorEmail: string;

    @Column('varchar', { nullable: true, default: null })
    authorPhone: string;

    @Column('varchar', { nullable: true, default: null })
    authorIp: string;

    @Column({ nullable: true })
    authorLocation: string;

    @Column('varchar', { nullable: true, default: 'new' })
    state: ContactState;

    @Column('varchar', { nullable: true, default: null })
    tags: string;

    @Column('integer', { nullable: true, default: null })
    adminUserId: number;

    @Column('text', { nullable: true, default: null })
    response: string;

    @Column('text', { nullable: true, default: null })
    error: string;

    @Column('text', { nullable: true, default: null })
    adminNote: string;

    @Column({ nullable: true, default: null })
    responseCreatedAt: Date;

    @Column({ nullable: true, default: null })
    sentAt: Date;

    @Column({ nullable: true, default: null })
    deletedAt: Date;

    @Column('text', { nullable: true, default: null })
    params: string;

    @Column('integer', { nullable: true, default: null })
    vendorId: number;

    @ManyToOne(type => Channel)
    channels: Channel;
}
