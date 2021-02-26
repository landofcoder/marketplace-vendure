import gql from 'graphql-tag';

import { SUBSCRIBER_FRAGMENT } from '../../common/fragments.graphql';

export const GET_SUBSCRIBER = gql`
    query GetSubscriber($id: ID!) {
        subscriber(id: $id) {
            ...Subscriber
        }
    }
    ${SUBSCRIBER_FRAGMENT}
`;
