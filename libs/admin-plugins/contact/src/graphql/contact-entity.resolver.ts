import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectConnection } from '@nestjs/typeorm';
import { Ctx, Product, ProductVariant, RequestContext, translateDeep } from '@vendure/core';
import { Connection } from 'typeorm';

import { Contact } from '../entities/contact.entity';

@Resolver('Contact')
export class ContactEntityResolver {
    constructor(@InjectConnection() private connection: Connection) {}
}
