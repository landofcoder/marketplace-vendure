// order-processing.controller.ts
import {Order, ShippingMethod, findOneInChannel, TransactionalConnection} from '@vendure/core';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ProcessOrderMessage } from './process-order-message';
import { DEFAULT_CHANNEL_CODE } from "@vendure/common/lib/shared-constants";

@Controller()
export class OrderProcessingController {

  constructor(@InjectConnection() private connection: TransactionalConnection) { }

  @MessagePattern(ProcessOrderMessage.pattern)
  async processOrder({ orderId }: ProcessOrderMessage['data']) {
    let order = await this.connection.getRepository(Order).findOne(orderId, { relations: ['channels']});
    if (order) {
      const shippingMethod = await this.shippingMethod(order);
      if(shippingMethod) {
        if(shippingMethod.code === 'bavaan-delhivery') {
          (order.customFields as any).type = 'delhivery';
          await this.connection.getRepository(Order).save(order);
        }
      }
      
    }
    return true;
  }

  async shippingMethod(order: Order) {
      let channelId;
      if(order.channels.length > 1){
          channelId = order.channels[1].id;
      } else {
          channelId = order.channels[0].id;
      }

      if (order.shippingMethodId) {
          const shippingMethodId = order.shippingMethodId;
          const shippingMethod = await findOneInChannel(this.connection, ShippingMethod, shippingMethodId, channelId, {
            relations: ['channels'],
            where: { deletedAt: null },
          });
          return shippingMethod as ShippingMethod;
      } else {
          return new ShippingMethod;
      }
  }
}