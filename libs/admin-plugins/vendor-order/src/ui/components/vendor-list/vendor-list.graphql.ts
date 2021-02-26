import gql from 'graphql-tag';

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
        verified
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

export const VENDOR_CONTACT_FRAGMENT = gql`
    fragment VendorContact on VendorContact {
        id
        contactName
        email
        phone
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
        postalCode
        city
        countryCode
        ADHAR
        aboutUs
        staffEmail
        phone
    }
`;

export const VENDOR_MARKETING_FRAGMENT = gql`
    fragment VendorMarketingContact on VendorMarketingContact {
        id
        name
        emailAddress
        phone
    }
`;

export const GET_VENDORS_LIST = gql`
    query GetVendorsList($options: VendorListOptions) {
        vendors(options: $options) {
            items {
                ...Vendor
            }
            totalItems
        }
    }
    ${VENDOR_FRAGMENT}
`;

export const DELETE_VENDOR = gql`
    mutation DeleteVendor($id: ID!) {
        deleteVendor(id: $id) {
            result
        }
    }
`;

