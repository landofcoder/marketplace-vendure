import gql from 'graphql-tag';

import { PINCODE_FRAGMENT } from '../../common/fragments.graphql';

export const UPDATE_PINCODE = gql`
    mutation UpdatePincode($input: UpdatePincodeInput!) {
        updatePincode(input: $input) {
            ...Pincode
        }
    }
    ${PINCODE_FRAGMENT}
`;

export const CREATE_PINCODE = gql`
    mutation CreatePincode($input: CreatePincodeInput!) {
        createPincode(input: $input) {
            ...Pincode
        }
    }
    ${PINCODE_FRAGMENT}
`;