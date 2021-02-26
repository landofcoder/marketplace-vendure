import {
    GlobalSettings
} from '@vendure/core';

export type ContactState = 'new' | 'sent' | 'checked' | 'error';
export type ContactGlobalSettings = GlobalSettings & {
    customFields?: {
        receivedEmailAddress: string
    }
};