import { Args, Query, Resolver } from '@nestjs/graphql';
import { InjectConnection } from '@nestjs/typeorm';
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
import { Connection } from 'typeorm';
import { PaymentMethodArgsHash } from '../types';
import CryptoJS from 'crypto-js';
import {PayumoneyService} from "../services/payumoney.service";
import {payumoneyPaymentMethodHandler} from "../services/payumoney-payment-method";
import {loggerCtx} from "../constants";


@Resolver()
export class PayumoneyResolver {
    constructor(private connection: TransactionalConnection, private orderService: OrderService, private payumoneyService: PayumoneyService) {}

    @Query()
    async generatePayumoneyMethod(@Ctx() ctx: RequestContext) {
        const orders = await this.payumoneyService.findAll(ctx);
        if(orders.length) {
            let amount = orders.map((o: any) => o.total).reduce((a: any, c: any) => a + c) / 100;

            let payumoneyConfig = await this.getPaymentMethodArgs();
            let txnid = this.genTxnid();
            // generate has-key
            // hashSequence = key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||salt.
            //     $hash = hash("sha512", $hashSequence);
            let hashSequence = `${payumoneyConfig?.merchantKey}|${txnid}|${amount}|${"productinfo"}|${orders[0].customer.firstName}|${orders[0].customer.emailAddress}|||||||||||${payumoneyConfig.merchantSalt}`;
            let hash = CryptoJS.SHA512(hashSequence).toString();

            let submitFormPayment = {
                key: payumoneyConfig.merchantKey,
                isProduction: payumoneyConfig.isProduction,
                hash: hash,
                txnid: txnid,
                amount: amount,
                firstname: orders[0].customer.firstName,
                email: orders[0].customer.emailAddress,
                phone: orders[0].customer.phoneNumber,
                productinfo: "productinfo",
            }

            return submitFormPayment
        }else{
            throw Error("No order in session")
        }
    }

    private async getPaymentMethodArgs(): Promise<PaymentMethodArgsHash> {
        const method = await this.connection.getRepository(PaymentMethod).findOne({
            where: {
                code: payumoneyPaymentMethodHandler.code,
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

    genTxnid(){
        const d = new Date()
        let gentxnid = CryptoJS.SHA256(Math.floor((Math.random()*10)+1).toString()+d.getTime().toString())
        return 'v'+gentxnid.toString().substr(0,20)
    }

}
