import { 
    PluginCommonModule, 
    VendurePlugin
} from '@vendure/core';
import { SendNewsletterService } from './services/send-newsletters.service';
import { LanguageCode } from '@vendure/common/lib/generated-types';
import { Subscriber } from './entities/subscriber.entity';
import { Newsletter } from './entities/newsletter.entity';
import { NewsletterQueue } from './entities/newsletter_queue.entity';
import { NewsletterQueueLink } from './entities/newsletter_queue_link.entity';
import { adminApiExtensions, shopApiExtensions } from './graphql/api-extensions';
import { SubscriberAdminResolver } from './graphql/subscriber-admin.resolver';
import { SubscriberEntityResolver } from './graphql/subscriber-entity.resolver';
import { SubscriberShopResolver } from './graphql/subscriber-shop.resolver';
import { NewsletterAdminResolver } from './graphql/newsletter-admin.resolver';
import { NewsletterEntityResolver } from './graphql/newsletter-entity.resolver';
import { NewsletterQueueEntityResolver } from './graphql/newsletter_queue-entity.resolver';
import { NewsletterQueueLinkEntityResolver } from './graphql/newsletter_queue_link-entity.resolver';
import path from 'path';
import { AdminUiExtension } from '@bavaan/ui-devkit/compiler';

@VendurePlugin({
    imports: [PluginCommonModule],
    entities: [Subscriber, Newsletter, NewsletterQueue, NewsletterQueueLink],
    providers: [SendNewsletterService],
    adminApiExtensions: {
        schema: adminApiExtensions,
        resolvers: [
            SubscriberAdminResolver, 
            SubscriberEntityResolver, 
            NewsletterAdminResolver, 
            NewsletterEntityResolver, 
            NewsletterQueueEntityResolver, 
            NewsletterQueueLinkEntityResolver
        ],
    },
    shopApiExtensions: {
        schema: shopApiExtensions,
        resolvers: [SubscriberShopResolver, SubscriberEntityResolver],
    },
    configuration: config => {
        config.customFields.GlobalSettings.push({
            name: 'enableNewsletterFirstName',
            label: [{ languageCode: LanguageCode.en, value: 'Enabled Newsletter First Name' }],
            public: true,
            defaultValue: false,
            type: 'boolean',
        });
        config.customFields.GlobalSettings.push({
            name: 'enableNewsletterLastName',
            label: [{ languageCode: LanguageCode.en, value: 'Enabled Newsletter Last Name' }],
            public: true,
            defaultValue: false,
            type: 'boolean',
        });
        config.customFields.GlobalSettings.push({
            name: 'enableNewsletterPhone',
            label: [{ languageCode: LanguageCode.en, value: 'Enabled Newsletter Phone Number' }],
            public: true,
            defaultValue: false,
            type: 'boolean',
        });
        config.customFields.GlobalSettings.push({
            name: 'enableNewsletterCaptcha',
            label: [{ languageCode: LanguageCode.en, value: 'Enabled Newsletter Captcha' }],
            public: true,
            defaultValue: false,
            type: 'boolean',
        });
        return config;
    }
})

export class NewsletterPlugin {
    static uiExtensions: AdminUiExtension = {
        extensionPath: path.join(__dirname, 'ui'),
        ngModules: [
            {
                type: 'shared' as const,
                ngModuleFileName: 'newsletter-ui-extension.module.ts',
                ngModuleName: 'NewsletterUiExtensionModule',
            },
            {
                type: 'lazy' as const,
                route: '',
                ngModuleFileName: 'newsletter-ui-lazy.module.ts',
                ngModuleName: 'NewsletterUiLazyModule',
            },
        ],
    };
}
