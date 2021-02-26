import { gql } from 'apollo-server-core';

export const adminApiExtensions = gql`
    
    type EcomExpressAccount implements Node {
        id: ID!
        username: String
        password: String
        production: Boolean
    }
    input EcomExpressInput {
        id: ID
        username: String!
        password: String!
        production: Boolean!
    }
    
    extend type Mutation {
       updateEcomExpressConfig(input: EcomExpressInput!) : EcomExpressAccount!
    }
    extend type Query {
        ecomexpressAccountConfig: EcomExpressAccount
    }
    
`;