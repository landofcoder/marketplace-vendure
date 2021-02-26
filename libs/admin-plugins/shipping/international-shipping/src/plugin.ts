import { PluginCommonModule, VendurePlugin, OnVendureBootstrap, WorkerService, EventBus, OrderStateTransitionEvent } from '@vendure/core';
import { InternationalShippingEligibilityChecker, InternationalShippingCalculator } from './services/international-shipping';
import { ProcessOrderMessage } from './worker/process-order-message';
import { OrderProcessingController } from './worker/process-order.controler';
import { InitializerService } from './services/initializer.service';
import {ShippingCountry} from "./entities/shipping-country.entity";
import {ShippingCountryService} from "./services/shipping-country.service";
import {adminApiExtensions} from "./graphql";
import {ShippingCountryResolve} from "./graphql/admin-api/shipping-country.resolve";
import {AdminUiExtension} from "@bavaan/ui-devkit/compiler";
import path from "path";

/**
 * This plugin implements the International Shipping Method.
 */
@VendurePlugin({
    imports: [PluginCommonModule],
    entities: [ShippingCountry],
    providers: [InitializerService, ShippingCountryService],
    adminApiExtensions: {
        schema: adminApiExtensions,
        resolvers: [ShippingCountryResolve],
    },
    configuration: config => {
        config.shippingOptions.shippingEligibilityCheckers?.push(InternationalShippingEligibilityChecker);
        config.shippingOptions.shippingCalculators?.push(InternationalShippingCalculator);
        return config;
    },
    workers: [OrderProcessingController],
})
export class InternationalShippingPlugin implements OnVendureBootstrap {
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
                ngModuleFileName: 'international-ui-extension.module.ts',
                ngModuleName: 'InternationalUiExtensionModule',
            },
            {
                type: 'lazy' as const,
                route: '',
                ngModuleFileName: 'international-ui-lazy.module.ts',
                ngModuleName: 'InternationalUiLazyModule',
            },
        ],
        translations: {
            en: path.join(__dirname, 'i18n/en.json')
        }
    };
}
