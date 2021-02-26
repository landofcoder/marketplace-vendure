import {Country, DeepPartial, VendureEntity} from '@vendure/core';
import { Entity, ManyToOne, JoinColumn, OneToOne,PrimaryGeneratedColumn, Column } from 'typeorm';
import {Vendor} from "./vendor.entity";


@Entity()
export class VendorContact extends VendureEntity {
    constructor(input?: DeepPartial<VendorContact>) {
        super(input);
    }

    @ManyToOne(type => Vendor, vendor => vendor.contacts)
    vendor: Vendor;

    @Column()
    contactName: string;

    @Column()
    email: string;

    @Column()
    phone: string;
}
