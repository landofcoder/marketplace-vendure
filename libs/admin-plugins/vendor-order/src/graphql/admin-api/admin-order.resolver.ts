import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
    Permission,
    QueryOrdersArgs,
} from '@vendure/common/lib/generated-types';
import { PaginatedList } from '@vendure/common/lib/shared-types';
import { OrderService, Allow, Ctx, RequestContext, Order } from "@vendure/core";
import {VendorOrderChannelService} from "../../serivces/vendor-order-channel.service";


@Resolver()
export class AdminOrderResolver {
    constructor(
        private orderService: OrderService,
        private orderChannelService: VendorOrderChannelService) {}

    @Query()
    @Allow(Permission.ReadOrder)
    getOrderListByChannel(@Ctx() ctx: RequestContext, @Args() args: QueryOrdersArgs): Promise<PaginatedList<Order>> {
        return this.orderChannelService.findAll(ctx, args.options || undefined);
    }

}
