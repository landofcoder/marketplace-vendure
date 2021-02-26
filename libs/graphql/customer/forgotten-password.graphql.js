import gql from 'graphql-tag';

export const REQUEST_PASSWORD_RESET = gql`
    mutation RequestPasswordReset($emailAddress: String!) {
        requestPasswordReset(emailAddress: $emailAddress) {
            ...on Success {
                success
            }
            ...on NativeAuthStrategyError {
                errorCode
                message
            }
        }
    }
`;
