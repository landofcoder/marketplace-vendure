import { LanguageCode } from '@vendure/common/lib/generated-types';
import {ShippingEligibilityChecker, ShippingCalculator, Channel} from '@vendure/core';
import {VendorOrderChannelService, VendorService} from "@bavaan/vendure-order-vendor-plugin";

let vendorService: any;
let orderChannel: any;

export const DomesticShippingEligibilityChecker = new ShippingEligibilityChecker({
    code: 'domestic-shipping-eligibility-checker',
    description: [{ languageCode: LanguageCode.en, value: 'Domestic shipping eligibility checker' }],
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
        if(channel){
            let vendor = await vendorService.findVendorByChannelCode(channel.code);
            if(vendor){
                return  order.shippingAddress.countryCode === "IN" && vendor.info[0].countryCode === "IN"
            }
        }
        return false;
    },
});

export const DomesticShippingCalculator = new ShippingCalculator({
    code: 'domestic-shipping-calculator',
    description: [{ languageCode: LanguageCode.en, value: 'Domestic Shipping Calculator' }],
    args: {
        itemWeight: {
            type: 'int',
            label:[{languageCode: LanguageCode.en, value: "Item Weight (gram)"}],
            config: { inputType: 'default' }
            },
        firstItemWeight: {
            type: 'int',
            label:[{languageCode: LanguageCode.en, value: "First Item Weight Rate"}],
            config: { inputType: 'default' }
            },
        addedItemWeight: {
            type: 'int',
            label:[{languageCode: LanguageCode.en, value: "Additional Item Weight Rate"}],
            config: { inputType: 'default' }
            },
        firstItemRate: {
            type: 'int',
            label:[{languageCode: LanguageCode.en, value: "First Item Rate"}],
            config: { inputType: 'percentage' }
            },
        addedItemRate: {
            type: 'int',
            label:[{languageCode: LanguageCode.en, value: "Additional Item Rate"}],
            config: { inputType: 'percentage' }
            }
    },
    init: (injector) => {
    },
    calculate: (ctx, order, args) => {
        let numOfOrderItem = order.lines.map( o => o.items.length ).reduce((x, y) => x+ y );
        let totalOrderItemWeight = order.lines.map(o => ((o.productVariant.customFields as any).weight || 100) * o.items.length).reduce((x, y) => x+ y );
        let numOfItem =  args.firstItemRate + (numOfOrderItem - 1) * args.addedItemRate
        let totalWeight = args.firstItemWeight + (totalOrderItemWeight / args.itemWeight)* args.addedItemWeight
        return {
            price: (numOfItem + totalWeight) * 100,
            priceWithTax: (numOfItem + totalWeight) * 100
        };
    },
});