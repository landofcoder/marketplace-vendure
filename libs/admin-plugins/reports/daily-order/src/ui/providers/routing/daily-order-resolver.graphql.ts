import gql from 'graphql-tag';
import { DAILY_ORDER_FRAGMENT, DAILY_ORDER_OUTPUT_FRAGMENT } from '../../extensions/daily-orders-fragment.graphql';

export const DAILY_ORDERS = gql`
    query dailyOrders($input: DailyOrderInput!) {
        dailyOrders(input: $input) {
            items {
                ...OrderFragment
            }
            totalItems
        }
    }
    ${DAILY_ORDER_FRAGMENT}
`;
export const DAILY_ORDERS_QUERY = gql`
    query testDailyOrders($input: DailyOrderInput!) {
        testDailyOrders(input: $input) {
           items {
            ...OrdersPerMonth
           }
       }
    }
    ${DAILY_ORDER_OUTPUT_FRAGMENT}
`