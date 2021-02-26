import { PluginCommonModule, VendurePlugin } from '@vendure/core';

import { CODPaymentHandler } from './services/cod-payment-method';

@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [],
    configuration: config => {
        config.paymentOptions.paymentMethodHandlers.push(CODPaymentHandler);
        return config;
    }
})
export class CODPaymentPlugin {}
