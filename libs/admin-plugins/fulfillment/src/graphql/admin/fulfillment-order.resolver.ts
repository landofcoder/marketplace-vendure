import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
    Permission
} from '@vendure/common/lib/generated-types';
import {
    OrderService,
    ShippingMethodService,
    Allow,
    Ctx,
    RequestContext,
    Order,
    OrderItem,
    TransactionalConnection,
    patchEntity
} from "@vendure/core";
import { CustomizeMutationFulfillOrderArgs } from "../../type";
import { DelhiveryApiService } from "@bavaan/vendure-delhivery-plugin";
import { VendorService } from '@bavaan/vendure-order-vendor-plugin';
import { DelhiveryWarehouseService } from "@bavaan/vendure-delhivery-plugin/src/services/delhivery-warehouse.service";
import {QueryGetPackingSlipArgs} from "../../generated-admin-types";
import { Vendor } from '@bavaan/vendure-order-vendor-plugin/src/entities/vendor.entity';
import {EcomExpressApiService} from "@bavaan/vendure-ecomexpress-plugin/src/services/ecom-express-api.service";
import { Fulfillment } from "@vendure/core/dist/entity/fulfillment/fulfillment.entity"

@Resolver()
export class FulfillmentOrderResolver {
    constructor(
        private connection: TransactionalConnection,
        private orderService: OrderService,
        private shippingMethodService: ShippingMethodService,
        private delhiveryApi: DelhiveryApiService,
        private vendorService: VendorService,
        private delhiveryWarehouseService: DelhiveryWarehouseService,
        private ecomExpressApiService: EcomExpressApiService
    ) {
    }


    @Mutation()
    @Allow(Permission.UpdateOrder)
    async fulfillOrder(
        @Ctx() ctx: RequestContext,
        @Args() args: CustomizeMutationFulfillOrderArgs
    ) {
        // get order Info
        let orderInfo = await this.connection.getRepository(Order).findOne(args.input.orderId, {
            relations: ['shippingMethod', 'payments', 'channels', 'customer', 'lines', 'lines.productVariant', 'lines.productVariant.translations']
        });
        let channelCode: string|any = orderInfo?.channels && orderInfo.channels.length > 1 ? orderInfo.channels[1].code : orderInfo?.channels[0].code;
        let vendorInfo = await this.vendorService.findVendorByChannelCode(channelCode);
        if (args.input.method == "delhivery_shipping_method") {
            return this.fulfillByDehlivery(ctx, args, orderInfo, vendorInfo);
        } else if (args.input.method == "ecomexpress_shipping_method"){
            return this.fulfillByEcomExpress(ctx, args, orderInfo, vendorInfo);
        } else if (args.input.method == "manual_shipping_method") {
            let result = await this.orderService.createFulfillment(ctx, args.input) as any;
            if(!result.customFields.courier){
                result.customFields.courier = args.input.courier;
                result = await this.connection.getRepository(Fulfillment).save(result, {reload: true});
            }
            return result;
        }
        else {
            throw new Error("Must choose method")
        }
    }
    
    @Query()
    @Allow(Permission.UpdateOrder)
    async getPackingSlip(
        @Ctx() ctx: RequestContext,
        @Args() args: QueryGetPackingSlipArgs
    ) {
        return this.delhiveryApi.delhiveryPackingSlip(args.trackingCode);
    }

