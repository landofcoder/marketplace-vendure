import gql from 'graphql-tag'
import { ASSET_FRAGMENT } from '../fragments.graphql';

export const GET_ORDER_DETAIL = gql`
query GetOrderDetail($id: ID!) {
    order(id: $id) {
        id
        code
        state
        customer {
            lastName
            firstName
            emailAddress
            phoneNumber
        }
        shippingAddress {
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
        billingAddress {
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
        lines{
            productVariant{
                name
                sku
            }
            featuredAsset {
                ...Asset
            }
            unitPrice
            unitPriceWithTax
            quantity
            totalPrice
        }
        payments {
            createdAt
            updatedAt
            method
            amount
            state
            transactionId
            errorMessage
        }
        shippingMethod{
            code
            description
        }
        currencyCode
        subTotal
        subTotalBeforeTax
        shipping
        total
    }
}
${ASSET_FRAGMENT}`;