import gql from 'graphql-tag';

import { NEWSLETTER_FRAGMENT, DELETE_NEWSLETTER_FRAGMENT } from '../../common/fragments.graphql';

export const GET_ALL_NEWSLETTER = gql`
    query GetAllNewsletter($options: NewsletterListOptions) {
        newsletters(options: $options) {
            items {
                ...Newsletter
            }
            totalItems
        }
    }
    ${NEWSLETTER_FRAGMENT}
`;

export const DELETE_NEWSLETTER = gql`
    mutation DeleteNewsletter($id: ID!) {
        deleteNewsletter(id: $id) {
            ...NewsletterDeleteReturn
        }
    }
    ${DELETE_NEWSLETTER_FRAGMENT}
`;