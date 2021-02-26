import gql from 'graphql-tag';

export const DELHIVERY_ACCOUNT_FRAGMENT = gql`
    fragment DelhiveryAccount on DelhiveryAccount {
        id
        client_name
        user_name
        api_key
        shipping_mode
        hand_fee
    }
`;

export const GET_DELHIVERY_ACCOUNT = gql`
    query GetDelhiveryAccount{
        delhiveryAccount {
            ...DelhiveryAccount
        }
    }
    ${DELHIVERY_ACCOUNT_FRAGMENT}
`;

export const UPDATE_DELHIVERY_ACCOUNT = gql`
    mutation UpdateDelhiveryAccount($input: UpdateDelhiveryAccountInput!) {
        updateDelhiveryAccount(
            input: $input
        ) {
            ...DelhiveryAccount
        }
    }
    ${DELHIVERY_ACCOUNT_FRAGMENT}
`;

