import gql from 'graphql-tag';
import {
    VENDOR_FRAGMENT,
    VENDOR_BANK_FRAGMENT,
    VENDOR_CONTACT_FRAGMENT,
    VENDOR_INFO_FRAGMENT,
    VENDOR_MARKETING_FRAGMENT
} from '../vendor-list/vendor-list.graphql';

export const VENDOR_DETAIL_FRAGMENT = gql`
    fragment VendorDetail on Vendor {
        ...Vendor
        user {
            roles {
                id
                code
            }
        }
        banks {
            ...VendorBank
        }
        contacts {
            ...VendorContact
        }
        info {
            ...VendorInfo
        }
        marketing {
            ...VendorMarketingContact
        }
    }
    ${VENDOR_MARKETING_FRAGMENT}
    ${VENDOR_INFO_FRAGMENT}
    ${VENDOR_CONTACT_FRAGMENT}
    ${VENDOR_BANK_FRAGMENT}
    ${VENDOR_FRAGMENT}
`;

export const GET_CURRENT_VENDOR = gql`
    query GetCurrentVendor{
        activeVendor {
            ...VendorDetail
        }
    }
    ${VENDOR_DETAIL_FRAGMENT}
`;

export const GET_VENDOR_BY_ID = gql`
    query GetVendorByID($id: ID!){
        getVendorByID(id: $id) {
            ...VendorDetail
        }
    }
    ${VENDOR_DETAIL_FRAGMENT}
`;

export const UPDATE_VENDOR = gql`
    mutation UpdateVendor($input: UpdateVendorInput!) {
        updateVendor(
            input: $input
        ) {
            ...Vendor
        }
    }
    ${VENDOR_FRAGMENT}
`;

export const UPDATE_VENDOR_INFO = gql`
    mutation UpdateVendorInfo($input: UpdateVendorInfoInput!) {
        updateVendorInfo(
            input: $input
        ) {
            ...VendorInfo
        }
    }
    ${VENDOR_INFO_FRAGMENT}
`;

export const UPDATE_VENDOR_BANK = gql`
    mutation UpdateVendorBank($input: UpdateVendorBankInput!) {
        updateVendorBank(
            input: $input
        ) {
            ...VendorBank
        }
    }
    ${VENDOR_BANK_FRAGMENT}
`;

export const UPDATE_VENDOR_CONTACT = gql`
    mutation UpdateVendorContact($input: UpdateVendorContactInput!) {
        updateVendorContact(
            input: $input
        ) {
            ...VendorContact
        }
    }
    ${VENDOR_CONTACT_FRAGMENT}
`;

export const UPDATE_VENDOR_MARKETING_CONTACT = gql`
    mutation UpdateVendorMaketingContact($input: UpdateVendorMarketingInput!) {
        updateVendorMaketingContact(
            input: $input
        ) {
            ...VendorMarketingContact
        }
    }
    ${VENDOR_MARKETING_FRAGMENT}
`;

