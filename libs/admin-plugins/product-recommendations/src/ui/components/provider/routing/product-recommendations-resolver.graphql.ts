import gql from 'graphql-tag';

export const PRODUCT_RECOMMENDATIONS = gql`
    query ProductRecommendations($productId: ID!){
        productRecommendations(productId: $productId){
            type
            recommendation {
                id
                name
            }
        }
    }
`;
export const UPDATE_RECOMMENDATIONS = gql`
    mutation updateRecommendations($productId: ID!, $crossSellIds: [ID!]!, $upSellIds: [ID!]!){
        updateCrossSellingProducts(productId: $productId, productIds: $crossSellIds)
        updateUpSellingProducts(productId: $productId, productIds: $upSellIds)
    }
`;