    async fulfillByEcomExpress(ctx: RequestContext, args: CustomizeMutationFulfillOrderArgs, orderInfo: Order| undefined , vendorInfo: Vendor | undefined) {

        try {
            let productInfo = orderInfo?.lines.map(o => o.productVariant.translations[0].name).join(' ,');
            let totalOrder = orderInfo?.total ? orderInfo.total / 100 : 0;
            let shippingAddress = orderInfo?.shippingAddress;
            let payment_mode = orderInfo?.payments && orderInfo.payments.length > 0 &&
            orderInfo.payments[0].method == "cod-payment" ?
                "cod" : "ppd";
            let shipmentInfo = {
                "AWB_NUMBER": "", // result of api getAwbNumbers
                "ORDER_NUMBER": new Date().getTime().toString(),
                "PRODUCT": payment_mode === "cod" ? "COD" : "PPD",//COD or PPD
                "CONSIGNEE": orderInfo?.customer?.firstName + ' ' + orderInfo?.customer?.lastName,
                "CONSIGNEE_ADDRESS1": shippingAddress?.streetLine1,
                "CONSIGNEE_ADDRESS2": shippingAddress?.streetLine2,
                "CONSIGNEE_ADDRESS3": "",
                "DESTINATION_CITY": shippingAddress?.city,
                "PINCODE": shippingAddress?.postalCode,
                "STATE": shippingAddress?.province,
                "MOBILE": orderInfo?.customer?.phoneNumber,
                "TELEPHONE": orderInfo?.customer?.phoneNumber,
                "ITEM_DESCRIPTION": productInfo,
                "PIECES": orderInfo?.lines.length,
                "COLLECTABLE_VALUE": payment_mode === "cod" ? totalOrder : 0,// totalOrder or 0
                "DECLARED_VALUE": totalOrder,
                "ACTUAL_WEIGHT": args.input.orderWeight,
                "VOLUMETRIC_WEIGHT": 0,
                "LENGTH": 12,
                "BREADTH": 5,
                "HEIGHT": 2,
                "PICKUP_NAME": vendorInfo!.firstName + ' ' + vendorInfo!.lastName,
                "PICKUP_ADDRESS_LINE1": vendorInfo!.info[0].regAddress || '',
                "PICKUP_ADDRESS_LINE2": '',
                "PICKUP_PINCODE": vendorInfo!.info[0].postalCode,
                "PICKUP_PHONE": vendorInfo!.info[0].phone,
                "PICKUP_MOBILE": vendorInfo!.info[0].phone,
                "RETURN_NAME": vendorInfo!.firstName + ' ' + vendorInfo!.lastName,
                "RETURN_ADDRESS_LINE1": vendorInfo!.info[0].regAddress || '',
                "RETURN_ADDRESS_LINE2": "",
                "RETURN_PINCODE": vendorInfo!.info[0].postalCode,
                "RETURN_PHONE": vendorInfo!.info[0].phone,
                "RETURN_MOBILE": vendorInfo!.info[0].phone,
                "ADDONSERVICE": [
                    ""
                ],
                "DG_SHIPMENT": "false",
                "ADDITIONAL_INFORMATION": {
                    "essentialProduct": "Y",
                    "OTP_REQUIRED_FOR_DELIVERY": "N",
                    "DELIVERY_TYPE": "",
                    "SELLER_TIN": '',//vendorInfo!.info[0].GSTINID,
                    "INVOICE_NUMBER": orderInfo!.code,
                    "INVOICE_DATE": orderInfo!.createdAt.toISOString().split('T')[0],
                    "ESUGAM_NUMBER": "",
                    "ITEM_CATEGORY": "CATEGORY",
                    "PACKING_TYPE": "Box",
                    "PICKUP_TYPE": "WH",
                    "RETURN_TYPE": "WH",
                    "CONSIGNEE_ADDRESS_TYPE": "WH",
                    "PICKUP_LOCATION_CODE": "",
                    "SELLER_GSTIN": vendorInfo!.info[0].GSTINID,
                    "GST_HSN": new Date().getTime(),
                    "GST_ERN": "",
                    "GST_TAX_NAME": "DELHI GST",
                    "GST_TAX_BASE": 900,
                    "DISCOUNT": 0,
                    "GST_TAX_RATE_CGSTN": 5,
                    "GST_TAX_RATE_SGSTN": 5,
                    "GST_TAX_RATE_IGSTN": 0,
                    "GST_TAX_TOTAL": 100,
                    "GST_TAX_CGSTN": 50,
                    "GST_TAX_SGSTN": 50,
                    "GST_TAX_IGSTN": 0
                }
            }
            let result = await this.ecomExpressApiService.createShipment(shipmentInfo, payment_mode as any);

            args.input.trackingCode = result.awb;
            return this.orderService.createFulfillment(ctx, args.input);
        }catch (e) {
            throw new Error(e);
        }
    }

    async fulfillByDehlivery(ctx: RequestContext, args: CustomizeMutationFulfillOrderArgs, orderInfo: Order| undefined , vendorInfo: Vendor | undefined){
        let channelId: string|any = orderInfo?.channels && orderInfo.channels.length > 1 ? orderInfo.channels[1].id : orderInfo?.channels[0].id;
        let delhiveryWarehouseInfo = await this.delhiveryWarehouseService.findDelhiveryWarehouseByChannelId(channelId);
        if (delhiveryWarehouseInfo) {
            console.log("delhiveryWarehouseInfo", delhiveryWarehouseInfo);
            if (orderInfo!.shippingAddress.countryCode === "IN") {
                let shippingAddress = orderInfo?.shippingAddress;
                let payment_mode = orderInfo?.payments && orderInfo.payments.length > 0 &&
                orderInfo.payments[0].method == "cod-payment"?
                    "COD" : "Prepaid";
                let productInfo = orderInfo?.lines.map(o => o.productVariant.translations[0].name).join(' ,');
                let totalOrder = orderInfo?.total ? orderInfo.total/ 100 : 0;
                //console.log("order info", orderInfo);
                let shippingInfo: any = {
                    "pin": shippingAddress?.postalCode,
                    "state": shippingAddress?.province,
                    "city": shippingAddress?.city,
                    "add": shippingAddress?.streetLine1 + ' ' + shippingAddress?.streetLine2,
                    "name": orderInfo?.customer?.firstName + ' ' + orderInfo?.customer?.lastName,
                    "phone": orderInfo?.customer?.phoneNumber,
                    "order": new Date().getTime(),
                    "total_amount": Math.round(totalOrder),
                    "products_desc": productInfo,
                    "extra_parameters": {},
                    "country": shippingAddress?.country,
                    "country_code": shippingAddress?.countryCode,
                    "fragile_shipment": "false",
                    "email": orderInfo?.customer?.emailAddress || '',
                    "payment_mode": payment_mode,
                    "weight": args.input.orderWeight,
                    "tax_value": 0,
                    "commodity_value": orderInfo?.total,
                    "category_of_goods": "category",
                    "seller_name": vendorInfo!.firstName + ' ' + vendorInfo!.lastName,
                    "seller_add": vendorInfo!.info[0].regAddress || '',
                };
                if (payment_mode === 'COD') {
                    shippingInfo['cod_amount'] = orderInfo?.total;
                }
                let delhiveryOrderInfo = {
                    "shipments": [
                        shippingInfo
                    ],
                    "pickup_location": {
                        "name": delhiveryWarehouseInfo.pickup_name
                    }
                };
                console.log("test", delhiveryOrderInfo);
                let result = await this.delhiveryApi.createForwardShipment(delhiveryOrderInfo);
                console.log("result", result);
                if (result.rmk) {
                    throw new Error(result.packages[0].remarks);
                }
                args.input.trackingCode = result.packages[0].waybill;
                return this.orderService.createFulfillment(ctx, args.input);
            }
        } else {
            throw new Error("Delhivery Warehouse don't config! Please config Delhivery Warehouse!");
        }
    }

}