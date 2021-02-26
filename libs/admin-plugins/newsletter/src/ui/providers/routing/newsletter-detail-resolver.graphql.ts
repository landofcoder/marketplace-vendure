import gql from 'graphql-tag';

import { NEWSLETTER_FRAGMENT } from '../../common/fragments.graphql';

export const GET_NEWSLETTER = gql`
    query GetNewsletter($id: ID!) {
        newsletter(id: $id) {
            ...Newsletter
        }
    }
    ${NEWSLETTER_FRAGMENT}
`;
