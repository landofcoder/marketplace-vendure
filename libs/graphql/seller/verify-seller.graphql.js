import gql from 'graphql-tag';

export const VERIFY_SELLER  = gql`
    mutation VerifyVendorAccount($token: String!, $password: String) {
        verifyVendorAccount(
            token: $token
            password: $password
        ) {
            result
        }
    }
`;