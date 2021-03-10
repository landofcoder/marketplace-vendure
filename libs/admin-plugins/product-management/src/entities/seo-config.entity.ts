import { DeepPartial, VendureEntity} from '@vendure/core';
import { Entity, Column } from 'typeorm';


@Entity()
export class SeoConfig extends VendureEntity {
    constructor(input?: DeepPartial<SeoConfig>) {
        super(input);
    }

    @Column()
    title: string;

    @Column()
    titleTemplate: string;

    @Column()
    description: string;

    @Column()
    url: string;

    @Column()
    site_name: string;
}
