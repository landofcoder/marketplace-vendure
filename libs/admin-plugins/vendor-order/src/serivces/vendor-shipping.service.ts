import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ListQueryBuilder, ID, ShippingMethod, TransactionalConnection} from "@vendure/core";

@Injectable()
export class VendorShippingService {

    constructor(
        private connection: TransactionalConnection,
        private listQueryBuilder: ListQueryBuilder,
    ) {
    }

    async getShippingInChannel(channelId: ID): Promise <ShippingMethod[]>{
        return await this.listQueryBuilder
            .build(ShippingMethod, {take: 9999}, {
                relations: ['channels'],
                where: { deletedAt: null },
                channelId: channelId,
            })
            .getMany();
    }
}