import {LanguageCode, PluginCommonModule, ProductService, VendurePlugin, EventBus, ConfigService} from '@vendure/core';
import path from 'path';
import fs from 'fs-extra';
import { AdminUiExtension } from '@bavaan/ui-devkit/compiler';
import { shopApiExtensions , adminApiExtensions} from './graphql/api-extensions';
import { SearchIndexService } from '@vendure/core/dist/plugin/default-search-plugin/indexer/search-index.service';
import {
    AdminVendorProductResolver,
    ShopProductEntityResolver,
    ShopOrderResolver,
    ShopSearchProductResolver
} from "./graphql";
import {VendorOrderChannelService, ProductSearchService, VendorFacetService} from "./serivces";
import {IdCodecService} from "@vendure/core/dist/api/common/id-codec.service";
import {VendorPromotionService} from "./serivces/vendor-promotion.service";
import {VendorProductService} from "./serivces/vendor-product.service";
import {Vendor} from "./entities/vendor.entity";
import {VendorResolver} from "./graphql/common/vendor.resolver";
import {VendorRoleService} from "./serivces/vendor-role.service";
import {VendorService} from "./serivces/vendor.service";
import {VendorShippingService} from "./serivces/vendor-shipping.service";
import {VendorBank} from "./entities/vendor-bank.entity";
import {VendorInfo} from "./entities/vendor-info.entity";
import {VendorContact} from "./entities/vendor-contact.entity";
import {VendorMarketingContact} from "./entities/vendor-marketing-contact.entity";
import {AdminVendorResolver} from "./graphql/admin-api/admin-vendor.resolver";
import {VendorEntityResolver} from "./graphql/common/vendor-entity.resolver";
import {InitializerService} from "./serivces/initializer.service";
import { BraintreeService } from '../../payment/braintree/braintree.service';
import {VendorDelhiveryApiService} from "./serivces/delhivery-api.sevice";

@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [
        VendorOrderChannelService,
        ProductSearchService,
        SearchIndexService,
        VendorFacetService,
        IdCodecService,
        VendorPromotionService,
        VendorProductService,
        VendorRoleService,
        VendorService,
        VendorShippingService,
        ConfigService,
        InitializerService,
        BraintreeService,
        VendorDelhiveryApiService
    ],
    entities: [
        Vendor,
        VendorBank,
        VendorContact,
        VendorInfo,
        VendorMarketingContact
    ],
    adminApiExtensions: {
        schema: adminApiExtensions,
        resolvers: [
            AdminVendorProductResolver,
            VendorResolver,
            AdminVendorResolver,
            VendorEntityResolver
        ],
    },
    shopApiExtensions:{
        schema: shopApiExtensions,
        resolvers: [
            ShopOrderResolver,
            ShopProductEntityResolver,
            ShopSearchProductResolver,
            VendorResolver,
            VendorEntityResolver
        ]
    },
    configuration: config => {
        config.customFields.Order.push({
            type: 'string',
            name: 'session',
        });
        return config;
    }
})
export class OrderVendorPlugin {
    static uiExtensions: AdminUiExtension = {
        extensionPath: path.join(__dirname, 'ui'),
        ngModules: [
            {
                type: 'shared' as const,
                ngModuleFileName: 'vendor-order-ui-extension.module.ts',
                ngModuleName: 'VendorOrderUiExtensionModule',
            },
            {
                type: 'lazy' as const,
                route: '',
                ngModuleFileName: 'vendor-order-ui-lazy.module.ts',
                ngModuleName: 'VendorOrderUiLazyModule',
            },
        ],
        translations: {
            en: path.join(__dirname, 'i18n/en.json')
        }
    };
}
