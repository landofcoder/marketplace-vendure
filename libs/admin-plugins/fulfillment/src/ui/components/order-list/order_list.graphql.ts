import gql from 'graphql-tag';
export const ORDER_FRAGMENT = gql`
    fragment OrderFragment on Order {
        id
        code
        createdAt
        updatedAt
        currencyCode
        customFields {
            session
        }
        customer {
            id
            firstName
            lastName
        }
        channels {
            id
            code
        }
        nextStates
        orderPlacedAt
        state
        total
    }
`;
export const GET_LIST_ORDERS = gql`
    query getListOrders($options: OrderListOptions) {
        orders(options: $options) {
            items {
                ...OrderFragment
            }
            totalItems
        }
    }
    ${ORDER_FRAGMENT}
`;