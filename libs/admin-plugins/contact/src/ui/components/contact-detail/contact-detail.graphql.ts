import gql from 'graphql-tag';

import { CONTACT_FRAGMENT } from '../../common/fragments.graphql';

export const UPDATE_CONTACT = gql`
    mutation UpdateContact($input: UpdateContactInput!) {
        updateContact(input: $input) {
            ...Contact
        }
    }
    ${CONTACT_FRAGMENT}
`;