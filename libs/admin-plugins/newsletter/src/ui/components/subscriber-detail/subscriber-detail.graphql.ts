import gql from 'graphql-tag';

import { SUBSCRIBER_FRAGMENT } from '../../common/fragments.graphql';

export const UPDATE_SUBSCRIBER = gql`
    mutation UpdateSubscriber($input: UpdateSubscriberInput!) {
        updateSubscriber(input: $input) {
            ...Subscriber
        }
    }
    ${SUBSCRIBER_FRAGMENT}
`;