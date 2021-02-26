import { ConfigArgValues } from '@vendure/core/dist/common/configurable-operation';

import { paypalPaymentMethodHandler } from './services/paypal-payment-method';

export type PaymentMethodArgsHash = ConfigArgValues<typeof paypalPaymentMethodHandler['args']>;
