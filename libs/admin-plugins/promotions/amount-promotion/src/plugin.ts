import { amountPromotion } from "./services/shipping-promotion";
import {
  PluginCommonModule,
  VendurePlugin,
  OnVendureBootstrap,
  WorkerService,
  EventBus,
  OrderStateTransitionEvent,
} from "@vendure/core";
import { ProcessOrderMessage } from "./worker/process-order-message";

@VendurePlugin({
  imports: [PluginCommonModule],
  providers: [],
  configuration: (config) => {
    config.promotionOptions.promotionActions?.push(amountPromotion);
    return config;
  },
  // workers: [OrderProcessingController],
})
export class AmountPromotionPlugin implements OnVendureBootstrap {
  constructor(
    private workerService: WorkerService,
    private eventBus: EventBus
  ) {}

  /**
   * When the server bootstraps, set up a subscription for events
   * published whenever  an Order changes state. When an Order has
   * been fulfilled, we send a message to the controller running on
   * the Worker process to let it process that order.
   */
  onVendureBootstrap() {
    this.eventBus.ofType(OrderStateTransitionEvent).subscribe((event) => {
      if (event.toState === "PaymentAuthorized") {
        this.workerService
          .send(new ProcessOrderMessage({ orderId: event.order.id }))
          .subscribe();
      }
    });
  }
}
