import { gql } from 'apollo-server-core';

export const commonApiExtensions = gql`
    type Pincode implements Node {
        createdAt: DateTime!
        updatedAt: DateTime!
        id: ID!
        pincode: Int
        state: String
        district: String
        prepaid: Boolean
        cod: Boolean
        pickup: Boolean
        cash: Boolean
        repl: Boolean
    }

    type PincodeList implements PaginatedList {
        items: [Pincode!]!
        totalItems: Int!
    }

    type PincodeDeleteReturn {
        error: String
        message: String
    }

    # Auto-generated at runtime
    input PincodeListOptions {
        skip: Int!
        take: Int!
    }

    input CheckPincodeInput {
        pincode: String!
        productWeight: Int
    }
`;

export const adminApiExtensions = gql`
    ${commonApiExtensions}

    input UpdatePincodeInput {
        id: ID!
        pincode: Int
        state: String
        district: String
        prepaid: Boolean
        cod: Boolean
        pickup: Boolean
        cash: Boolean
        repl: Boolean
    }

    input CreatePincodeInput {
        pincode: Int
        state: String
        district: String
        prepaid: Boolean
        cod: Boolean
        pickup: Boolean
        cash: Boolean
        repl: Boolean
    }

    extend type Mutation {
        createPincode(input: CreatePincodeInput!): Pincode!
        updatePincode(input: UpdatePincodeInput!): Pincode!
        deletePincode(id: ID!): PincodeDeleteReturn!
    }
    
    extend type Query {
        pincodes(options: PincodeListOptions): PincodeList!
        pincode(id: ID!): Pincode
        checkPincode(input: CheckPincodeInput!): Pincode!
    }
`;

export const shopApiExtensions = gql`
    ${commonApiExtensions}
    
    type resultCheckPincode {
        status: String
        data: JSON
    }
    
    extend type Query {
        checkPincode(input: CheckPincodeInput!): resultCheckPincode!
    }
`;
