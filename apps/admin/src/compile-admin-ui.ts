import { compileUiExtensions } from '@bavaan/ui-devkit/compiler';
import path from 'path';
import { DailyOrdersPlugin } from '@bavaan/vendure-daily-orders-plugin';
import { ReviewsPlugin } from '@bavaan/vendure-reviews-plugin';
import { NewsletterPlugin } from '@bavaan/vendure-newsletter-plugin';
import { TierPricePlugin } from '@bavaan/vendure-tier-price-plugin';
import { ProductManagement } from '@bavaan/vendure-product-management';
import { OrderVendorPlugin } from '@bavaan/vendure-order-vendor-plugin';
import { ContactPlugin, sendContactHandler } from '@bavaan/vendure-contact-plugin';
import { DelhiveryPlugin } from '@bavaan/vendure-delhivery-plugin';
import { OrderFulfillPlugin } from '@bavaan/vendure-order-fullfill-plugin';
import { ProductRecommendationsPlugin } from '@bavaan/vendure-product-recommendations';
import { EcomExpressPlugin } from '@bavaan/vendure-ecomexpress-plugin';
import { InternationalShippingPlugin } from '@bavaan/vendure-international-shipping-plugin';
import { DomesticShippingPlugin } from '@bavaan/vendure-domestic-shipping-plugin';

if (require.main === module) {
    // Called directly from command line
    customAdminUi({ recompile: true, devMode: false })
        .compile?.()
        .then(() => {
            process.exit(0);
        });
}

export function customAdminUi(options: { recompile: boolean; devMode: boolean }) {
    const compiledAppPath = path.join(__dirname, '../admin-ui');
    if (options.recompile) {
        return compileUiExtensions({
            outputPath: compiledAppPath,
            extensions: [
                {
                    translations: {
                        en: path.join(__dirname, 'translations/en.json'),
                    },
                },
                ReviewsPlugin.uiExtensions,
                NewsletterPlugin.uiExtensions,
                ProductRecommendationsPlugin.uiExtensions,
                TierPricePlugin.uiExtensions,
                ProductManagement.uiExtensions,
                OrderVendorPlugin.uiExtensions,
                ContactPlugin.uiExtensions,
                DailyOrdersPlugin.uiExtensions,
                DelhiveryPlugin.uiExtensions,
                OrderFulfillPlugin.uiExtensions,
                DomesticShippingPlugin.uiExtensions,
                EcomExpressPlugin.uiExtensions,
                InternationalShippingPlugin.uiExtensions,
            ],
            devMode: options.devMode,
        });
    } else {
        return {
            path: path.join(compiledAppPath, 'dist'),
        };
    }
}
