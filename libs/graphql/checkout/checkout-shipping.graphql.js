import gql from 'graphql-tag';

import { CART_FRAGMENT, ORDER_ADDRESS_FRAGMENT } from '../fragments.graphql';

export const GET_SHIPPING_ADDRESS = gql`
    query GetShippingAddress {
        activeOrderVendors {
            id
            shippingAddress {
                ...OrderAddress
            }
        }
    }
    ${ORDER_ADDRESS_FRAGMENT}
`;

export const SET_BILLING_ADDRESS = gql`
    mutation SetBillingAddress($input: CreateAddressInput!) {
        setOrderVendorBillingAddress(input: $input) {
            ...Cart
            billingAddress {
                ...OrderAddress
            }
        }
    }
    ${CART_FRAGMENT}
    ${ORDER_ADDRESS_FRAGMENT}
`;

export const SET_SHIPPING_ADDRESS = gql`
    mutation SetShippingAddress($input: CreateAddressInput!) {
        setOrderVendorShippingAddress(input: $input) {
            ...Cart
            shippingAddress {
                ...OrderAddress
            }
        }
    }
    ${CART_FRAGMENT}
    ${ORDER_ADDRESS_FRAGMENT}
`;

export const GET_ELIGIBLE_SHIPPING_METHODS = gql`
    query GetEligibleShippingMethods {
        eligibleShippingMethods {
            id
            description
            price
            metadata
        }
    }
`;
export const ELIGIBLE_VENDOR_SHIPPING_METHODS = gql`
    query eligibleVendorShippingMethods($id: ID!) {
        eligibleVendorShippingMethods(id: $id) {
            id
            priceWithTax
            price
            description
        }
    }
`;
export const SET_SHIPPING_METHOD = gql`
    mutation SetShippingMethod($id: ID!) {
        setOrderShippingMethod(shippingMethodId: $id) {
            ...Cart
        }
    }
    ${CART_FRAGMENT}
`;

export const SET_CUSTOMER_FOR_ORDER = gql`
    mutation SetCustomerForOrder($input: CreateCustomerInput!) {
        setCustomerForOrder(input: $input) {
            id
            customer {
                id
                emailAddress
                firstName
                lastName
            }
        }
    }
`;
export const SET_CUSTOMER_FOR_ORDER_VENDORS = gql`
    mutation SetCustomerForOrderVendors($input: CreateCustomerInput!) {
        setCustomerForOrderVendors(input: $input) {
            id
            code
            state
            customer {
                title
                firstName
                lastName
                emailAddress
                phoneNumber
            }
        }
    }
`;

export const TRANSITION_TO_ARRANGING_PAYMENT = gql`
    mutation TransitionToArrangingPayment {
        transitionOrderVendorToState(state: "ArrangingPayment") {
            ...Cart
        }
    }
    ${CART_FRAGMENT}
`;

export const APPLY_COUPON_CODE = gql`
    mutation ApplyCouponCode($couponCode: String! ) {
        applyCouponCode(couponCode: $couponCode){
            ...Cart
        }
    }
    ${CART_FRAGMENT}
`;

export const APPLY_COUPON_CODE_ORDER_VENDOR = gql `
    mutation applyCouponCodeForOrderVendor($orderId: ID!, $couponCode: String!) {
        applyCouponCodeForOrderVendor(orderId: $orderId, couponCode: $couponCode) {
            ...Cart
        }
    }
    ${CART_FRAGMENT}
`;

export const REMOVE_COUPON_CODE_ORDER_VENDOR = gql`
    mutation removeCouponCodeOrderVendor($orderId: ID!, $couponCode: String!) {
        removeCouponCodeForOrderVendor(orderId: $orderId, couponCode: $couponCode) {
            ...Cart
        }
    }
    ${CART_FRAGMENT}
`;

export const TRANSITION_ORDER_VENDOR_STATE = gql`
    mutation transitionToArrangingPayment {
        transitionOrderVendorToState(state: "ArrangingPayment") {
            ...Cart
        }
    }
    ${CART_FRAGMENT}
`;