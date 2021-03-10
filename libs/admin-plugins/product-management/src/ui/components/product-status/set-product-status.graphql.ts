import gql from 'graphql-tag';

export const SET_PRODUCT_STATUS = gql`
    mutation SetProductStatus($productID: ID!, $status: String!) {
        setProductStatus(productID: $productID, status: $status){
            id
        }
    }
`;