/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomerGroup, DeepPartial, Product, ProductVariant, VendureEntity } from '@vendure/core';
import { Column, Entity, ManyToOne } from 'typeorm';

import { TemplateType } from '../types';

@Entity()
export class Newsletter extends VendureEntity {
    constructor(input?: DeepPartial<Newsletter>) {
        super(input);
    }

    @Column()
    template_name: string;

    @Column('int', { nullable: true, default: 0 })
    customerGroupId: number;

    @Column('varchar', { nullable: true, default: 'The Store Newsletter' })
    subject: string;

    @Column('text', { nullable: true, default: null })
    templateContent: string;

    @Column('text', { nullable: true, default: null })
    templateCss: string;

    @Column('int', { nullable: true, default: 1 })
    status: number;

    @Column('int', { nullable: true, default: 0 })
    priority: number;

    @Column('varchar', { nullable: true, default: 'html' })
    type: TemplateType;

    @Column('text', { nullable: true, default: null })
    params: string;
}
