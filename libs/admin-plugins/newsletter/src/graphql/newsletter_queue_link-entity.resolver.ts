import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectConnection } from '@nestjs/typeorm';
import { Ctx, Product, ProductVariant, RequestContext, translateDeep } from '@vendure/core';
import { Connection } from 'typeorm';

import { NewsletterQueueLink } from '../entities/newsletter_queue_link.entity';

@Resolver('NewsletterQueueLink')
export class NewsletterQueueLinkEntityResolver {
    constructor(@InjectConnection() private connection: Connection) {}
}
