import gql from 'graphql-tag';

import { CART_FRAGMENT } from '../fragments.graphql';

export const GET_ACTIVE_ORDER_VENDOR = gql`
    query GetActiveOrder {
        activeOrderVendors {
            ...Cart
        }
    }
    ${CART_FRAGMENT}
`

export const ADJUST_ITEM_QUANTITY = gql`
    mutation AdjustItemQuantity($id: ID!, $qty: Int!) {
        adjustOrderVendorLine(orderLineId: $id, quantity: $qty){
            ...Cart
        }
    }
    ${CART_FRAGMENT}
`;

export const REMOVE_ITEM_FROM_CART = gql`
    mutation RemoveItemFromCart($id: ID!) {
        removeOrderVendorLine(orderLineId: $id){
            ...Cart
        }
    }
    ${CART_FRAGMENT}
`;