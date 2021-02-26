import gql from 'graphql-tag';

import { NEWSLETTER_FRAGMENT } from '../../common/fragments.graphql';

export const UPDATE_NEWSLETTER = gql`
    mutation UpdateNewsletter($input: UpdateNewsletterInput!) {
        updateNewsletter(input: $input) {
            ...Newsletter
        }
    }
    ${NEWSLETTER_FRAGMENT}
`;