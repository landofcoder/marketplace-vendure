import gql from 'graphql-tag';

export const SUBSRIBE_NEWSLETTER = gql`
    mutation SubscribeNewsletter($customerId: ID $firstName: String $lastName: String $email: String! $phone: String $captcha: String) {
        submitSubscriber(input: {customerId: $customerId firstName: $firstName lastName: $lastName email: $email phone: $phone captcha: $captcha}){
            createdAt
        }
    }
`;

export const UNSUBSRIBE_NEWSLETTER = gql`
    mutation UnSubscribeNewsletter($token: String!) {
        submitUnSubscriber(input: {token: $token}){
            createdAt
            status
        }
    }
`;