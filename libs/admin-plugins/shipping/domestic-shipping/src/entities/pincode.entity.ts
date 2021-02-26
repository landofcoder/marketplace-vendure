/* eslint-disable @typescript-eslint/no-unused-vars */
import { DeepPartial, VendureEntity } from '@vendure/core';
import { Column, Entity } from 'typeorm';

@Entity()
export class Pincode extends VendureEntity{
    constructor(input?: DeepPartial<Pincode>) {
        super(input);
    }

    @Column()
    pincode: number;

    @Column()
    state: string;

    @Column()
    district: string;

    @Column()
    prepaid: boolean;

    @Column()
    cod: boolean;

    @Column()
    pickup: boolean;

    @Column()
    cash: boolean;

    @Column()
    repl: boolean;
}
