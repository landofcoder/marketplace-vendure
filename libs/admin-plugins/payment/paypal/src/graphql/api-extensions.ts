import { gql } from 'apollo-server-core';

export const shopApiExtensions = gql`
    type PaypalOrder {
        id: String
    }

    enum Status {
        success,
        fail
    }
    
    type ExucetePaypal {
        status: Status,
        data: JSON
    }
    enum PaypalEnv{
        production,
        sandbox
    }
    
    extend type Query {
        getPaypalEnv: PaypalEnv
    }
    
    extend type Mutation {
        createPaymentForPaypalMethod(returnURL: String, cancelURL: String): PaypalOrder!
        executePaymentForPaypalMethod(paymentID: String, payerID: String): ExucetePaypal!
    }
`;