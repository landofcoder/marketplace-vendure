import gql from 'graphql-tag';

export const CONTACT_US_SHOP = gql`
    mutation ContactUsShop($channelId: Int $customerId: ID $authorName: String! $authorEmail: String! $authorPhone: String $authorLocation: String $authorIp: String $subject: String! $message: String! $captcha: String) {
        submitContactShop(input: {channelId: $channelId authorName: $authorName authorEmail: $authorEmail subject: $subject message: $message customerId: $customerId authorPhone: $authorPhone authorLocation: $authorLocation captcha: $captcha authorIp: $authorIp}){
            channelId
        }
    }
`;
