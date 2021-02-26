import gql from 'graphql-tag';

export const VERIFY = gql`
    mutation Verify($password: String, $token: String!) {
        verifyCustomerAccount(password: $password, token: $token) {
            ...on CurrentUser {
                id
                identifier
            }
            ... on ErrorResult{
                errorCode
                message
            }
        }
    }
`;