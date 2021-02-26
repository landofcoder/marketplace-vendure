import { gql } from 'apollo-server-core';

export const commonApiExtensions = gql`
    type Contact implements Node {
        channelId: Int
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        deletedAt: DateTime
        sentAt: DateTime
        subject: String!
        message: String!
        body: String
        author: Customer
        authorName: String!
        authorEmail: String!
        authorPhone: String
        authorLocation: String
        authorIp: String
        adminUserId: Int
        error: String
        tags: String
        state: String!
        adminNote: String
        response: String
        responseCreatedAt: DateTime
        vendorId: Int
        params: String
        channels: Channel
    }

    type ContactDeleteReturn {
        error: String
        message: String
    }

    type ContactList implements PaginatedList {
        items: [Contact!]!
        totalItems: Int!
    }

    # Auto-generated at runtime
    input ContactListOptions{
        skip: Int!
        take: Int!
    }
`;

export const adminApiExtensions = gql`
    ${commonApiExtensions}

    input UpdateContactInput {
        id: ID!
        subject: String
        body: String
        message: String
        response: String
        state: String
        tags: String
        adminUserId: Int
        adminNote: String
    }

    extend type Query {
        contacts(options: ContactListOptions): ContactList!
        contact(id: ID!): Contact
    }

    extend type Mutation {
        updateContact(input: UpdateContactInput!): Contact!
        deleteContact(id: ID!): ContactDeleteReturn!
    }
`;

export const shopApiExtensions = gql`
    ${commonApiExtensions}

    input SubmitContactInput {
        channelId: Int
        customerId: ID
        subject: String!
        authorName: String!
        authorEmail: String!
        message: String!
        authorLocation: String
        authorPhone: String
        captcha: String
        authorIp: String
    }

    input SubmitContactShopInput {
        channelId: Int
        customerId: ID
        subject: String!
        authorName: String!
        authorEmail: String!
        message: String!
        authorLocation: String
        authorPhone: String
        captcha: String
        authorIp: String
    }

    extend type Mutation {
        submitContact(input: SubmitContactInput!): Contact!
        submitContactShop(input: SubmitContactShopInput!): Contact!
    }
`;
