import gql from 'graphql-tag';

export const GET_REVIEW_PRODUCT_LIST = gql`
    query GetReviewProductList($productId: ID!) {
        product(id: $productId) {
            reviews{
                items{
                    authorName
                    summary
                    rating
                    createdAt
                }
                totalItems
            }
        }
    }
`;