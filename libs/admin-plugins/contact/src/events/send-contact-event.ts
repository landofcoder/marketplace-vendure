import {
    Ctx,
    Customer,
    VendureEvent,
    RequestContext
} from '@vendure/core';

import {Contact} from '../entities/contact.entity';
/**
 * @description
 * This event is fired when a new user registers an account, either as a stand-alone signup or after
 * placing an order.
 *
 * @docsCategory events
 * @docsPage Event Types
 */
export class SendContactEvent extends VendureEvent {
    constructor(public ctx: RequestContext, public contact: Contact, public receiveEmailAddress: string) {
        super();
    }
}
