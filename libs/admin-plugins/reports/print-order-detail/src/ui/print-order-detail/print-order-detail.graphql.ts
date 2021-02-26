import gql from 'graphql-tag';

// @ts-ignore
import { ORDER_FRAGMENT } from '../common/fragments.graphql';

export const PRINT_ORDER_DETAIL = gql`
    query GetPrintOrderDetail($id: ID!) {
        order(id: $id) {
            ...Order
        }
    }
    ${ORDER_FRAGMENT}
`;