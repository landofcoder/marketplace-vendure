import { Injectable } from '@nestjs/common';
import {
    ID,
    TransactionalConnection
} from '@vendure/core';
import { DelhiveryWarehouse } from "../entities/delhivery-warehouse.entity";

@Injectable()
export class DelhiveryWarehouseService {
    constructor(
        private connection: TransactionalConnection,
    ) {
    }

    async findDelhiveryWarehouseByChannelId(channelId: ID): Promise<DelhiveryWarehouse | undefined> {
        return await this.connection.getRepository(DelhiveryWarehouse).findOne({
            where: {
                channelId: channelId
            }
        });
    }
}
