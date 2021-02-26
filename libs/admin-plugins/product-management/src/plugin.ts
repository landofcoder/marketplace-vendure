import { LanguageCode, PluginCommonModule, VendurePlugin } from '@vendure/core';

import path from 'path';
import { AdminUiExtension } from '@bavaan/ui-devkit/compiler';
import { adminApiExtensions } from './graphql/api-extensions';
import { ProductManagementResolver } from './graphql/product-management.resolver';

@VendurePlugin({
    imports: [PluginCommonModule],
    adminApiExtensions: {
        schema: adminApiExtensions,
        resolvers: [ProductManagementResolver],
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
        config.customFields.Product.push({
            type: 'boolean',
            name: 'isInStock',
            public: true,
            defaultValue: true,
            label: [
                { languageCode: LanguageCode.en, value: "Is In Stock" },
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
                route: 'catalog',
                ngModuleFileName: 'product-management-ui-lazy.module.ts',
                ngModuleName: 'ProductManagementUiLazyModule',
            },
        ],
    };
}
