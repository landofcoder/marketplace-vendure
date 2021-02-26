import { ListQueryBuilder } from '@vendure/core';
import { ID, PaginatedList } from '@vendure/common/lib/shared-types';
import { Order, RequestContext, Customer } from '@vendure/core';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import {getConnection, createQueryBuilder} from "typeorm"; 

@Injectable()
export class BraintreeService {
    constructor(private connection: Connection, private listQueryBuilder: ListQueryBuilder) {}
    async findAll(ctx: RequestContext): Promise<PaginatedList<Order> | any> {
        let result: Array<Order> = [];
        try {
            let query = this.connection
                .getRepository(Order)
                .createQueryBuilder('order')
                .leftJoinAndSelect('order.customer', 'customer')
                .leftJoinAndSelect('customer.user', 'user')
                .where('order.active = true');

            if(ctx?.activeUserId){
                query = query.andWhere('user.id = :id', {id: ctx.activeUserId });
            }else{
                query = query.andWhere('order.customFieldsSession like :session', { session: ctx.session?.token })
            }
            result = await query.getMany();
            console.log(result);
        }
        catch(e){
            console.log(e);
        }
        return result;
    }
}