import { LanguageCode, PluginCommonModule, VendurePlugin} from '@vendure/core';
import path from 'path';
import { AdminUiExtension } from '@bavaan/ui-devkit/compiler';
import {FulfillmentOrderResolver} from "./graphql/admin/fulfillment-order.resolver";
import {adminApiExtensions} from "./graphql/api-extensions";
import { DelhiveryAccountService, DelhiveryApiService } from "@bavaan/vendure-delhivery-plugin";
import { DelhiveryWarehouseService } from "@bavaan/vendure-delhivery-plugin/src/services/delhivery-warehouse.service";
import { VendorService, VendorRoleService } from '@bavaan/vendure-order-vendor-plugin';
import { VendorDelhiveryApiService } from "@bavaan/vendure-order-vendor-plugin/src/serivces/delhivery-api.sevice";
import { EcomExpressApiService, EcomExpressService} from "@bavaan/vendure-ecomexpress-plugin/src/services";
import {OrderProcess} from "./order-process";

@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [
        DelhiveryAccountService,
        DelhiveryWarehouseService,
        DelhiveryApiService,
        VendorService,
        VendorRoleService,
        VendorDelhiveryApiService,
        EcomExpressApiService,
        EcomExpressService
    ],
    // entities: [],
    adminApiExtensions: {
        schema: adminApiExtensions,
        resolvers: [FulfillmentOrderResolver],
    },
    // shopApiExtensions:{
    //     schema: shopApiExtensions,
    //     resolvers: []
    // },
    configuration: config => {
        config.customFields.Fulfillment.push({
          type: 'string',
          name: 'courier',
          label: [
            { languageCode: LanguageCode.en, value: "Courier company Name" },
          ],
        });

        config.orderOptions.process = [
            ...config.orderOptions.process,
            OrderProcess,
        ];

        return config;
      }
})
export class OrderFulfillPlugin {
    static uiExtensions: AdminUiExtension = {
        extensionPath: path.join(__dirname, 'ui'),
        ngModules: [
            {
                type: 'shared' as const,
                ngModuleFileName: 'order-fulfillment-ui-extension.module.ts',
                ngModuleName: 'OrderFulfillmentUiExtensionModule',
            },
            {
                type: 'lazy' as const,
                route: '',
                ngModuleFileName: 'order-fulfillment-ui-lazy.module.ts',
                ngModuleName: 'OrderFulfillmentUiLazyModule',
            },
        ],
        translations: {
            en: path.join(__dirname, 'i18n/en.json')
        }
    };
}