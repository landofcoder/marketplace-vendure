import { CustomOrderProcess } from '@vendure/core';

export const OrderProcess: CustomOrderProcess<
    | 'Packed'
    | 'Handover'
    | 'Returned'
    > = {
    transitions: {
        PaymentSettled: {
            to: ["Packed"]
        },
        Packed: {
            to: ["Handover"],
        },
        Handover: {
            to: ["Shipped", "PartiallyShipped"]
        },
        Delivered: {
            to: ['Returned'],
            mergeStrategy: 'replace'
        },
        Returned: {
            to: [],
            mergeStrategy: 'replace'
        }
    },

    // The init method allows us to inject services
    // and other providers
    init(injector) {

    },

    // The logic for enforcing our validation goes here
    async onTransitionStart(fromState, toState, data) {

    },
};