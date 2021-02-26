import gql from 'graphql-tag';

import { 
  VENDOR_FRAGMENT, VENDOR_INFO_FRAGMENT, VENDOR_CONTACT_FRAGMENT, VENDOR_BANK_FRAGMENT 
} from '../fragments.graphql';

export const CREATE_VENDOR = gql `
  mutation createVendor($input: VendorInput!) {
    createVendor(input: $input) {
      ...Vendor
    }
  }
  ${VENDOR_FRAGMENT}
`;

export const CREATE_VENDOR_INFO = gql`
  mutation createVendorInfo($input: VendorInfoInput!) {
    createVendorInfo(input: $input) {
      ...VendorInfo
    }
  }
  ${VENDOR_INFO_FRAGMENT}
`;
export const CREATE_VENDOR_CONTACT = gql`
  mutation createVendorContact($input: VendorContactInput!) {
    createVendorContact(input: $input) {
      ...VendorContact
    }
  }
  ${VENDOR_CONTACT_FRAGMENT}
`;
export const CREATE_VENDOR_MARKETING_CONTACT = gql`
  mutation createVendorMarketingContact($input: VendorMarketingContactInput!) {
    createVendorMarketingContact(input: $input) {
      id
      name
      emailAddress
      phone
    }
  }
`;
export const CREATE_VENDOR_BANK = gql`
  mutation createVendorBank($input: VendorBankInput!) {
    createVendorBank(input: $input) {
      ...VendorBank
    }
  }
  ${VENDOR_BANK_FRAGMENT}
`;
export const GET_VENDOR_BY_EMAIL = gql`
  query getVendorByEmail($email: String!) {
    getVendorByEmail(email: $email) {
      ...Vendor
    }
  }
  ${VENDOR_FRAGMENT}
`;