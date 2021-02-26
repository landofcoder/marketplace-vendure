import {VendorRegistrationEvent } from '../events/vendor-register-event';
import {NativeAuthenticationMethod, User} from '@vendure/core';

export const mockSendContactEvent = new VendorRegistrationEvent(
    {} as any,
    new User({
            verified: false,
            authenticationMethods: [
                    new NativeAuthenticationMethod({
                            verificationToken: 'MjAxOC0xMS0xM1QxNToxNToxNC42ODda_US2U6UK1WZC7NDAX',
                    }),
            ],
            identifier: 'test@test.com',
    }),
);