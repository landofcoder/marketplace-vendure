import gql from 'graphql-tag';

import { CONTACT_FRAGMENT } from '../../common/fragments.graphql';

export const GET_CONTACT = gql`
    query GetContact($id: ID!) {
        contact(id: $id) {
            ...Contact
        }
    }
    ${CONTACT_FRAGMENT}
`;
