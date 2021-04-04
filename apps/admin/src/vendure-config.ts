import path from 'path';
import fs from 'fs';
import {
    DefaultSearchPlugin,
    examplePaymentHandler,
    InMemorySessionCacheStrategy,
    NativeAuthenticationStrategy,
    VendureConfig,
} from '@vendure/core';
import {
    DEFAULT_AUTH_TOKEN_HEADER_KEY,
    SUPER_ADMIN_USER_IDENTIFIER,
    SUPER_ADMIN_USER_PASSWORD,
} from '@vendure/common/lib/shared-constants';
import { defaultEmailHandlers, EmailPlugin } from '@vendure/email-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import { ReviewsPlugin } from '@bavaan/vendure-reviews-plugin';
import { InMemoryJobQueueStrategy } from '@vendure/core/dist/job-queue/in-memory-job-queue-strategy';
import { ContactPlugin, sendContactHandler } from '@bavaan/vendure-contact-plugin';
import {
    NewsletterPlugin,
    sendSubscriberHandler,
    sendUnSubscriberHandler,
    sendNewsletterHandler,
} from '@bavaan/vendure-newsletter-plugin';
import { TierPricePlugin } from '@bavaan/vendure-tier-price-plugin';
import { BraintreePlugin } from '@bavaan/vendure-braintree-payment-plugin';
import { PayumoneyPlugin } from '@landofcoder/vendure-payumoney-payment-plugin';
import { DomesticShippingPlugin } from '@bavaan/vendure-domestic-shipping-plugin';
import { InternationalShippingPlugin } from '@bavaan/vendure-international-shipping-plugin';
import { ProductManagement } from '@bavaan/vendure-product-management';
import { OrderVendorPlugin, sendEmaiVendorlRegisterHandler } from '@bavaan/vendure-order-vendor-plugin';
import { AmountPromotionPlugin } from '@bavaan/vendure-amount-promotion-plugin';
import { ShippingPromotionPlugin } from '@bavaan/vendure-shipping-promotion-plugin';
import { DelhiveryPlugin } from '@bavaan/vendure-delhivery-plugin';
import { OrderFulfillPlugin } from '@bavaan/vendure-order-fullfill-plugin';
import { ProductRecentlyViewedPlugin } from '@bavaan/vendure-product-recently-viewed-plugin';
import { DailyOrdersPlugin } from '@bavaan/vendure-daily-orders-plugin';
import { PaypalPlugin } from '@bavaan/vendure-paypal-payment-plugin';
import { CODPaymentPlugin } from '@bavaan/vendure-cod-payment-plugin';
import { ProductRecommendationsPlugin } from '@bavaan/vendure-product-recommendations';
import { EcomExpressPlugin } from '@bavaan/vendure-ecomexpress-plugin';
import { customAdminUi } from './compile-admin-ui';

const IS_PROD = process.env.IS_PROD === 'true';
const STORE_DOMAIN = process.env.STOREFRONT_DOMAIN || 'http://0.0.0.0:9000';

defaultEmailHandlers.push(sendContactHandler);
defaultEmailHandlers.push(sendSubscriberHandler);
defaultEmailHandlers.push(sendUnSubscriberHandler);
defaultEmailHandlers.push(sendNewsletterHandler);
defaultEmailHandlers.push(sendEmaiVendorlRegisterHandler);

