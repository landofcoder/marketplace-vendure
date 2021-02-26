import {
    PluginCommonModule,
    VendurePlugin
} from '@vendure/core';
import path from 'path';
import { AdminUiExtension } from '@bavaan/ui-devkit/compiler';
import { adminApiExtensions} from './graphql';
import { EcomExpressAccount } from "./entities/ecom-express-account.entity";
import {AdminEcomexpressAccount} from "./graphql/admin-api/admin-ecomexpress-account";
import {EcomExpressService} from "./services/ecom-express.service";
import {EcomExpressApiService} from "./services/ecom-express-api.service";

@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [
        EcomExpressService,
        EcomExpressApiService
    ],
    entities: [EcomExpressAccount],
    adminApiExtensions: {
        schema: adminApiExtensions,
        resolvers: [AdminEcomexpressAccount],
    },
    configuration: config => {
        return config;
    }
})
export class EcomExpressPlugin {

    static uiExtensions: AdminUiExtension = {
        extensionPath: path.join(__dirname, 'ui'),
        ngModules: [
            {
                type: 'shared' as const,
                ngModuleFileName: 'ecomexpress-ui-extension.module.ts',
                ngModuleName: 'EcomexpressUiExtensionModule',
            },
            {
                type: 'lazy' as const,
                route: '',
                ngModuleFileName: 'ecomexpress-ui-lazy.module.ts',
                ngModuleName: 'EcomexpressUiLazyModule',
            },
        ],
        translations: {
            en: path.join(__dirname, 'i18n/en.json')
        }
    };
}
