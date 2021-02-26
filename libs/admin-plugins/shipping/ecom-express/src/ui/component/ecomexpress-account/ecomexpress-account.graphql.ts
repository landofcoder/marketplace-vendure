import gql from 'graphql-tag';

export const ECOMEXPRESS_ACCOUNT_FRAGMENT = gql`
    fragment EcomExpressAccount on EcomExpressAccount {
        id
        username
        password
        production
    }
`;

export const GET_ECOMEXPRESS_ACCOUNT = gql`
    query GetEcomExpressAccount{
        ecomexpressAccountConfig {
            ...EcomExpressAccount
        }
    }
    ${ECOMEXPRESS_ACCOUNT_FRAGMENT}
`;

export const UPDATE_ECOMEXPRESS_ACCOUNT = gql`
    mutation updateEcomExpressConfig($input: EcomExpressInput!) {
        updateEcomExpressConfig(
            input: $input
        ) {
            ...EcomExpressAccount
        }
    }
    ${ECOMEXPRESS_ACCOUNT_FRAGMENT}
`;

