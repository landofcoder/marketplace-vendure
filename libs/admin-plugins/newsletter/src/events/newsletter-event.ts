import {
    Ctx,
    VendureEvent,
    RequestContext,
} from '@vendure/core';
import {Subscriber} from '../entities/subscriber.entity';
import {Newsletter} from '../entities/newsletter.entity';
/**
 * @description
 * This event is fired when a new user registers an account, either as a stand-alone signup or after
 * placing an order.
 *
 * @docsCategory events
 * @docsPage Event Types
 */
export class SendSubscriberEvent extends VendureEvent {
    constructor(public ctx: RequestContext, public subscriber: Subscriber) {
        super();
    }
}
export class SendUnSubscriberEvent extends VendureEvent {
    constructor(public ctx: RequestContext, public subscriber: Subscriber) {
        super();
    }
}
export class SendNewsletterEvent extends VendureEvent {
    constructor(public ctx: RequestContext, public subscriber: Subscriber, public newsletter: Newsletter) {
        super();
    }
}