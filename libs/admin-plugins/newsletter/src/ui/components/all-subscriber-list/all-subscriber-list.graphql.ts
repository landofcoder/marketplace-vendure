import gql from 'graphql-tag';

import { SUBSCRIBER_FRAGMENT, DELETE_NEWSLETTER_FRAGMENT } from '../../common/fragments.graphql';

export const GET_ALL_SUBSCRIBER = gql`
    query GetAllSubscriber($options: SubscriberListOptions) {
        subscribers(options: $options) {
            items {
                ...Subscriber
            }
            totalItems
        }
    }
    ${SUBSCRIBER_FRAGMENT}
`;

export const DELETE_SUBSCRIBER = gql`
    mutation DeleteSubscriber($id: ID!) {
        deleteSubscriber(id: $id) {
            ...NewsletterDeleteReturn
        }
    }
    ${DELETE_NEWSLETTER_FRAGMENT}
`;

export const SUBMIT_UNSUBSCRIBER = gql`
    mutation UnSubscriber($id: ID!) {
        unSubscriber(id: $id) {
            ...Subscriber
        }
    }
    ${SUBSCRIBER_FRAGMENT}
`;