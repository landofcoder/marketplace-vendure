import gql from 'graphql-tag';

import { NEWSLETTER_QUEUE_FRAGMENT } from '../../common/fragments.graphql';

export const UPDATE_NEWSLETTER_QUEUE = gql`
    mutation UpdateNewsletterQueue($input: AddNewsletterInput!) {
        addNewsletterQueue(input: $input) {
            ...NewsletterQueue
        }
    }
    ${NEWSLETTER_QUEUE_FRAGMENT}
`;