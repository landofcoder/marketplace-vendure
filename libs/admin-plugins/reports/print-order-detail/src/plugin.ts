import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import path from 'path';
import { AdminUiExtension } from '@bavaan/ui-devkit/compiler';

@VendurePlugin({
    imports: [PluginCommonModule],
})
export class PrintOrderDetailPlugin {
    static uiExtensions: AdminUiExtension = {
        extensionPath: path.join(__dirname, 'ui'),
        ngModules: [
            {
                type: 'shared' as const,
                ngModuleFileName: 'print-order-detail-ui-extension.module.ts',
                ngModuleName: 'PrintOrderDetailUiExtensionModule',
            },
            {
                type: 'lazy' as const,
                route: '',
                ngModuleFileName: 'print-order-detail-ui-lazy.module.ts',
                ngModuleName: 'PrintOrderDetailUiLazyModule',
            },
        ],
    };
}
