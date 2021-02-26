import { PluginCommonModule, VendurePlugin } from '@vendure/core';

import { shopApiExtensions } from './graphql/api-extensions';
import { payumoneyPaymentMethodHandler } from './services/payumoney-payment-method';
import { PayumoneyResolver } from './graphql/payumoney.resolver';
import {PayumoneyService} from "./services/payumoney.service";

/**
 * This plugin implements the payumoney (https://www.payumoney.com/) payment provider.
 */
@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [PayumoneyService],
    configuration: config => {
        config.paymentOptions.paymentMethodHandlers.push(payumoneyPaymentMethodHandler);
        return config;
    },
    shopApiExtensions: {
        schema: shopApiExtensions,
        resolvers: [PayumoneyResolver],
    },
})
export class PayumoneyPlugin {}
