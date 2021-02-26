import { Injectable, OnModuleInit } from '@nestjs/common';
import { EcomExpressService } from "./ecom-express.service";
import axios from 'axios';
import { Order, TransactionalConnection } from '@vendure/core';
import {URLSearchParams} from "url";

enum ShippingType {
    ppd="ppd",
    cod="cod",
    rev="rev"
}

@Injectable()
export class EcomExpressApiService{

    private PRODUCTION_API_URL = 'https://api.ecomexpress.in';
    private DEVELOPMENT_API_URL = 'https://clbeta.ecomexpress.in';

    constructor(
        private connection: TransactionalConnection,
        private ecomExpressService: EcomExpressService,
    ) {

    }

    async track(awb: number[]){
        return this.apiConfig({
            method: 'get',
            url: '/track_me/api/mawbd/',
            params: {awb: awb.join()}
        })
    }

    async cancleShipment(awbs: number[]){
        let result = await this.apiConfig({
            method: 'post',
            url: '/apiv2/cancel_awb/',
            objParams: {awbs: awbs.join()}
        }) as any;
        let response = result.shipments[0];
        if(!response && response.success == false) throw new Error(response.reason);
        return result
    }

    async createShipment(json_input: any, shippingType: ShippingType){

        // let json_input = [
        //     {
        //         "AWB_NUMBER": "107249072", // result of api getAwbNumbers
        //         "ORDER_NUMBER": "107249072-001",
        //         "PRODUCT": "PPD",
        //         "CONSIGNEE": "Test API User",
        //         "CONSIGNEE_ADDRESS1": "H. No. A10",
        //         "CONSIGNEE_ADDRESS2": "Block-T",
        //         "CONSIGNEE_ADDRESS3": "Sector 39 Test",
        //         "DESTINATION_CITY": "GURGAON",
        //         "PINCODE": "111111",
        //         "STATE": "DL",
        //         "MOBILE": "1111111111",
        //         "TELEPHONE": "0123456789",
        //         "ITEM_DESCRIPTION": "Kids Bicycle",
        //         "PIECES": 1,
        //         "COLLECTABLE_VALUE": 0,
        //         "DECLARED_VALUE": 1000,
        //         "ACTUAL_WEIGHT": 0.5,
        //         "VOLUMETRIC_WEIGHT": 0,
        //         "LENGTH": 12,
        //         "BREADTH": 5,
        //         "HEIGHT": 2,
        //         "PICKUP_NAME": "Pickup Name 1",
        //         "PICKUP_ADDRESS_LINE1": "Pickup Addr 1 Changed",
        //         "PICKUP_ADDRESS_LINE2": "Pickup Addr 2 Changed",
        //         "PICKUP_PINCODE": "111111",
        //         "PICKUP_PHONE": "0123456789",
        //         "PICKUP_MOBILE": "1234567891",
        //         "RETURN_NAME": "Test Return Name 1",
        //         "RETURN_ADDRESS_LINE1": "Test Return Addr 1 Changed",
        //         "RETURN_ADDRESS_LINE2": "Test Return Addr 2 Changed",
        //         "RETURN_PINCODE": "111111",
        //         "RETURN_PHONE": "1111111111",
        //         "RETURN_MOBILE": "0123456789",
        //         "ADDONSERVICE": [
        //             ""
        //         ],
        //         "DG_SHIPMENT": "false",
        //         "ADDITIONAL_INFORMATION": {
        //             "essentialProduct": "Y",
        //             "OTP_REQUIRED_FOR_DELIVERY": "Y",
        //             "DELIVERY_TYPE": "",
        //             "SELLER_TIN": "SELLER_TIN_1234",
        //             "INVOICE_NUMBER": "INVOICE_1234",
        //             "INVOICE_DATE": "09-06-2018",
        //             "ESUGAM_NUMBER": "eSUGAM_1234",
        //             "ITEM_CATEGORY": "ELECTRONICS",
        //             "PACKING_TYPE": "Box",
        //             "PICKUP_TYPE": "WH",
        //             "RETURN_TYPE": "WH",
        //             "CONSIGNEE_ADDRESS_TYPE": "WH",
        //             "PICKUP_LOCATION_CODE": "PICKUP_ADDR_002",
        //             "SELLER_GSTIN": "GISTN988787",
        //             "GST_HSN": "123456",
        //             "GST_ERN": "123456789123",
        //             "GST_TAX_NAME": "DELHI GST",
        //             "GST_TAX_BASE": 900,
        //             "DISCOUNT": 0,
        //             "GST_TAX_RATE_CGSTN": 5,
        //             "GST_TAX_RATE_SGSTN": 5,
        //             "GST_TAX_RATE_IGSTN": 0,
        //             "GST_TAX_TOTAL": 100,
        //             "GST_TAX_CGSTN": 50,
        //             "GST_TAX_SGSTN": 50,
        //             "GST_TAX_IGSTN": 0
        //         }
        //     }
        // ]

        let codes = await this.getAwbNumbers(1, shippingType);
        json_input['AWB_NUMBER'] = codes[0].toString();

        let res = await this.apiConfig({
            method: 'post',
            url: '/apiv2/manifest_awb/',
            objParams: { 'json_input': JSON.stringify([json_input]) }
        }) as any;
        let response = res.shipments[0];
        if(!response && response.success == false) throw new Error(response.reason);
        return response

    }

    async getAwbNumbers(count: number, type: ShippingType){

        let code = await this.apiConfig({
            method: 'post',
            url: '/apiv2/fetch_awb/',
            objParams: {
                count: count.toString(),
                type: type
            },
        });
        if (code?.success == 'no') {
            throw new Error(JSON.stringify(code));
        }

        return code?.awb;
    }


    async apiConfig(data: any){
        let ecomExpressAccount = await this.ecomExpressService.getDefault();
        if(ecomExpressAccount){
            const params = new URLSearchParams();
            params.append('username', ecomExpressAccount.username.toString());
            params.append('password', ecomExpressAccount.password.toString());

            if(data!.objParams){
                for ( let key in data.objParams){
                    params.append(key, data.objParams[key].toString());
                }
                delete data.objParams
            }

            let url = ecomExpressAccount.production ? this.PRODUCTION_API_URL : this.DEVELOPMENT_API_URL;
            let options = {
                ...data,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                baseURL: url,
                data: params
            } as any;
            return axios(options).then( res =>{
                //console.log(res)
                return res.data
                }
            );
        } else{
            throw new Error("Please config ecom express account");
        }

    }

}