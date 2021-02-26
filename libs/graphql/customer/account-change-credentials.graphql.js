import gql from 'graphql-tag';

export const CHANGE_PASSWORD = gql`
    mutation ChangePassword($old: String! $new: String!) {
        updateCustomerPassword(currentPassword: $old newPassword: $new) {
            ...on Success {
                success
            }
            ...on InvalidCredentialsError {
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

export const CHANGE_EMAIL_ADDRESS = gql`
    mutation ChangeEmailAddress($password: String! $emailAddress: String!) {
        requestUpdateCustomerEmailAddress(password: $password newEmailAddress: $emailAddress) {
            ...on Success {
                success
            }
            ...on InvalidCredentialsError {
                errorCode
                message
            }
            ...on EmailAddressConflictError {
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