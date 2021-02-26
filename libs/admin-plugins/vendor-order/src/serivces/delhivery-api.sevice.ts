import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import axios from 'axios';
import { DelhiveryAccount } from "@bavaan/vendure-delhivery-plugin/src/entities/delhivery-account.entity";

@Injectable()
export class VendorDelhiveryApiService{
    private delhiveryURL = "https://track.delhivery.com/";

    constructor(
        @InjectConnection() private connection: Connection,
    ) {
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
        let delhiveryAccount = await this.connection
            .getRepository(DelhiveryAccount)
            .findOne();

        let res = await axios({
            headers: {
                'Accept': 'application/json',
                'authorization': 'Token ' + delhiveryAccount?.api_key,
                'Content-Type': 'application/json',
            },
            method: 'post',
            url: this.delhiveryURL+ 'api/backend/clientwarehouse/create/',
            data: dataWarehouse
        });

        return res.data;
    }

    async editWarehouse(dataWarehouse: object){
        /*let data = {
            "phone": "phone no.",
            "name": "warehouse name",
            "pin": "324005",
            "address": "address",
            "registered_name": "registered username",
        };*/
        let delhiveryAccount = await this.connection
            .getRepository(DelhiveryAccount)
            .findOne();

        let res = await axios({
            headers: {
                'Accept': 'application/json',
                'authorization': 'Token ' + delhiveryAccount?.api_key,
                'Content-Type': 'application/json',
            },
            method: 'post',
            url: this.delhiveryURL+ 'api/backend/clientwarehouse/edit/',
            data: dataWarehouse
        });

        return res.data;
    }

}