import { DeepPartial, VendureEntity} from '@vendure/core';
import { Entity, ManyToOne, JoinColumn, OneToOne,PrimaryGeneratedColumn, Column } from 'typeorm';
import {Vendor} from "./vendor.entity";


@Entity()
export class VendorBank extends VendureEntity {
    constructor(input?: DeepPartial<VendorBank>) {
        super(input);
    }

    @ManyToOne(type => Vendor, vendor => vendor.banks)
    vendor: Vendor;

    @Column()
    account: string;

    @Column()
    code: string;

    @Column()
    address: string;

    @Column()
    type: string;

    @Column({default: ''})
    isCheck: string;
}
