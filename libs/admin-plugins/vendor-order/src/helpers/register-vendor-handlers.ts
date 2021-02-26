import {VendorRegistrationEvent} from '../events/vendor-register-event';
import {mockSendContactEvent} from './mock-events';
import { EmailEventListener } from '@vendure/email-plugin';
import {NativeAuthenticationMethod} from "@vendure/core";

export const sendEmaiVendorlRegisterHandler = new EmailEventListener('vendor-register')
    .on(VendorRegistrationEvent)
    .filter(event => !!event.user.getNativeAuthenticationMethod().identifier)
    .filter(event => {
        const nativeAuthMethod = event.user.authenticationMethods.find(
            m => m instanceof NativeAuthenticationMethod,
        ) as NativeAuthenticationMethod | undefined;
        return (nativeAuthMethod && !!nativeAuthMethod.identifier) || false;
    })
    .setRecipient(event => event.user.identifier)
    .setFrom(`{{ fromAddress }}`)
    .setSubject(`Please verify your email address`)
    .setTemplateVars(event => ({
        verificationToken: event.user.getNativeAuthenticationMethod().verificationToken,
        verified: event.user.verified
    }))
    .setMockEvent(mockSendContactEvent);