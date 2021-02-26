import { BraintreeService } from './braintree.service';
import { Args, Query, Resolver } from "@nestjs/graphql";
import { InjectConnection } from "@nestjs/typeorm";
import {
  Ctx,
  ID,
  InternalServerError,
  Logger,
  OrderService,
  PaymentMethod,
  RequestContext,
  TransactionalConnection,
} from "@vendure/core";
import { Connection } from "typeorm";

import { getGateway } from "./braintree-common";
import { braintreePaymentMethodHandler } from "./braintree-payment-method";
import { loggerCtx } from "./constants";
import { PaymentMethodArgsHash } from "./types";

@Resolver()
export class BraintreeResolver {
  constructor(
    private connection: TransactionalConnection,
    private orderService: OrderService,
    private braintreeService: BraintreeService
  ) {}

  @Query()
  async generateBraintreeClientToken(
    @Ctx() ctx: RequestContext
  ) {
    const orders = await this.braintreeService.findAll(ctx);
    try {
      const args = await this.getPaymentMethodArgs();
      const gateway = getGateway(args);
      const result = await gateway.clientToken.generate({});
      return result.clientToken
    }
    catch(e) {
      Logger.error(e)
    }
    // if (orders && orders.length > 0 && orders[0].customer) {
    //   const customerId = orders[0].customer.id.toString();
    //   const args = await this.getPaymentMethodArgs();
    //   const gateway = getGateway(args);
    //   // gateway.paymentMethod.create({
    //   //   customerId: "1",
    //   //   paymentMethodNonce: 'COD'
    //   // }).then(result => console.log(result))
    //   try {
    //     const result = await gateway.clientToken.generate({});
    //     return result.clientToken
    //   }
    //   catch(e) {
    //     Logger.error(e)
    //   }
    // }
    // else {
    //   throw new InternalServerError(
    //     `[${loggerCtx}] Could not find a Customer for the given Order`
    //   );
    // }
  }

  private async getPaymentMethodArgs(): Promise<PaymentMethodArgsHash> {
    const method = await this.connection.getRepository(PaymentMethod).findOne({
      where: {
        code: braintreePaymentMethodHandler.code,
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
