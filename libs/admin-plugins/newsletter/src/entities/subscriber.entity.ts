/* eslint-disable @typescript-eslint/no-unused-vars */
import { Customer, DeepPartial, Product, ProductVariant, VendureEntity } from '@vendure/core';
import { Column, Entity, ManyToOne } from 'typeorm';

import { SubscriberStatus, SubscriberType } from '../types';

@Entity()
export class Subscriber extends VendureEntity {
    constructor(input?: DeepPartial<Subscriber>) {
        super(input);
    }

    @Column()
    email: string;

    @Column('varchar', { nullable: true, default: null })
    subscriberToken: string;

    @Column('varchar', { nullable: true, default: 'guest' })
    type: SubscriberType;

    @ManyToOne(type => Customer)
    author: Customer;

    @Column('varchar', { nullable: true, default: null })
    customerFirstName: string;

    @Column('varchar', { nullable: true, default: null })
    customerLastName: string;

    @Column('varchar', { nullable: true, default: null })
    customerPhone: string;

    @Column('varchar', { nullable: true, default: null })
    gender: string;

    @Column('varchar', { nullable: true, default: 'subscribed' })
    status: SubscriberStatus;

    @Column('varchar', { nullable: true, default: null })
    tags: string;

    @Column('text', { nullable: true, default: null })
    params: string;
}
