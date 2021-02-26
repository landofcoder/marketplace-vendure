import {DeepPartial, VendureEntity} from '@vendure/core';
import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import {Vendor} from "./vendor.entity";


@Entity()
export class VendorInfo extends VendureEntity {
    constructor(input?: DeepPartial<VendorInfo>) {
        super(input);
    }

    @ManyToOne(type => Vendor, vendor => vendor.info)
    vendor: Vendor;

    @Column()
    brandName: string;

    @Column()
    regAddress: string;

    @Column({ default: '' })
    postalCode: string;

    @Column({ default: '' })
    city: string;

    @Column({ default: '' })
    countryCode: string;

    @Column()
    panno: string;

    @Column()
    GSTINID: string;

    @Column()
    state: string;

    @Column()
    ADHAR: string;

    @Column()
    aboutUs: string;

    @Column()
    staffEmail: string;

    @Column()
    phone: string;
}
