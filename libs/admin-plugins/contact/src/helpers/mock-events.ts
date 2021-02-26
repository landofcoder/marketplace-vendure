import {SendContactEvent} from '../events/send-contact-event';
import {Contact} from '../entities/contact.entity';

export const mockSendContactEvent = new SendContactEvent(
    {} as any,
    new Contact({
        id: 0,
        subject: "Test Contact subject",
        message: "Test Contact message",
        authorEmail: 'test@test.com',
        authorName: 'test',
        authorPhone: '111 1111 111',
        state: 'new'
    }),
    "support@yourdomain.com"
);