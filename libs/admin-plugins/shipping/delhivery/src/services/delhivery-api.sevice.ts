import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { DelhiveryAccountService } from "./delhivery-account.service";
import { delhiveryURL } from "../configs/delhivery-config";
import axios from 'axios';
import {ID, Order, TransactionalConnection} from '@vendure/core';
import { VendorInfo } from "@bavaan/vendure-order-vendor-plugin/src/entities/vendor-info.entity";
import { URLSearchParams } from 'url';
import { DelhiveryAccount } from "../entities/delhivery-account.entity";

@Injectable()
export class DelhiveryApiService{

    //private instance: any;

    constructor(
        private connection: TransactionalConnection,
        private delhiveryAccountService: DelhiveryAccountService,
    ) {
        // this.apiConfig();
    }

    async shippingCharge(order: Order, vendorInfo: VendorInfo){
        let res = await this.apiConfig({
            headers:{
                'Content-Type': 'application/json',
            },
            method: 'get',
            url: '/api/kinko/v1/invoice/charges/.json',
            params: {
                "ss": 'Delivered',
                "md": 'S',
                "cgm": 500,
                "o_pin": order.shippingAddress.postalCode,
                "d_pin": vendorInfo.postalCode,
                "pt": "COD",
                "cod": order.total
            }
        });
        return res.data;

    }

    async createForwardShipment(shippmentInfo: object){

        /*let shippmentInfo = {
            "shipments": [
            {
                "pin": 110096,
                "state": "Delhi",
                "city": "Delhi",
                "add": "64/8 Luu Huu Phuoc",
                "name": "Contact Name",
                "phone": 1234567890,
                "order": "Ref Number1",
                "total_amount": 10100,
                "products_desc": "Laptop",
                "extra_parameters": {},
                "country": "India",
                "country_code": "IN",
                "fragile_shipment": "false",
                "email": "loan9202@gmail.com",
                "payment_mode": "COD",
                "weight": 200,
                "tax_value": 100,
                "commodity_value": 10000,
                "category_of_goods": "Electronic",
                "seller_name": "seller name",
                "seller_add": "Seller address",
                "seller_inv_date": "09/11/2020",
                "cod_amount": 10100
            }
        ],
            "pickup_location": {
            "name": "Nguyen Thi Loan"
        }
        }*/

        const params = new URLSearchParams();
        params.append('format', 'json');
        params.append('data', JSON.stringify(shippmentInfo));

        let res = await this.apiConfig({
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'post',
            url: '/api/cmu/create.json',
            data: params
        });

        return res.data;
    }

    async createWarehouse(dataWarehouse: object){
        /*let data = {
            "phone": "phone no.",
            "city": "Kota",
            "name": "warehouse name",
            "pin": "324005",
            "address": "address",
            "country": "India",
            "email": "abc@gmail.com",
            "registered_name": "registered username",
            "return_address": "return_address",
            "return_pin":"return_pin",
            "return_city":"return_city",
            "return_state":"return_state",
            "return_country": "return_country"
        };*/

        let res = await this.apiConfig({
            headers:{
                'Content-Type': 'application/json',
            },
            method: 'post',
            url: '/api/backend/clientwarehouse/create/',
            data: dataWarehouse
        });

        return res.data;
    }

    async delhiveryPackingSlip(waybill: string){
        try {
            let res = await this.apiConfig({
                headers:{
                    'Content-Type': 'application/json',
                },
                method: 'get',
                url: '/api/p/packing_slip',
                params: {
                    wbns: waybill
                }
            });
            if(res.data && res.data.packages.length) {
                return res.data.packages[0];
            } else {
                throw new Error('Please check delhivery config or track code');
            }
        } catch (e){
            throw new Error('Please check delhivery config or track code');
        }
    }

    async apiConfig(data: object){
        let delhiveryAccount = await this.delhiveryAccountService.getDefault();
        let instance = await axios.create({
            baseURL: delhiveryURL,
            headers: {
                'Accept': 'application/json',
                'authorization': 'Token ' + delhiveryAccount?.api_key
            },
        });
        return instance(data)
    }


}