// order-processing.controller.ts
import { Order, ShippingMethod, findOneInChannel } from '@vendure/core';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ProcessOrderMessage } from './process-order-message';

@Controller()
export class OrderProcessingController {

  constructor(@InjectConnection() private connection: Connection) { }

  @MessagePattern(ProcessOrderMessage.pattern)
  async processOrder({ orderId }: ProcessOrderMessage['data']) {
    let order = await this.connection.getRepository(Order).findOne(orderId);
    if (order) {
      const shippingMethod = await this.shippingMethod(order);
      if(shippingMethod) {
        if(shippingMethod.code === 'international-shipping') {
          (order.customFields as any).type = 'international';
          await this.connection.getRepository(Order).save(order);
        }
      }
      
    }
    return true;
  }

  async shippingMethod(order: Order) {
      const channelId = 1;
      if (order.shippingMethodId) {
          const shippingMethodId = order.shippingMethodId;
          const shippingMethod = await this.connection.getRepository(ShippingMethod).findOne(shippingMethodId,{
              relations: ['channels'],
              where: { deletedAt: null },
          });
          return shippingMethod as ShippingMethod;
      } else {
          return new ShippingMethod;
      }
  }
}