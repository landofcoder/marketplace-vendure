import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectConnection } from '@nestjs/typeorm';
import { Ctx, Product, ProductVariant, RequestContext, translateDeep } from '@vendure/core';
import { Connection } from 'typeorm';

import { NewsletterQueue } from '../entities/newsletter_queue.entity';

@Resolver('NewsletterQueue')
export class NewsletterQueueEntityResolver {
    constructor(@InjectConnection() private connection: Connection) {}
}
