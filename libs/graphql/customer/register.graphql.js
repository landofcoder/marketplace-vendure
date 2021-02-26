import gql from 'graphql-tag';

export const REGISTER = gql`
    mutation Register($input: RegisterCustomerInput!) {
        registerCustomerAccount(input: $input) {
            ...on Success {
                success
            }
            ...on MissingPasswordError {
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