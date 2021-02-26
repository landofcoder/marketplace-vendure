import { LanguageCode } from '@vendure/common/lib/generated-types';
import {ShippingEligibilityChecker, ShippingCalculator, Channel} from '@vendure/core';
import { VendorService, VendorOrderChannelService } from "@bavaan/vendure-order-vendor-plugin";
import { ShippingCountryService } from "./shipping-country.service";
let vendorService: VendorService;
let orderChannel: VendorOrderChannelService;
let shippingCountryService: ShippingCountryService;

export const InternationalShippingEligibilityChecker = new ShippingEligibilityChecker({
    code: 'international-shipping-eligibility-checker',
    description: [{ languageCode: LanguageCode.en, value: 'International shipping eligibility checker' }],
    args: {
    },
    init: (injector) => {
        vendorService = injector.get(VendorService);
        orderChannel = injector.get(VendorOrderChannelService);
    },
    check: async (ctx, order, args) => {
        let channel: any;
        if(order?.id){
            channel = await orderChannel.findChannelByOrder(order.id);
        } else {
            channel = ctx.channel;
        }

        if (channel) {
            let vendor = await vendorService.findVendorByChannelCode(channel.code);
            if (vendor) {
                return order.shippingAddress.countryCode !== vendor.info[0].countryCode
            }
        }
        return false;
    },
});

export const InternationalShippingCalculator = new ShippingCalculator({
    code: 'international-shipping-calculator',
    description: [{ languageCode: LanguageCode.en, value: 'International Shipping Calculator' }],
    args: {
        defaultPrice: {
            type: 'int',
            label:[{languageCode: LanguageCode.en, value: "Default Shipping Price"}],
            config: { inputType: 'default' }
            },
    },
    init: (injector) => {
        shippingCountryService = injector.get(ShippingCountryService);
    },
    calculate: async (ctx, order, args) => {
        if(order.shippingAddress && order.shippingAddress.countryCode){
            let shippingPrice = await shippingCountryService.findByCountryCode(ctx, order.shippingAddress.countryCode);
            if (shippingPrice){
                return {
                    price: shippingPrice.price * 100,
                    priceWithTax: shippingPrice.price * 100
                }
            }
        }

        return {
            price: args.defaultPrice * 100,
            priceWithTax: args.defaultPrice * 100,
        };
    },
});