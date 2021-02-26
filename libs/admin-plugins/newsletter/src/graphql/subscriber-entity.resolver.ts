import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectConnection } from '@nestjs/typeorm';
import { Ctx, Product, ProductVariant, RequestContext, translateDeep } from '@vendure/core';
import { Connection } from 'typeorm';

import { Subscriber } from '../entities/subscriber.entity';

@Resolver('Subscriber')
export class SubscriberEntityResolver {
    constructor(@InjectConnection() private connection: Connection) {}
}
