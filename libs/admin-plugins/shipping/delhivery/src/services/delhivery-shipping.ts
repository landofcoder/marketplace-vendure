import { LanguageCode } from '@vendure/common/lib/generated-types';
import { ShippingEligibilityChecker, ShippingCalculator, Order } from '@vendure/core';
import { VendorService, VendorOrderChannelService } from "@bavaan/vendure-order-vendor-plugin";
import { DelhiveryApiService } from "./delhivery-api.sevice";
import { DelhiveryAccountService } from "./delhivery-account.service";

let vendorService: VendorService;
let orderChannel: VendorOrderChannelService;
let delhiveryApi: DelhiveryApiService;
let delhiveryAccountService: DelhiveryAccountService;

export const DelhiveryShippingEligibilityChecker = new ShippingEligibilityChecker({
    code: 'delhivery-shipping-eligibility-checker',
    description: [{ languageCode: LanguageCode.en, value: 'Delhivery shipping eligibility checker' }],
    args: {
        //countryCode: { type: 'string', configs: { inputType: 'text' } }
    },
    init: (injector) => {
        delhiveryApi = injector.get(DelhiveryApiService);
        vendorService = injector.get(VendorService);
        delhiveryAccountService = injector.get(DelhiveryAccountService);
        orderChannel = injector.get(VendorOrderChannelService);
    },
    check: async (ctx, order, args) => {
        let delhiveryAccount = await delhiveryAccountService.getDefault();
        if(!order.id || !delhiveryAccount){
            return false;
        } else {
            let channel = await orderChannel.findChannelByOrder(order.id);
            if(channel){
                let vendor = await vendorService.findVendorByChannelCode(channel.code);
                if(vendor){
                    return  order.shippingAddress.countryCode === "IN" && vendor.info[0].countryCode === "IN"
                }
            }
            return false;
        }
    },
});

export const DelhiveryShippingCalculator = new ShippingCalculator({
    code: 'delhivery-shipping-calculator',
    description: [{ languageCode: LanguageCode.en, value: 'Delhivery Shipping Calculator' }],
    args: {
        // rate: { type: 'int', configs: { inputType: 'money' } },
        // taxRate: { type: 'int', configs: { inputType: 'percentage' } }
    },
    init: (injector) => {
        delhiveryApi = injector.get(DelhiveryApiService);
    },
    calculate: async (ctx, order, args) => {
        let delhiveryAccount = await delhiveryAccountService.getDefault();
        let handFee = delhiveryAccount ? delhiveryAccount.hand_fee : 0;
        let channel = await orderChannel.findChannelByOrder(order.id);
        if(channel){
            let vendor = await vendorService.findVendorByChannelCode(channel.code);
            if(vendor && vendor.info.length){
                let res = await delhiveryApi.shippingCharge(order, vendor.info[0]);
                console.log('---------------', res);
                if (res.length){
                    let response = {
                        price: res[0].gross_amount + handFee,
                        priceWithTax: res[0].total_amount + handFee,
                    };
                    return response;
                }
            }
        }

        return undefined
    },
});