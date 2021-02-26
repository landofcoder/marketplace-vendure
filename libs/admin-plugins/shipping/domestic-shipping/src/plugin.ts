import { PluginCommonModule, VendurePlugin, OnVendureBootstrap, WorkerService, EventBus, OrderStateTransitionEvent } from '@vendure/core';
import { DomesticShippingEligibilityChecker, DomesticShippingCalculator } from './services/domestic-shipping';
import { ProcessOrderMessage } from './worker/process-order-message';
import { OrderProcessingController } from './worker/process-order.controler';
import {InitializerService} from "./services/initializer.service";
import { ProductCustomFields } from "./customFields/Product";
import { Pincode } from './entities/pincode.entity';
import { adminApiExtensions, shopApiExtensions } from './graphql/api-extensions';
import { PincodeAdminResolver } from './graphql/pincode-admin.resolver';
import { PincodeShopResolver } from './graphql/pincode-shop.resolver';
import path from 'path';
import { AdminUiExtension } from '@bavaan/ui-devkit/compiler';
/**
 * This plugin implements the Dosmetic Shipping Method.
 */
@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [InitializerService],
    configuration: config => {
        config.shippingOptions.shippingEligibilityCheckers?.push(DomesticShippingEligibilityChecker);
        config.shippingOptions.shippingCalculators?.push(DomesticShippingCalculator);
        config.customFields.ProductVariant.push(...ProductCustomFields);
        return config;
    },
    workers: [OrderProcessingController],
    entities: [Pincode],
    adminApiExtensions: {
        schema: adminApiExtensions,
        resolvers: [PincodeAdminResolver],
    },
    shopApiExtensions: {
        schema: shopApiExtensions,
        resolvers: [PincodeShopResolver],
    }
})
export class DomesticShippingPlugin implements OnVendureBootstrap {
    constructor(
        private workerService: WorkerService,
        private eventBus: EventBus,
    ) {}

     /**
     * When the server bootstraps, set up a subscription for events 
     * published whenever  an Order changes state. When an Order has 
     * been fulfilled, we send a message to the controller running on
     * the Worker process to let it process that order.
     */
    onVendureBootstrap() {
        this.eventBus.ofType(OrderStateTransitionEvent).subscribe(event => {
            if (event.toState === 'PaymentAuthorized') {
                this.workerService.send(new ProcessOrderMessage({ orderId: event.order.id })).subscribe();
            }
        });
    }
    static uiExtensions: AdminUiExtension = {
        extensionPath: path.join(__dirname, 'ui'),
        ngModules: [
            {
                type: 'shared' as const,
                ngModuleFileName: 'pincode-ui-extension.module.ts',
                ngModuleName: 'PincodeUiExtensionModule',
            },
            {
                type: 'lazy' as const,
                route: '',
                ngModuleFileName: 'pincode-ui-lazy.module.ts',
                ngModuleName: 'PincodeUiLazyModule',
            },
        ],
    };
}
