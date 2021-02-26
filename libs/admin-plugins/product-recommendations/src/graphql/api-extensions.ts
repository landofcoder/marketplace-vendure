import { gql } from 'apollo-server-core';

export const adminApiExtensions = gql`
  enum RecommendationType {
    CROSSSELL
    UPSELL
    RELATED
  }

  type ProductRecommendation {
    product: Product!
    recommendation: Product!
    type: RecommendationType!
  }
  extend type Query {
    productRecommendations(productId: ID!): [ProductRecommendation!]!
  }

  extend type Mutation {
    updateCrossSellingProducts(productId: ID!, productIds: [ID!]!): Boolean!
    updateUpSellingProducts(productId: ID!, productIds: [ID!]!): Boolean!
    updateRelatedProducts(productId: ID!, productIds: [ID!]!): Boolean!
    autoRelatedProducts(productId: ID!): Boolean!
  }
`;

export const shopApiExtensions = gql`
  enum RecommendationType {
    CROSSSELL
    UPSELL
    RELATED
  }

  type ProductRecommendation {
    product: Product!
    recommendation: Product!
    type: RecommendationType!
  }

  extend type Product {
      recommendations: [ProductRecommendation!]!
  }
  
  extend type Query {
    productRecommendations(productId: ID!): [ProductRecommendation!]!
  }
`;
