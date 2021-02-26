import { loggerDailyOrderError } from './../constant';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, getConnection } from 'typeorm';
import { ListQueryBuilder, RequestContext, Order, InternalServerError, TransactionalConnection } from '@vendure/core';
import { QueryDailyOrdersArgs, DailyOrderInput, DailyOrderOutput } from '../generated-admin-types';
import { PaginatedList } from '@vendure/common/lib/shared-types';
@Injectable()
export class DailyOrderService {
    constructor(
        private connection: TransactionalConnection,
        private listQueryBuilder: ListQueryBuilder
    ) {
    }
    // getDailyOrders(ctx: RequestContext, args: QueryDailyOrdersArgs): Promise<PaginatedList<Order>>|any {
    //     return this.listQueryBuilder
    //         .build(Order, {}, {
    //             relations: ['channels', 'lines'],
    //             channelId: ctx.channelId,
    //         })
    //         .where("order.state = :state", {state: args.input.state})
    //         .andWhere("YEAR(order.updatedAt) = :year", {year: args.input.year})
    //         .groupBy("MONTH(order.updatedAt)")
    //         .getManyAndCount()
    //         .then(([items, totalItems]) => {
    //             return {
    //                 items,
    //                 totalItems
    //             }
    //         })
    //         .catch(e => {
    //             console.log(e)
    //             throw new InternalServerError(loggerDailyOrderError)
    //         })
    // }
testService(ctx: RequestContext, args: QueryDailyOrdersArgs): Promise<DailyOrderOutput> | any {
        if (args.input.month === "month") {
            return this.listQueryBuilder
                .build(Order, {}, {
                    relations: ['channels'],
                    channelId: ctx.channelId,
                })
                .innerJoin("order_channels_channel", "order_channels_channel", "order_channels_channel.orderId=order.id")
                .select("month(order.updatedAt)", "month")
                .addSelect("COUNT(order.id)", "totalOrders")
                .where("order.state = :state", {state: args.input.state})
                .andWhere("YEAR(order.updatedAt) = :year", {year: args.input.year})
                .where("order_channels_channel.channelId = :channelId", {channelId: ctx.channelId})
                .groupBy("MONTH(order.updatedAt)")
                .orderBy("MONTH(order.updatedAt)")
                .getRawMany()
                .then((data): any => {
                    console.log(data)
                    return {
                        items: data
                    }
                })
                .catch(e => {
                    console.log(e)
                })
        }
        else {
            return this.connection
                .getRepository(Order)
                .createQueryBuilder('order')
                .innerJoin("order_channels_channel", "order_channels_channel", "order_channels_channel.orderId=order.id")
                .select("month(order.updatedAt)", "month")
                .addSelect("day(order.updatedAt)", "day")
                .addSelect("COUNT(order.id)", "totalOrders")
                .where("order.state = :state", {state: args.input.state})
                .andWhere("YEAR(order.updatedAt) = :year", {year: args.input.year})
                .where("MONTH(order.updatedAt) = :month", {month: args.input.month})
                .andWhere("order_channels_channel.channelId = :channelId", {channelId: ctx.channelId})
                .groupBy("DAY(order.updatedAt)")
                .getRawMany()
                .then(data => {
                    return {
                        items: data
                    }
                })
                .catch(e => {
                    console.log(e)
                })
            
        }
    }
    // getDailyOrdersByChannel(ctx: RequestContext, args: QueryDailyOrdersByChannelArgs): Promise<PaginatedList<Order>>|any {
    //     return this.listQueryBuilder
    //         .build(Order, {}, {
    //             relations: ['channels'],
    //             channelId: args.channelId
    //         })
    //         .where("order.state = :state", {state: args.state})
    //         .andWhere("order.updatedAt >= :from", {from: args.range.from})
    //         .andWhere("order.updatedAt <= :to", {to: args.range.to})
    //         .getManyAndCount()
    //         .then(([items, totalItems]) => {
    //             return {
    //                 items,
    //                 totalItems
    //             }
    //         })
    //         .catch(e => {
    //             console.log(e)
    //             throw new InternalServerError(loggerDailyOrderError)
    //         })
    // }
}