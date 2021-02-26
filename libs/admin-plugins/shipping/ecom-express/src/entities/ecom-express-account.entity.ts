import { DeepPartial, VendureEntity} from '@vendure/core';
import { Entity, Column } from 'typeorm';


@Entity()
export class EcomExpressAccount extends VendureEntity {
    constructor(input?: DeepPartial<EcomExpressAccount>) {
        super(input);
    }

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    production: boolean;

}