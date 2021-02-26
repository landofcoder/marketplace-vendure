import gql from 'graphql-tag';

export const FULFILLMENT_FRAGMENT = gql`
    fragment Fulfillment on Fulfillment {
        nextStates
        id
        createdAt
        updatedAt
        state
        method
        trackingCode
    }
`;
export const LINES_FRAGMENT = gql`
    fragment LinesFragment on OrderLine {
        id
        quantity
        adjustments {
            adjustmentSource
            amount
            description
            type
        }
        featuredAsset {
            preview
        }
        items {
            fulfillment {
                id
                state
                method
                trackingCode
            }
        }
        linePrice
        linePriceWithTax
        lineTax
        productVariant {
            id
            name
            sku
            stockOnHand
            trackInventory
            customFields {
                weight
            }
        }
    }
`;
export const PAYMENT_FRAGMENT = gql`
    fragment PaymentFragment on Payment {
        id
        createdAt
        method
        amount
        state
        transactionId
        refunds {
            id
        }
        metadata
    }
`;
export const SHIPPING_ADDRESS = gql`
    fragment ShippingAddress on OrderAddress {
        city
        company
        country
        fullName
        phoneNumber
        postalCode
        province
        streetLine1
        streetLine2
    }
`;
export const BILLING_ADDRESS_FRAGMENT = gql`
    fragment BillingAddressFragment on OrderAddress {
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
export const PACKING_SLIP_FRAGMENT = gql`
    fragment PackingSlip on PackingSlip {
        origin
        invoice_reference
        shipment_width
        pin
        cl
        intl
        origin_state_code
        cd
        ewbn
        rph
        shipment_length
        snm
        barcode
        origin_city
        weight
        pt
        rs
        destination
        si
        destination_city
        hsn_code
        tin
        contact
        origin_state
        oid_barcode
        sid
        cst
        prd
        rcty
        consignee_gst_tin
        cnph
        sadd
        oid
        customer_state
        mot
        radd
        customer_state_code
        address
        rst
        seller_gst_tin
        shipment_height
        pdd
        product_type
        name
        st_code
        cl_logo
        st
        client_gst_tin
        etc
        delhivery_logo
        client_type
        cod
        wbn
        sort_code
        rpin
    }
`;

// export const CREATE_FULFILLMENT = gql`
//     mutation CreateFulfillment($input: FulfillOrderInput!) {
//         fulfillOrder(input: $input) {
//             ...Fulfillment
//         }
//     }
//     ${FULFILLMENT_FRAGMENT}
// `;


export const GET_PACKING_SLIP = gql`
    query getPackingSlip($trackingCode: String!) {
        getPackingSlip(trackingCode: $trackingCode) {
            ...PackingSlip
        }
    }
    ${PACKING_SLIP_FRAGMENT}
`;

export const GET_ORDER_DETAIL = gql`
    query getOrderDetail ($orderId: ID!) {
        order(id: $orderId) {
            id
            active
            createdAt
            updatedAt
            code
            state
            currencyCode
            nextStates
            lines {
                ...LinesFragment
            }
            customFields {
                session
            }
            customer {
                id
                firstName
                lastName
            }
            fulfillments {
                ...Fulfillment
            }
            payments {
                ...PaymentFragment
            }
            promotions {
                id
                name
                couponCode
            }
            shipping
            shippingAddress {
                ...ShippingAddress
            }
            shippingMethod {
                code
                description
                id
                name
            }
            billingAddress {
                ...BillingAddressFragment
            }
            channels {
                id
            }
            shippingWithTax
            subTotal
            subTotalBeforeTax
            total
            totalBeforeTax
        }
    }
    ${LINES_FRAGMENT}
    ${FULFILLMENT_FRAGMENT}
    ${PAYMENT_FRAGMENT}
    ${SHIPPING_ADDRESS}
    ${BILLING_ADDRESS_FRAGMENT}
`;

export const ADD_FULFILLMENT_TO_ORDER = gql`
    mutation addFulfillmentToOrder ($input: FulfillOrderInput!) {
        addFulfillmentToOrder(input: $input) {
            ...on Fulfillment {
                ...Fulfillment
            }
        }
    }
    ${FULFILLMENT_FRAGMENT}
`;

export const CREATE_FULFILLMENT_ORDER = gql`
    mutation fulfillOrder($input: FulfillOrderInput!) {
        fulfillOrder(input: $input) {
            ...on Fulfillment {
                ...Fulfillment
            }
        }
    }
    ${FULFILLMENT_FRAGMENT}
`;