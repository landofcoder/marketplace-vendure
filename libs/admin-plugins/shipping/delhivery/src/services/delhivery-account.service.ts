import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import {
    assertFound, Channel, ChannelService,
    EntityNotFoundError,
    ID,
    LanguageCode,
    patchEntity,
    RequestContext, ShippingMethod,
    ShippingMethodService,
    TransactionalConnection
} from '@vendure/core';
import { DelhiveryAccount } from "../entities/delhivery-account.entity";
import { UpdateDelhiveryAccountInput } from "../generated-admin-types";

@Injectable()
export class DelhiveryAccountService {
    constructor(
        private connection: TransactionalConnection,
    ) {
    }
    async getDefault(): Promise<DelhiveryAccount | undefined> {
        let result = await this.connection
            .getRepository(DelhiveryAccount)
            .findOne();

        return result;

    }

    async findOne(id: ID): Promise<DelhiveryAccount | undefined> {
        return this.connection
            .getRepository(DelhiveryAccount)
            .findOne(id);
    }

    async create(input: any): Promise <DelhiveryAccount> {
        delete input?.id;
        const delhivery = new DelhiveryAccount(input);
        await this.connection.getRepository(DelhiveryAccount).save(delhivery);
        return delhivery
    }

    async update(input: UpdateDelhiveryAccountInput): Promise <DelhiveryAccount> {
        if(input?.id){
            const delhivery = await this.findOne(input.id);
            if (!delhivery) {
                throw new Error('DelhiveryAccount not found');
            }
            const updatedDelhiveryAccount = patchEntity(delhivery, input);
            await this.connection.getRepository(DelhiveryAccount).save(updatedDelhiveryAccount, { reload: false });
            return assertFound(this.findOne(delhivery.id));
        } else {
            throw new Error("Check input params");
        }
    }

}
