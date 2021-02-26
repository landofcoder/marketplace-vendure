import { DeepPartial, VendureEntity, Channel, User } from '@vendure/core';
import { Entity, JoinColumn, OneToOne,PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import {VendorBank} from "./vendor-bank.entity";
import {VendorContact} from "./vendor-contact.entity";
import {VendorInfo} from "./vendor-info.entity";
import {VendorMarketingContact} from "./vendor-marketing-contact.entity";
import { SoftDeletable } from '@vendure/core/dist/common/types/common-types';


@Entity()
export class Vendor extends VendureEntity implements SoftDeletable {
    constructor(input?: DeepPartial<Vendor>) {
        super(input);
    }

    @Column({ type: Date, nullable: true })
    deletedAt: Date | null;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    GSTINID: string;

    @Column()
    state: string;

    @Column()
    ownerName: string;

    @Column()
    ownerEmail: string;

    @Column({ default: false })
    verified: boolean;

    @ManyToOne(type => User, user => user.id)
    @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
    user?: User;

    @ManyToOne(type => Channel, channel => channel.id)
    @JoinColumn([{ name: "channelId", referencedColumnName: "id" }])
    channel?: Channel;

    @OneToMany((type) => VendorBank, (bank) => bank.vendor)
    banks: VendorBank[];

    @OneToMany((type) => VendorContact, (contact) => contact.vendor)
    contacts: VendorContact[];

    @OneToMany((type) => VendorInfo, (info) => info.vendor)
    info: VendorInfo[];

    @OneToMany((type) => VendorMarketingContact, (marketingContact) => marketingContact.vendor)
    marketing: VendorMarketingContact[];
}