export const config: VendureConfig = {
    apiOptions: {
        port: 3000,
        hostname: '0.0.0.0', // process.env.HOSTNAME || "localhost",
        adminApiPath: process.env.ADMIN_API_PATH || 'admin-api',
        shopApiPath: process.env.SHOP_API_PATH || 'shop-api',
        adminApiPlayground: {
            settings: { 'request.credentials': 'include' },
        },
        adminApiDebug: true,
        shopApiPlayground: {
            settings: { 'request.credentials': 'include' },
        },
        shopApiDebug: true,
    },
    authOptions: {
        disableAuth: false,
        tokenMethod: 'cookie',
        sessionSecret: 'jysakgzhw6',
        cookieOptions: {
            secret: Math.random().toString(36).substr(3),
            httpOnly: true,
        },
        authTokenHeaderKey: DEFAULT_AUTH_TOKEN_HEADER_KEY,
        sessionDuration: '1y',
        sessionCacheStrategy: new InMemorySessionCacheStrategy(),
        sessionCacheTTL: 300,
        requireVerification: true,
        verificationTokenDuration: '7d',
        superadminCredentials: {
            identifier: SUPER_ADMIN_USER_IDENTIFIER,
            password: SUPER_ADMIN_USER_PASSWORD,
        },
        shopAuthenticationStrategy: [new NativeAuthenticationStrategy()],
        adminAuthenticationStrategy: [new NativeAuthenticationStrategy()],
        customPermissions: [],
    },
    jobQueueOptions: {
        jobQueueStrategy: new InMemoryJobQueueStrategy(),
        pollInterval: 200,
    },
    /* jobQueueOptions: {
        jobQueueStrategy: new JobQueueStrategy(),
        pollInterval: 200,
    }, */
    // dbConnectionOptions: {
    //     type: 'sqlite',
    //     synchronize: false,
    //     logging: false,
    //     database: path.join(__dirname, '../vendure.sqlite'),
    //     migrations: [getMigrationsPath()],
    // },
    /*
    dbConnectionOptions: {
        type: 'postgres',
        synchronize: true, // turn this off for production
        logging: false,
        database: 'postgres',
        host: 'postgres',
        port: 5432,
        username: 'admin',
        password: 'secret',
        migrations: [getMigrationsPath()],
    },*/
    dbConnectionOptions: {
        type: 'mysql',
        synchronize: false,
        host: '0.0.0.0',
        port: 3306,
        username: 'root',
        password: '12345678',
        database: 'vendure_server',
        logging: false,
        migrations: [getMigrationsPath()],
    },
    paymentOptions: {
        paymentMethodHandlers: [examplePaymentHandler],
    },
    customFields: {},
    plugins: [
        AssetServerPlugin.init({
            route: 'assets',
            assetUploadDir: path.join(__dirname, '../static/assets'),
            port: 3001,
        }),
        DefaultSearchPlugin,
        EmailPlugin.init({
            handlers: defaultEmailHandlers,
            templatePath: path.join(__dirname, '../static/email/templates'),
            transport: {
                type: 'smtp',
                host: (process.env.SMTP_HOST as any) || 'smtp.mailtrap.io',
                port: (process.env.SMTP_PORT as any) || '2525',
                auth: {
                    user: (process.env.SMTP_USER as any) || '95f6c65a0ab2df',
                    pass: (process.env.SMTP_PASS as any) || '3228af451d81c4',
                },
            },
            globalTemplateVars: {
                // The following variables will change depending on your storefront implementation
                fromAddress: process.env.FROM_ADDRESS || '"Vendure-Marketplace" <noreply@storeofapp.com>',
                supportAddress: process.env.SUPPORT_EMAIL || 'cs@storeofapp.com',
                neworderAddress: process.env.INFO_EMAIL || 'info@storeofapp.com',
                adminAddress: process.env.ADMIN_EMAIL || 'admin@storeofapp.com',
                storeName: process.env.STORE_NAME || 'Vendure-Marketplace',
                unsubsribeUrl: STORE_DOMAIN + '/unsubscribe',
                verifyEmailAddressUrl: STORE_DOMAIN + '/customer/verify',
                passwordResetUrl: STORE_DOMAIN + '/customer/reset-password',
                changeEmailAddressUrl: STORE_DOMAIN + '/customer/change-email-address',
                verifyVendorEmailUrl: STORE_DOMAIN + '/seller/verify',
            },
        }),
        AdminUiPlugin.init({
            hostname: '0.0.0.0', //process.env.HOSTNAME || "localhost",
            port: (process.env.ADMIN_UI_PORT as any) || 3002,
            app: customAdminUi({ recompile: !IS_PROD, devMode: !IS_PROD }),
        }),
        ReviewsPlugin,
        ContactPlugin,
        NewsletterPlugin,
        ProductRecommendationsPlugin,
        TierPricePlugin,
        BraintreePlugin,
        PayumoneyPlugin,
        DomesticShippingPlugin,
        InternationalShippingPlugin,
        AmountPromotionPlugin,
        ShippingPromotionPlugin,
        ProductManagement.init(STORE_DOMAIN),
        OrderVendorPlugin,
        DailyOrdersPlugin,
        DelhiveryPlugin,
        OrderFulfillPlugin,
        ProductRecentlyViewedPlugin,
        PaypalPlugin,
        CODPaymentPlugin,
        EcomExpressPlugin,
    ],
};

function getMigrationsPath() {
    const devMigrationsPath = path.join(__dirname, '../migrations');
    const distMigrationsPath = path.join(__dirname, 'migrations');

    return fs.existsSync(distMigrationsPath)
        ? path.join(distMigrationsPath, '*.js')
        : path.join(devMigrationsPath, '*.ts');
}
