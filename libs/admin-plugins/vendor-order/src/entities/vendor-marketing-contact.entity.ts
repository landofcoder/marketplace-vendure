import {DeepPartial, VendureEntity } from '@vendure/core';
import { Entity, ManyToOne, JoinColumn, OneToOne,PrimaryGeneratedColumn, Column } from 'typeorm';
import {Vendor} from "./vendor.entity";


@Entity()
export class VendorMarketingContact extends VendureEntity {
    constructor(input?: DeepPartial<VendorMarketingContact>) {
        super(input);
    }

    @ManyToOne(type => Vendor, vendor => vendor.marketing)
    vendor: Vendor;

    @Column()
    name: string;

    @Column()
    emailAddress: string;

    @Column()
    phone: string;
}
