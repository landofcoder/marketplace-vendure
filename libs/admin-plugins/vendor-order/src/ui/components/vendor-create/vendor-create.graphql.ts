import gql from "graphql-tag";
import {
  VENDOR_BANK_FRAGMENT,
  VENDOR_CONTACT_FRAGMENT,
  VENDOR_FRAGMENT,
  VENDOR_INFO_FRAGMENT,
  VENDOR_MARKETING_FRAGMENT,
} from "../vendor-list/vendor-list.graphql";

export const CREATE_VENDOR = gql`
  mutation CreateVendor($input: VendorInput!) {
    createVendor(input: $input) {
      ...Vendor
    }
  }
  ${VENDOR_FRAGMENT}
`;

export const CREATE_VENDOR_INFO = gql`
  mutation CreateVendorInfo($input: VendorInfoInput!) {
    createVendorInfo(input: $input) {
      ...VendorInfo
    }
  }
  ${VENDOR_INFO_FRAGMENT}
`;

export const CREATE_VENDOR_BANK = gql`
  mutation CreateVendorBank($input: VendorBankInput!) {
    createVendorBank(input: $input) {
      ...VendorBank
    }
  }
  ${VENDOR_BANK_FRAGMENT}
`;

export const CREATE_VENDOR_CONTACT = gql`
  mutation CreateVendorContact($input: VendorContactInput!) {
    createVendorContact(input: $input) {
      ...VendorContact
    }
  }
  ${VENDOR_CONTACT_FRAGMENT}
`;

export const CREATE_VENDOR_MARKETING_CONTACT = gql`
  mutation createVendorMarketingContact($input: VendorMarketingContactInput!) {
    createVendorMarketingContact(input: $input) {
      ...VendorMarketingContact
    }
  }
  ${VENDOR_MARKETING_FRAGMENT}
`;
