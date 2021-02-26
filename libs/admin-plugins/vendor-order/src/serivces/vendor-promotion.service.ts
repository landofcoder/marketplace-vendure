import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import {ListQueryBuilder, Promotion, RequestContext, ID, TransactionalConnection} from "@vendure/core";

@Injectable()
export class VendorPromotionService {

    constructor(
        private connection: TransactionalConnection,
        private listQueryBuilder: ListQueryBuilder,
    ) {

    }

    async getPromotionsByChannel(channelId: ID): Promise<Promotion[] | undefined> {
        if(channelId){
            return await this.listQueryBuilder
                .build(Promotion, {take: 9999}, {
                    where: { deletedAt: null },
                    channelId: channelId,
                    relations: ['channels'],
                })
                .getMany();
        }
    }

}