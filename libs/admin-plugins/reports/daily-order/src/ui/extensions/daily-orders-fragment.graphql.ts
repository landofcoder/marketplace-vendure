import gql from 'graphql-tag';

export const CUSTOMER_FRAGMENT = gql`
    fragment Customer on Customer {
        firstName
        lastName
        phoneNumber
        emailAddress
    }
`;
export const SHIPPING_ADDRESS_FRAGMENT = gql`
    fragment ShippingAddress on OrderAddress {
        fullName
        company
        streetLine1
        streetLine2
        city
        province
        postalCode
        country
        countryCode
        phoneNumber
    }
`;
export const DAILY_ORDER_FRAGMENT = gql`
    fragment OrderFragment on Order {
        id
        createdAt
        updatedAt
        state
        active
        total
    }
`;
export const DAILY_ORDER_OUTPUT_FRAGMENT = gql`
    fragment OrdersPerMonth on OrdersPerMonth {
        month
        totalOrders
        day
    }
`