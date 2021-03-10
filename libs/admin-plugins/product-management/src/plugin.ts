import { LanguageCode, PluginCommonModule, VendurePlugin } from '@vendure/core';
import path from 'path';
import * as fs from 'fs'; 
import { AdminUiExtension } from '@bavaan/ui-devkit/compiler';
import { adminApiExtensions, shopApiExtensions } from './graphql/api-extensions';
import { ProductManagementResolver } from './graphql/product-management.resolver';
import { AdminSEOConfigResolver, ShopSEOConfigResolver } from './graphql/seo-config.resolver';
import { SeoConfig } from './entities/seo-config.entity';
import { SEOConfigService } from './services/seo-config.service';
import { Type } from '@vendure/common/lib/shared-types';

@VendurePlugin({
    entities: [SeoConfig],
    imports: [PluginCommonModule],
    providers: [
        SEOConfigService
    ],
    adminApiExtensions: {
        schema: adminApiExtensions,
        resolvers: [ProductManagementResolver, AdminSEOConfigResolver],
    },
    shopApiExtensions:{
        schema: shopApiExtensions,
        resolvers: [ShopSEOConfigResolver]
    },
    configuration: config => {
        config.customFields.ProductVariant.push({
          type: 'float',
          name: 'shippingPrice',
          label: [
            { languageCode: LanguageCode.en, value: "Shipping Price" },
          ],
        });

        config.customFields.ProductVariant.push({
            type: 'float',
            name: 'shippingBusinessPrice',
            label: [
              { languageCode: LanguageCode.en, value: "Business Price + Shipping" },
            ],
          });
          
        config.customFields.ProductVariant.push({
            type: 'float',
            name: 'MRPPrice',
            label: [
                { languageCode: LanguageCode.en, value: "MRP Price" },
            ],
        });

        config.customFields.Product.push({
            type: 'boolean',
            name: 'isInStock',
            public: true,
            defaultValue: true,
            label: [
                { languageCode: LanguageCode.en, value: "In Stock" },
            ],
        });
        
        config.customFields.Product.push({
            type: 'string',
            name: 'status',
            defaultValue: 'Approval',
            label: [
                { languageCode: LanguageCode.en, value: "Status" },
            ],
        });
        return config;
      }
})
export class ProductManagement {
    static uiExtensions: AdminUiExtension = {
        extensionPath: path.join(__dirname, 'ui'),
        ngModules: [
            {
                type: 'shared' as const,
                ngModuleFileName: 'product-management-ui-extension.module.ts',
                ngModuleName: 'ProductManagementUiExtensionModule',
            },
            {
                type: 'lazy' as const,
                route: '',
                ngModuleFileName: 'product-management-ui-lazy.module.ts',
                ngModuleName: 'ProductManagementUiLazyModule',
            },
        ],
        translations: {
            en: path.join(__dirname, 'i18n/en.json')
        }
    };

    static init(storefront: string): Type<ProductManagement> {
        fs.writeFileSync(__dirname + '/ui/env.json',`
        {
            "storefront": "${storefront}"
        }
        `);

        return ProductManagement
    }

}
