import { gql } from 'apollo-server-core';

export const shopApiExtensions = gql`
    type submitPayumoney {
        key: String,
        hash: String,
        txnid: String,
        amount: String,
        firstname: String,
        email: String,
        phone: String,
        productinfo: String,
        isProduction: String
    }
    extend type Query {
        generatePayumoneyMethod: submitPayumoney!
    }
`;