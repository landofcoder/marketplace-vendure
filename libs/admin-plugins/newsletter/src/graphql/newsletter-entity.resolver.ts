import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectConnection } from '@nestjs/typeorm';
import { Ctx, Product, ProductVariant, RequestContext, translateDeep } from '@vendure/core';
import { Connection } from 'typeorm';

import { Newsletter } from '../entities/newsletter.entity';

@Resolver('Newsletter')
export class NewsletterEntityResolver {
    constructor(@InjectConnection() private connection: Connection) {}
}
