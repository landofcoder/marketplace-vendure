import { gql } from 'apollo-server-core';

export const commonApiExtensions = gql`
    type Subscriber implements Node {
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        subscriberToken: String
        author: Customer
        customerFirstName: String
        customerLastName: String
        customerPhone: String
        gender: String
        email: String!
        tags: String
        status: String!
        type: String!
    }

    type SubscriberList implements PaginatedList {
        items: [Subscriber!]!
        totalItems: Int!
    }

    # Auto-generated at runtime
    input SubscriberListOptions{
        skip: Int!
        take: Int!
    }

    type Newsletter implements Node {
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        subject: String
        customerGroupId: Int
        priority: Int
        template_name: String
        templateContent: String
        templateCss: String
        params: String
        status: Int!
        type: String!
    }

    type NewsletterList implements PaginatedList {
        items: [Newsletter!]!
        totalItems: Int!
    }

    # Auto-generated at runtime
    input NewsletterListOptions{
        skip: Int!
        take: Int!
    }

    type NewsletterQueue implements Node {
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        templateId: ID
        newsletter_subject: String
        newsletter_template_name: String
        newsletter_text: String
        newsletter_styles: String
        newsletter_params: String
        queue_status: Int!
        queue_start_at: DateTime
        queue_finish_at: DateTime
    }

    type NewsletterQueueLink implements Node {
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        subscriber: Subscriber
        queue: NewsletterQueue
        letter_sent_at: DateTime
    }

    type NewsletterQueueList implements PaginatedList {
        items: [NewsletterQueue!]!
        totalItems: Int!
    }

    # Auto-generated at runtime
    input NewsletterQueueListOptions{
        skip: Int!
        take: Int!
    }

    type NewsletterDeleteReturn {
        error: String
        message: String
    }
`;

export const adminApiExtensions = gql`
    ${commonApiExtensions}

    input UpdateSubscriberInput {
        id: ID!
        customerId: ID
        customerFirstName: String
        customerLastName: String
        customerPhone: String
        status: String
        tags: String
    }

    extend type Query {
        subscribers(options: SubscriberListOptions): SubscriberList!
        subscriber(id: ID!): Subscriber
    }

    extend type Mutation {
        updateSubscriber(input: UpdateSubscriberInput!): Subscriber!
        unSubscriber(id: ID!): Subscriber!
    }

    input UpdateNewsletterInput {
        id: ID!
        customerGroupId: ID
        template_name: String
        subject: String
        templateContent: String
        templateCss: String
        params: String
        status: Int!
        type: String!
        priority: Int
    }

    input SendNewsletterInput {
        email: String!
        newsletterId: ID!
    }

    input AddNewsletterInput {
        newsletterId: ID!
        startAt: DateTime!
        subject: String!
        templateContent: String!
        templateCss: String!
    }

    input SendNewsletterQueueInput {
        queueId: ID!
    }

    input DeleteNewsletterQueueInput {
        queueId: ID
        status: String
        startAt: String
        finishAt: String
    }

    extend type Query {
        newsletters(options: NewsletterListOptions): NewsletterList!
        newsletter(id: ID!): Newsletter
    }

    extend type Mutation {
        updateNewsletter(input: UpdateNewsletterInput!): Newsletter!
        sendNewsletter(input: SendNewsletterInput!): Newsletter!
        addNewsletterQueue(input: AddNewsletterInput!): NewsletterQueue!
        sendNewsletterQueue(input: SendNewsletterQueueInput!): NewsletterQueue!
        deleteNewsletter(id: ID!): NewsletterDeleteReturn!
        deleteSubscriber(id: ID!): NewsletterDeleteReturn!
        deleteNewsletterQueue(input: DeleteNewsletterQueueInput!): NewsletterDeleteReturn!
    }
`;

export const shopApiExtensions = gql`
    ${commonApiExtensions}

    input SubmitSubscriberInput {
        customerId: ID
        firstName: String
        lastName: String
        email: String!
        phone: String
        captcha: String
    }

    input SubmitUnSubscriberInput {
        token: String!
    }

    extend type Mutation {
        submitSubscriber(input: SubmitSubscriberInput!): Subscriber!
    }
    extend type Mutation {
        submitUnSubscriber(input: SubmitUnSubscriberInput!): Subscriber!
    }
`;
