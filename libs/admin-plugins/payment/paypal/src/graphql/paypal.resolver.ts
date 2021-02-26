import { Args, Query, Mutation , Resolver } from '@nestjs/graphql';
import {
    Ctx,
    ID,
    InternalServerError,
    Logger,
    OrderService,
    PaymentMethod,
    RequestContext,
    TransactionalConnection,
} from '@vendure/core';
import { PaymentMethodArgsHash } from '../types';
import request, { Response } from 'request';
import {PaypalService} from "../services/paypal.service";
import {paypalPaymentMethodHandler} from "../services/paypal-payment-method";
import {loggerCtx} from "../constants";
import {
    MutationCreatePaymentForPaypalMethodArgs,
    MutationExecutePaymentForPaypalMethodArgs
} from "../generated-shop-types";


@Resolver()
export class PaypalResolver {

    constructor(private connection: TransactionalConnection, private orderService: OrderService, private paypalService: PaypalService) {}

    @Query()
    async getPaypalEnv(@Ctx() ctx: RequestContext){
        let paypalConfig = await this.getPaymentMethodArgs();
        return (paypalConfig.isProduction && paypalConfig.isProduction.toString() == "true") ? 'production' : 'sandbox';
    }

    @Mutation()
    async createPaymentForPaypalMethod(@Ctx() ctx: RequestContext, @Args() args: MutationCreatePaymentForPaypalMethodArgs) {

        try {

        let paypalConfig = await this.getPaymentMethodArgs();
        const orders = await this.paypalService.orderSession(ctx);

        if(orders.length) {
            let paypalAPI = (paypalConfig.isProduction && paypalConfig.isProduction.toString() == "true")  ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';
            let amount = orders.map((o: any) => o.total).reduce((a: any, c: any) => a + c) / 100;
            const res = await this.promisifiedRequest(paypalAPI + '/v1/payments/payment', {
                    auth:
                        {
                            user: paypalConfig.key,
                            pass: paypalConfig.secret
                        },
                    body:
                        {
                            intent: 'sale',
                            payer:
                                {
                                    payment_method: 'paypal'
                                },
                            transactions: [
                                {
                                    amount:
                                        {
                                            total: amount,
                                            currency: 'USD'
                                        }
                                }],
                            redirect_urls:
                                {
                                    return_url: args.returnURL,
                                    cancel_url: args.cancelURL
                                }
                        },
                    json: true
                }
            );
            // 3. Return the payment ID to the client
            return {
                id: res?.body?.id || null,
            };

        } else {
            throw new Error('Cannot find order in session')
        }

        } catch(err) {
            throw new Error(err);
        }

    }

    @Mutation()
    async executePaymentForPaypalMethod(@Ctx() ctx: RequestContext, @Args() args: MutationExecutePaymentForPaypalMethodArgs) {

        try {

        let paypalConfig = await this.getPaymentMethodArgs();
        const orders = await this.paypalService.orderSession(ctx);
        if(orders.length) {
            let paypalAPI = (paypalConfig.isProduction && paypalConfig.isProduction.toString() == "true")  ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';
            let amount = orders.map((o: any) => o.total).reduce((a: any, c: any) => a + c) / 100;

            const res = await this.promisifiedRequest(paypalAPI + '/v1/payments/payment/' + args.paymentID + '/execute',
                {
                    auth:
                        {
                            user: paypalConfig.key,
                            pass: paypalConfig.secret
                        },
                    body:
                        {
                            payer_id: args.payerID,
                            transactions: [
                                {
                                    amount:
                                        {
                                            total: amount,
                                            currency: 'USD'
                                        }
                                }]
                        },
                    json: true
                }
            )
            if(res){
                return {
                    status: "success",
                    data: res.body
                }
            }
        }

        } catch(err) {
            throw new Error(err);
        }

    }
    private promisifiedRequest (URL: string, options: any) : any{
        return new Promise((resolve,reject) => {
            request.post(URL, options, (error:any, response: Response, body:any) => {
                if (response) {
                    return resolve(response);
                }
                if (error) {
                    return reject(error);
                }
            });
        });
    };

    private async getPaymentMethodArgs(): Promise<PaymentMethodArgsHash> {
        const method = await this.connection.getRepository(PaymentMethod).findOne({
            where: {
                code: paypalPaymentMethodHandler.code,
            },
        });
        if (!method) {
            throw new InternalServerError(
                `[${loggerCtx}] Could not find Braintree PaymentMethod`
            );
        }
        return method.configArgs.reduce((hash, arg) => {
            return {
                ...hash,
                [arg.name]: arg.value,
            };
        }, {} as PaymentMethodArgsHash);
    }

}
