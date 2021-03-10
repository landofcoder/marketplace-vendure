import { gql } from 'apollo-server-core';

export const commomApiExtensions = gql`
    type SEOConfig{
        id: ID!
        title: String
        titleTemplate: String
        description: String
        url: String
        site_name: String
    }

    input SEOConfigInput {
        id: ID!
        title: String
        titleTemplate: String
        description: String
        url: String
        site_name: String
    }
`;

export const shopApiExtensions = gql`
${commomApiExtensions}
    extend type Query {
        getSEOConfig : SEOConfig!
}
`;

export const adminApiExtensions = gql`
${commomApiExtensions}
    
    extend type Query {
        productGrid(options: ProductListOptions): ProductList!
        getSEOConfig: SEOConfig
    }

    extend type Mutation {
        setProductStatus(productID: ID!, status: String!): Product
        updateSEOConfig(input: SEOConfigInput!) : SEOConfig!
    }

`;
