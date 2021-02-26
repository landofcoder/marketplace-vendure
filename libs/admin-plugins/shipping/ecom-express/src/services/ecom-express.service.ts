import { Injectable } from '@nestjs/common';
import {
    assertFound,
    ID,
    patchEntity,
    TransactionalConnection
} from '@vendure/core';

import {EcomExpressInput, UpdateDelhiveryAccountInput} from "../generated-admin-types";
import {EcomExpressAccount} from "../entities/ecom-express-account.entity";

@Injectable()
export class EcomExpressService {
    constructor(
        private connection: TransactionalConnection,
    ) {
    }
    async getDefault(): Promise<EcomExpressAccount | undefined> {
        let result = await this.connection
            .getRepository(EcomExpressAccount)
            .findOne();

        return result;

    }

    async create(input: EcomExpressInput): Promise <EcomExpressAccount> {
        const ecomExpressAccount = new EcomExpressAccount(input);
        let result = await this.connection.getRepository(EcomExpressAccount).save(ecomExpressAccount);
        return result

    }

    async update(input: any): Promise <EcomExpressAccount> {
        if (input?.id) {
            return this.connection.getRepository(EcomExpressAccount).save(input, {reload: true});

        } else {
            throw new Error("Check input params");
        }
    }

}
