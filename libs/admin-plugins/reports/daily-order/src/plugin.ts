import { DailyOrderService } from './service/daily-order.service';
import { DailyOrderResolver } from './graphql/daily-order.resolver';
import { adminApiExtension } from './graphql/api-extension';
import { AdminUiExtension } from '@bavaan/ui-devkit/compiler';
// import { AdminUiExtension } from '@ba/ui-devkit/compiler';
import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import path from 'path';
@VendurePlugin({
    imports: [PluginCommonModule],
    adminApiExtensions: {
        schema: adminApiExtension,
        resolvers: [DailyOrderResolver]
    },
    providers: [DailyOrderService],

})

export class DailyOrdersPlugin {
    static uiExtensions: AdminUiExtension = {
        extensionPath: path.join(__dirname, 'ui'),
        ngModules: [
            {
                type: 'shared' as const,
                ngModuleFileName: 'daily-orders-ui-extension.module.ts',
                ngModuleName: 'DailyOrdersUiExtension',
            },
            {
                type: 'lazy' as const,
                ngModuleFileName: 'daily-orders-lazy.module.ts',
                ngModuleName: 'DailyOrderLazyModule',
                route: 'reports/daily-orders'
            }
        ],
    }
}