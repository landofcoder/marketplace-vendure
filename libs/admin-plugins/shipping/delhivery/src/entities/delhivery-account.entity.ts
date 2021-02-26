import { DeepPartial, VendureEntity} from '@vendure/core';
import { Entity, JoinColumn, OneToOne, Column, OneToMany } from 'typeorm';


@Entity()
export class DelhiveryAccount extends VendureEntity {
    constructor(input?: DeepPartial<DelhiveryAccount>) {
        super(input);
    }

    @Column()
    client_name: string;

    @Column()
    user_name: string;

    @Column()
    api_key: string;

    @Column()
    shipping_mode: string;

    @Column()
    hand_fee: number;

}
