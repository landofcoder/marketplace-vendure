import { DailyOrderService } from './../service/daily-order.service';
import { Order, TransactionalConnection } from '@vendure/core';
import { QueryDailyOrdersArgs, DailyOrderInput, DailyOrderOutput } from './../generated-admin-types';
import { Args, Resolver, Query } from '@nestjs/graphql';
import { Ctx, Allow, RequestContext, Permission, ListQueryBuilder, Logger } from '@vendure/core';
import { InjectConnection } from "@nestjs/typeorm";
import { Connection } from 'typeorm';
import { PaginatedList } from '@vendure/common/lib/shared-types';
@Resolver()

export class DailyOrderResolver {
    constructor(
        private connection: TransactionalConnection,
        private listQueryBuilder: ListQueryBuilder,
        private dailyOrderService: DailyOrderService
    ) {}
    // @Query()
    // @Allow(Permission.ReadOrder)
    // async dailyOrders(@Ctx() ctx: RequestContext, @Args() args: QueryDailyOrdersArgs): Promise<PaginatedList<Order> | any> {
    //     return this.dailyOrderService.getDailyOrders(ctx, args);
    // }
    @Query()
    @Allow(Permission.ReadOrder)
    async testDailyOrders(@Ctx() ctx: RequestContext, @Args() args: QueryDailyOrdersArgs): Promise<DailyOrderOutput> {
        // console.log("CHANNEL ID", ctx.channelId)
        return this.dailyOrderService.testService(ctx, args);
    }
    // @Query()
    // @Allow(Permission.SuperAdmin)
    // async dailyOrdersByChannel(@Ctx() ctx: RequestContext, @Args() args: QueryDailyOrdersByChannelArgs): Promise<PaginatedList<Order> | any> {
    //     return this.dailyOrderService.getDailyOrdersByChannel(ctx, args);
    // }
}