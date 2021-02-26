import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { LanguageCode } from '@vendure/common/lib/generated-types';
import { Contact } from './entities/contact.entity';
import { adminApiExtensions, shopApiExtensions } from './graphql/api-extensions';
import { ContactAdminResolver } from './graphql/contact-admin.resolver';
import { ContactEntityResolver } from './graphql/contact-entity.resolver';
import { ContactShopResolver } from './graphql/contact-shop.resolver';
import path from 'path';
import { AdminUiExtension } from '@bavaan/ui-devkit/compiler';

@VendurePlugin({
    imports: [PluginCommonModule],
    entities: [Contact],
    adminApiExtensions: {
        schema: adminApiExtensions,
        resolvers: [ContactAdminResolver, ContactEntityResolver],
    },
    shopApiExtensions: {
        schema: shopApiExtensions,
        resolvers: [ContactShopResolver, ContactEntityResolver],
    },
    configuration: config => {
        config.customFields.GlobalSettings.push({
            name: 'receivedEmailAddress',
            label: [{ languageCode: LanguageCode.en, value: 'Recieved Email Address' }],
            public: true,
            defaultValue: "",
            type: 'string'
        });
        config.customFields.GlobalSettings.push({
            name: 'enableCaptcha',
            label: [{ languageCode: LanguageCode.en, value: 'Enabled Captcha' }],
            public: true,
            defaultValue: false,
            type: 'boolean',
        });
        config.customFields.GlobalSettings.push({
            name: 'recaptchaSiteKey',
            label: [{ languageCode: LanguageCode.en, value: 'Google Recaptcha Site Key' }],
            public: true,
            defaultValue: "6LcfFvcUAAAAAPBB4c1YNRp4w3obSSb8SMTW4-XS",
            type: 'string'
        });
        config.customFields.GlobalSettings.push({
            name: 'recaptchaSecretKey',
            label: [{ languageCode: LanguageCode.en, value: 'Google Recaptcha Secret Key' }],
            public: true,
            defaultValue: "6LcfFvcUAAAAAL-HsPYiLq2F_kEyXGO4Y9Y98xmH",
            type: 'string'
        });
        config.customFields.GlobalSettings.push({
            name: 'enablePhone',
            label: [{ languageCode: LanguageCode.en, value: 'Enabled Phone Number' }],
            public: true,
            defaultValue: false,
            type: 'boolean',
        });
        return config;
    }
})
export class ContactPlugin {
    static uiExtensions: AdminUiExtension = {
        extensionPath: path.join(__dirname, 'ui'),
        ngModules: [
            {
                type: 'shared' as const,
                ngModuleFileName: 'contact-ui-extension.module.ts',
                ngModuleName: 'ContactUiExtensionModule',
            },
            {
                type: 'lazy' as const,
                route: '',
                ngModuleFileName: 'contact-ui-lazy.module.ts',
                ngModuleName: 'ContactUiLazyModule',
            },
        ],
    };
}
