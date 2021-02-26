import {
    EventBus,
    OnVendureBootstrap,
    OrderStateTransitionEvent,
    PluginCommonModule,
    VendurePlugin, WorkerService,
} from '@vendure/core';
import path from 'path';
import { AdminUiExtension } from '@bavaan/ui-devkit/compiler';
import { adminApiExtensions} from './graphql';
import { DelhiveryShippingEligibilityChecker, DelhiveryShippingCalculator } from './services/delhivery-shipping';
import { ProcessOrderMessage } from './worker/process-order-message';
import { OrderProcessingController } from './worker/process-order.controler';
import { DelhiveryAccount } from "./entities/delhivery-account.entity";
import { DelhiveryWarehouse } from "./entities/delhivery-warehouse.entity";
import { AdminDelhiveryAccount } from "./graphql/admin-api/admin-delhivery-account";
import { DelhiveryAccountService } from "./services";
import { DelhiveryWarehouseService } from "./services/delhivery-warehouse.service";
// import { InitializerService } from "./services/initializer.service";
import { DelhiveryApiService } from "./services";
import { VendorService, VendorOrderChannelService, VendorRoleService } from "@bavaan/vendure-order-vendor-plugin";
import { DelhiveryWarehouseAdminResolver } from "./graphql/admin-api/delhivery-warehouse.resolver";
import { VendorDelhiveryApiService } from "@bavaan/vendure-order-vendor-plugin/src/serivces/delhivery-api.sevice";
import { DelhiveryWarehouseInitDefaultService } from "./services/delhivery-warehouse-init-default.service";


@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [
        DelhiveryAccountService,
        DelhiveryWarehouseService,
        // InitializerService,
        DelhiveryApiService,
        VendorService,
        VendorOrderChannelService,
        VendorRoleService,
        VendorDelhiveryApiService,
        DelhiveryWarehouseInitDefaultService
    ],
    entities: [DelhiveryAccount, DelhiveryWarehouse],
    adminApiExtensions: {
        schema: adminApiExtensions,
        resolvers: [AdminDelhiveryAccount, DelhiveryWarehouseAdminResolver],
    },
    configuration: config => {
        //config.shippingOptions.shippingEligibilityCheckers?.push(DelhiveryShippingEligibilityChecker);
        //config.shippingOptions.shippingCalculators?.push(DelhiveryShippingCalculator);
        return config;
    },
    //workers: [OrderProcessingController],
})
export class DelhiveryPlugin {
    constructor(
        private workerService: WorkerService,
        private eventBus: EventBus,
    ) {}

    static uiExtensions: AdminUiExtension = {
        extensionPath: path.join(__dirname, 'ui'),
        ngModules: [
            {
                type: 'shared' as const,
                ngModuleFileName: 'delhivery-ui-extension.module.ts',
                ngModuleName: 'DelhiveryUiExtensionModule',
            },
            {
                type: 'lazy' as const,
                route: '',
                ngModuleFileName: 'delhivery-ui-lazy.module.ts',
                ngModuleName: 'DelhiveryUiLazyModule',
            },
        ],
        translations: {
            en: path.join(__dirname, 'i18n/en.json')
        }
    };

    /**
     * When the server bootstraps, set up a subscription for events
     * published whenever  an Order changes state. When an Order has
     * been fulfilled, we send a message to the controller running on
     * the Worker process to let it process that order.
     */
    // onVendureBootstrap() {
    //     this.eventBus.ofType(OrderStateTransitionEvent).subscribe(event => {
    //         if (event.toState === 'PaymentAuthorized') {
    //             this.workerService.send(new ProcessOrderMessage({ orderId: event.order.id })).subscribe();
    //         }
    //     });
    // }
}
