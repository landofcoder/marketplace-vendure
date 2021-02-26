import gql from 'graphql-tag';

import { PINCODE_FRAGMENT } from '../../common/fragments.graphql';

export const GET_PINCODE = gql`
    query GetPincode($id: ID!) {
        pincode(id: $id) {
            ...Pincode
        }
    }
    ${PINCODE_FRAGMENT}
`;
