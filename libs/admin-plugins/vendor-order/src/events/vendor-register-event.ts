import {
    VendureEvent,
    RequestContext,
    User
} from '@vendure/core';


export class VendorRegistrationEvent extends VendureEvent {
    constructor(public ctx: RequestContext, public user: User) {
        super();
    }
}