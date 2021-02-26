import { LanguageCode } from '@vendure/common/lib/generated-types';
import { Logger, PaymentMethodHandler } from '@vendure/core';

/**
 * The handler for Payumoney payments.
 */
export const paypalPaymentMethodHandler = new PaymentMethodHandler({
    code: 'paypal',
    description: [{ languageCode: LanguageCode.en, value: 'Paypal' }],
    args: {
        key: { type: 'string' },
        secret: { type: 'string' },
        isProduction: { type: "boolean"}
    },
    async createPayment(ctx, order, args, metadata) {
        try {
            return {
                amount: order.total,
                state: 'Settled' as const,
                transactionId: metadata.id,
                metadata: metadata,
            };
        } catch (e) {

            return {
                amount: order.total,
                state: 'Error' as const,
                transactionId:  metadata.id,
                errorMessage: e.toString(),
                metadata: e,
            };
        }
    },

    settlePayment() {
        return {
            success: true,
        };
    },

    async createRefund(ctx, input, total, order, payment, args) {
        return {
            state: 'Settled' as const,
            transactionId: payment.transactionId,
        }
    },
});
