import gql from 'graphql-tag';

export const PINCODE_FRAGMENT = gql`
    fragment Pincode on Pincode {
        id
        createdAt
        updatedAt
        pincode
        state
        district
        prepaid
        cod
        pickup
        cash
        repl
    }
`;

export const DELETE_PINCODE_FRAGMENT = gql`
    fragment PincodeDeleteReturn on PincodeDeleteReturn {
        error
        message
    }
`;