export type SubscriberStatus = 'subscribed' | 'unsubscribed';
export type SubscriberType = 'guest' | 'customer';
export type TemplateType = 'text' | 'html';

export type NewsletterQueueJob = {
    queueId: string;
};

export type AddNewsletterQueueJob = {
    limitQueue: string;
}