import gql from 'graphql-tag';

export const VERIFY_CHANGE_EMAIL_ADDRESS = gql`
    mutation VerifyChangeEmailAddress($token: String!) {
        updateCustomerEmailAddress(token: $token) {
            ...on Success {
                success
            }
            ...on IdentifierChangeTokenInvalidError {
                errorCode
                message
            }
            ...on IdentifierChangeTokenExpiredError {
                errorCode
                message
            }
            ...on NativeAuthStrategyError {
                errorCode
                message
            }
        }
    }
`;