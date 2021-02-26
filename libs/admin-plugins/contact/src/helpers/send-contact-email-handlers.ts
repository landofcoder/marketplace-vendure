import {SendContactEvent} from '../events/send-contact-event';
import {mockSendContactEvent} from './mock-events';
import { EmailEventListener } from '@vendure/email-plugin';
export const sendContactHandler = new EmailEventListener('send-contact')
    .on(SendContactEvent)
    .filter(event => event.contact.state === 'new' && !!event.contact.authorEmail)
    .setRecipient(event => (event.receiveEmailAddress)?event.receiveEmailAddress:"landofcoder@gmail.com")
    .setFrom(`{{ fromAddress }}`)
    .setSubject(`You received new contact from user {{ contact.authorName }}`)
    .setTemplateVars(event => ({ contact: event.contact }))
    .setMockEvent(mockSendContactEvent);