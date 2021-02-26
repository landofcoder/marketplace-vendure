import gql from 'graphql-tag';

import { CONTACT_FRAGMENT, DELETE_CONTACT_FRAGMENT } from '../../common/fragments.graphql';

export const GET_ALL_CONTACT = gql`
    query GetAllContact($options: ContactListOptions) {
        contacts(options: $options) {
            items {
                ...Contact
            }
            totalItems
        }
    }
    ${CONTACT_FRAGMENT}
`;

export const DELETE_CONTACT = gql`
    mutation DeleteContact($id: ID!) {
        deleteContact(id: $id) {
            ...ContactDeleteReturn
        }
    }
    ${DELETE_CONTACT_FRAGMENT}
`;