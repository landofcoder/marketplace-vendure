import gql from 'graphql-tag';
import { VENDOR_INFO_FRAGMENT } from '../fragments.graphql';

export const GET_VENDOR_INFO = gql`
    query GetVendorInfo($channelCode: String!) {
        getVendorByBrand(brand: $channelCode) {
            id
            channel {
                id
                code
                createdAt
            }
            info {
                ...VendorInfo
            }
            email
            firstName
            lastName
            ownerName
            ownerEmail
            phone
        }
    }
    ${VENDOR_INFO_FRAGMENT}
`;