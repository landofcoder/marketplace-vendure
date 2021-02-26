import {SendSubscriberEvent, SendUnSubscriberEvent, SendNewsletterEvent} from '../events/newsletter-event';
import {Subscriber} from '../entities/subscriber.entity';
import {Newsletter} from '../entities/newsletter.entity';
export const mockSendSubscriberEvent = new SendSubscriberEvent(
    {} as any,
    new Subscriber({
        id: 0,
        email: 'test@test.com',
        type: "guest",
        customerFirstName: 'test',
        customerLastName: 'test',
        customerPhone: '111 1111 111',
        status: 'subscribed'
    }),
);
export const mockSendUnSubscriberEvent = new SendUnSubscriberEvent(
    {} as any,
    new Subscriber({
        id: 0,
        email: 'test@test.com',
        type: "guest",
        customerFirstName: 'test',
        customerLastName: 'test',
        customerPhone: '111 1111 111',
        status: 'unsubscribed'
    }),
);

export const mockSendNewsletterEvent = new SendNewsletterEvent(
    {} as any,
    new Subscriber({
        id: 0,
        email: 'test@test.com',
        type: "guest",
        customerFirstName: 'test',
        customerLastName: 'test',
        customerPhone: '111 1111 111',
        status: 'unsubscribed'
    }),
    new Newsletter({
        id: 0,
        template_name: "Test Newsletter Template",
        subject: "The Store Newsletter",
        templateContent: "The test newsletter email content",
        status: 1,
        type: "html"
    })
);