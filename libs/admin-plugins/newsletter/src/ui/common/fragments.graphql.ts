import gql from 'graphql-tag';

export const SUBSCRIBER_FRAGMENT = gql`
    fragment Subscriber on Subscriber {
        id
        createdAt
        updatedAt
        email
        subscriberToken
        author{
            id
        }
        customerFirstName
        customerLastName
        customerPhone
        type
        status
        tags
    }
`;

export const NEWSLETTER_FRAGMENT = gql`
    fragment Newsletter on Newsletter {
        id
        createdAt
        updatedAt
        subject
        template_name
        type
        customerGroupId
        templateContent
        templateCss
        status
        priority
        params
    }
`;

export const NEWSLETTER_QUEUE_FRAGMENT = gql`
    fragment NewsletterQueue on NewsletterQueue {
        id
        createdAt
        updatedAt
        templateId
        newsletter_subject
        newsletter_template_name
        newsletter_text
        newsletter_styles
        newsletter_params
        queue_status
        queue_start_at
        queue_finish_at
    }
`;

export const DELETE_NEWSLETTER_FRAGMENT = gql`
    fragment NewsletterDeleteReturn on NewsletterDeleteReturn {
        error
        message
    }
`;
