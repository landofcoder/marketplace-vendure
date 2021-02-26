import gql from 'graphql-tag';

export const CREATE_REVIEW_PRODUCT  = gql`
    mutation SubmitProductReview($input: SubmitProductReviewInput!) {
        submitProductReview(input: $input){
            id
            summary
            rating
            author{
                id
                firstName
                lastName
                emailAddress
            }
        }
    }
`;