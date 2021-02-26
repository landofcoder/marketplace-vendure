import {SendSubscriberEvent, SendUnSubscriberEvent, SendNewsletterEvent} from '../events/newsletter-event';
import {mockSendSubscriberEvent, mockSendUnSubscriberEvent, mockSendNewsletterEvent} from './mock-events';
import { EmailEventListener } from '@vendure/email-plugin';
export const sendSubscriberHandler = new EmailEventListener('send-subscriber')
    .on(SendSubscriberEvent)
    .filter(event => event.subscriber.status === 'subscribed')
    .setRecipient(event => event.subscriber.email)
    .setFrom(`{{ fromAddress }}`)
    .setSubject(`Thanks you for subsriber our newsletter`)
    .setTemplateVars(event => ({ subscriber: event.subscriber }))
    .setMockEvent(mockSendSubscriberEvent);

export const sendUnSubscriberHandler = new EmailEventListener('send-unsubscriber')
    .on(SendUnSubscriberEvent)
    .filter(event => event.subscriber.status === 'unsubscribed')
    .setRecipient(event => event.subscriber.email)
    .setFrom(`{{ fromAddress }}`)
    .setSubject(`You unsubsribed our newsletter`)
    .setTemplateVars(event => ({ subscriber: event.subscriber }))
    .setMockEvent(mockSendUnSubscriberEvent);

export const sendNewsletterHandler = new EmailEventListener('send-newsletter')
    .on(SendNewsletterEvent)
    .filter(event => event.subscriber.status === 'subscribed')
    .setRecipient(event => event.subscriber.email)
    .setFrom(`{{ fromAddress }}`)
    .setSubject(`{{ newsletter.subject }}`)
    .setTemplateVars(event => ({ subscriber: event.subscriber, newsletter: event.newsletter }))
    .setMockEvent(mockSendNewsletterEvent);