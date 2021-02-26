import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import {ListQueryBuilder, Channel, Role, TransactionalConnection} from "@vendure/core";
import { unique } from '@vendure/common/lib/unique';
import { CreateRoleInput, Permission } from '@vendure/common/lib/generated-types';

@Injectable()
export class VendorRoleService {

    constructor(
        private connection: TransactionalConnection,
        private listQueryBuilder: ListQueryBuilder,
    ) {
    }

    async createRoleForVendor(input: CreateRoleInput, channels: Channel[]) {
        let permissions = [
            Permission.Authenticated,
            Permission.CreateCatalog,
            Permission.UpdateCatalog,
            Permission.DeleteCatalog,
            Permission.ReadCatalog,
            Permission.ReadOrder,
            Permission.UpdateOrder,
            Permission.CreatePromotion,
            Permission.UpdatePromotion,
            Permission.ReadPromotion,
            Permission.DeletePromotion,
            Permission.UpdateSettings,
            Permission.ReadSettings,
            ...input.permissions
        ]
        const role = new Role({
            code: input.code,
            description: input.description,
            permissions: unique(permissions),
            channels: channels
        });
        role.channels = channels;
        return await this.connection.getRepository(Role).save(role);
    }

}