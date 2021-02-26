import { gql } from 'apollo-server-core';


export const adminApiExtension = gql`
    scalar Date
    # input RangeDate {
    #     from: Date!,
    #     to: Date!
    # }
    input DailyOrderInput {
        month: String,
        year: String!,
        state: String!,
    }
    type OrdersPerMonth {
        month: String!,
        totalOrders: Int!,
        day: String
    }
    type DailyOrderOutput {
        items: [OrdersPerMonth!]!
    }
    type DailyOrderList implements PaginatedList {
        items: [Order!]!
        totalItems: Int!
    }
    # extend type Query {
    #     dailyOrders(range: RangeDate!, state: String!): DailyOrderList!
    #     dailyOrdersByChannel(channelId: ID!, range: RangeDate!, state: String!): Int!
    # }
    extend type Query {
        dailyOrders(input: DailyOrderInput!): DailyOrderList!
        testDailyOrders(input: DailyOrderInput!): DailyOrderOutput
    }
`;
