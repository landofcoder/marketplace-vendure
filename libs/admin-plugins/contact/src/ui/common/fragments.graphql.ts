import gql from 'graphql-tag';

export const CONTACT_FRAGMENT = gql`
    fragment Contact on Contact {
        channelId
        id
        createdAt
        updatedAt
        deletedAt
        sentAt
        subject
        message
        body
        authorEmail
        authorPhone
        authorName
        authorLocation
        authorIp
        adminUserId
        error
        tags
        adminNote
        state
        response
        responseCreatedAt
    }
`;

export const DELETE_CONTACT_FRAGMENT = gql`
    fragment ContactDeleteReturn on ContactDeleteReturn {
        error
        message
    }
`;
