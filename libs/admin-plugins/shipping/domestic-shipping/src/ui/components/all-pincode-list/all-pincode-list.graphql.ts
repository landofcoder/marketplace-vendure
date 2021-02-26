import gql from 'graphql-tag';

import { PINCODE_FRAGMENT, DELETE_PINCODE_FRAGMENT } from '../../common/fragments.graphql';

export const GET_ALL_PINCODE = gql`
    query GetAllPincode($options: PincodeListOptions) {
        pincodes(options: $options) {
            items {
                ...Pincode
            }
            totalItems
        }
    }
    ${PINCODE_FRAGMENT}
`;

export const DELETE_PINCODE = gql`
    mutation DeletePincode($id: ID!) {
        deletePincode(id: $id) {
            ...PincodeDeleteReturn
        }
    }
    ${DELETE_PINCODE_FRAGMENT}
`;

export const CHECK_PINCODE = gql`
    query CheckPincode($pincode: CheckPincodeInput!) {
        checkPincode(input: $pincode) {
            ...Pincode
        }
    }
    ${PINCODE_FRAGMENT}
`;