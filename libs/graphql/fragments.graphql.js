import gql from 'graphql-tag';

export const ASSET_FRAGMENT = gql`
    fragment Asset on Asset {
        id
        width
        height
        name
        preview
        focalPoint {
            x
            y
        }
    }
`;

export const SHIPPING_METHOD_FRAGMENT = gql`
    fragment ShippingMethodFragment on ShippingMethod {
        id
        code
        calculator {
            args {
                name
                value
            }
        }
    }
`;
export const SHIPPING_ADDRESS_FRAGMENT = gql`
    fragment shippingAddress on OrderAddress {
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
export const CUSTOMER_FRAGMENT = gql`
    fragment Customer on Customer {
        firstName
        lastName
        phoneNumber
        emailAddress
    }
`;
export const CART_FRAGMENT = gql`
    fragment Cart on Order {
        id
        code
        state
        active
        currencyCode
        channel {
            id
            code
        }
        couponCodes
        lines {
            id
            productVariant {
                id
                sku
                name
                taxRateApplied {
                    value
                }
                product {
                    id
                    slug
                }
            }
            featuredAsset {
                ...Asset
            }
            unitPrice
            unitPriceWithTax
            quantity
            totalPrice
            adjustments {
                amount
                description
                adjustmentSource
                type
            }
        }
        subTotal
        subTotalBeforeTax
        totalBeforeTax
        shipping
        total
        adjustments {
            amount
            description
            adjustmentSource
            type
        }
        shippingMethod {
            ...ShippingMethodFragment
        }
        shippingAddress {
            ...shippingAddress
        }
        customer {
            ...Customer
        }
    }
    ${SHIPPING_METHOD_FRAGMENT}
    ${ASSET_FRAGMENT}
    ${SHIPPING_ADDRESS_FRAGMENT}
    ${CUSTOMER_FRAGMENT}
`;

export const COUNTRY_FRAGMENT = gql`
    fragment Country on Country {
        id
        code
        name
        enabled
    }
`;

export const ORDER_ADDRESS_FRAGMENT = gql`
    fragment OrderAddress on OrderAddress {
        fullName
        company
        streetLine1
        streetLine2
        city
        province
        postalCode
        country
        phoneNumber
    }
`;

export const ADDRESS_FRAGMENT = gql`
    fragment Address on Address {
        id
        fullName
        company
        streetLine1
        streetLine2
        city
        province
        postalCode
        country {
            id
            code
            name
        }
        phoneNumber
        defaultShippingAddress
        defaultBillingAddress
    }
`;

export const VENDOR_FRAGMENT = gql`
    fragment Vendor on Vendor {
        id
        firstName
        lastName
        email
        phone
        GSTINID
        state
        ownerName
        ownerEmail
    }
`;
export const VENDOR_INFO_FRAGMENT = gql`
    fragment VendorInfo on VendorInfo {
        id
        brandName
        regAddress
        panno
        GSTINID
        state
        ADHAR
        aboutUs
        staffEmail
        phone
    }
`;

export const VENDOR_CONTACT_FRAGMENT = gql`
    fragment VendorContact on VendorContact {
        id
        contactName
        email
        phone
    }
`;

export const VENDOR_BANK_FRAGMENT = gql`
    fragment VendorBank on VendorBank {
        id
        account
        code
        address
        type
        isCheck
    }
`;

export const PRODUCT_FRAGMENT = gql`
    fragment Product on Product {
        id
        name
        description
        variants {
            id
            name
            options {
                code
                name
                group {
                    id
                    code
                    name
                }
            }
            price
            priceWithTax
            sku
            currencyCode
        }
        featuredAsset {
            ...Asset
        }
        assets {
            ...Asset
        }
        collections {
            id
            name
            slug
            featuredAsset {
                ...Asset
            }
            breadcrumbs {
                id
                name
            }
        }
        channel {
            id
            code
        }
    }
    ${ASSET_FRAGMENT}
`;