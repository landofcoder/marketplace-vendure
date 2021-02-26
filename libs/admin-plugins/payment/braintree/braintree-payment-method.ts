import { RequestContext } from '@vendure/core';
import { LanguageCode } from '@vendure/common/lib/generated-types';
import { Ctx, Logger, PaymentMethodHandler } from '@vendure/core';

import { extractMetadataFromTransaction, getGateway } from './braintree-common';
import { loggerCtx } from './constants';
import {getConnection, Connection} from "typeorm";
import { Order } from '@vendure/core';
import { ListQueryBuilder } from '@vendure/core';
/**
 * The handler for Braintree payments.
 */
// var listQueryBuilder: ListQueryBuilder;
// var connection: Connection;
const totalCalculate = (code: string): any => {
    return getConnection()
    .getRepository(Order)
    .createQueryBuilder('order')
    .select('SUM(order.subTotal + order.shippingWithTax)', "total")
    .where('order.customFieldsSession like :session', {session: code})
    .andWhere('order.active = 1')
    .getRawOne()
}
export const braintreePaymentMethodHandler = new PaymentMethodHandler({
    
    code: 'braintree',
    description: [{ languageCode: LanguageCode.en, value: 'Braintree' }],
    args: {
        merchantId: { type: 'string' },
        publicKey: { type: 'string' },
        privateKey: { type: 'string' },
    },
    
    
    
    async createPayment(ctx, order, args, metadata) {
        const gateway = getGateway(args);
        try {
            const totalPayment = await totalCalculate(order.code)
            const response = await gateway.transaction.sale({
                amount: (order.total / 100).toString(10),
                orderId: order.code,
                paymentMethodNonce: metadata.nonce,
                options: {
                    submitForSettlement: true,
                },
            });
           
            if (!response.success) {
                return {
                    amount: order.total,
                    state: 'Declined' as const,
                    transactionId: response.transaction.id,
                    errorMessage: response.message,
                    metadata: extractMetadataFromTransaction(response.transaction),
                };
            }
            // console.log("EXTRACT RES", extractMetadataFromTransaction(response.transaction))
            return {
                amount: order.total,
                state: 'Settled' as const,
                transactionId: response.transaction.id,
                metadata: extractMetadataFromTransaction(response.transaction),
            };
        } catch (e) {
            Logger.error(e, loggerCtx);
            console.log("ERROR", e)
            return {
                amount: order.total,
                state: 'Error' as const,
                transactionId: '',
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
        const gateway = getGateway(args);
        const response = await gateway.transaction.refund(payment.transactionId, (total / 100).toString(10));
        if (!response.success) {
            return {
                state: 'Failed' as const,
                transactionId: response.transaction.id,
                metadata: response,
            };
        }
        return {
            state: 'Settled' as const,
            transactionId: response.transaction.id,
            metadata: response,
        };
    },
});
