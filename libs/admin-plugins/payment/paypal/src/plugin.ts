import { PluginCommonModule, VendurePlugin } from '@vendure/core';

import { shopApiExtensions } from './graphql/api-extensions';
import { paypalPaymentMethodHandler } from './services/paypal-payment-method';
import { PaypalResolver } from './graphql/paypal.resolver';
import {PaypalService} from "./services/paypal.service";

/**
 * This plugin implements the payumoney (https://www.payumoney.com/) payment provider.
 */
@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [PaypalService],
    configuration: config => {
        config.paymentOptions.paymentMethodHandlers.push(paypalPaymentMethodHandler);
        return config;
    },
    shopApiExtensions: {
        schema: shopApiExtensions,
        resolvers: [PaypalResolver],
    },
})
export class PaypalPlugin {}
