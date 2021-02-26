// process-order-message.ts
import { ID, WorkerMessage } from '@vendure/core';

export class ProcessOrderMessage extends WorkerMessage<{ orderId: ID }, boolean> {
  static readonly pattern = 'ProcessOrderInternational';
}