import { Injectable, OnModuleInit } from '@nestjs/common';
import {
    ID,
    TransactionalConnection
} from '@vendure/core';
import { DelhiveryWarehouse } from "../entities/delhivery-warehouse.entity";
import { VendorDelhiveryApiService } from "@bavaan/vendure-order-vendor-plugin/src/serivces/delhivery-api.sevice";
import { CreateDelhiveryWarehouseInput } from "../generated-admin-types";

@Injectable()
export class DelhiveryWarehouseInitDefaultService implements OnModuleInit {
    constructor(
        private connection: TransactionalConnection,
        private delhiveryApiService: VendorDelhiveryApiService,
    ) {
    }

    onModuleInit() {
        this.initWarehouseForDefaultChannel();
    }

    private async initWarehouseForDefaultChannel() {
        let delhiveryWarehouseInput : CreateDelhiveryWarehouseInput = {
            // @ts-ignore
            pickup_name: '__default_channel__',
            city: 'Mumbai',
            pincode: '400097',
            state: 'Maharashtra',
            address: '232 Sai Krupa Society,Malad East Mumbai',
            country: 'IN',
            contact_person_name: 'NA',
            contact_person_email: 'info@storeofapp.com',
            contact_person_phone: '8655076261',
            return_address: '232 Sai Krupa Society,Malad East Mumbai',
            return_pincode: '400097',
            return_city: 'Mumbai',
            return_state: 'Maharashtra',
            return_country: 'IN',
            from_working_hours: '08:00:00',
            to_working_hours: '17:30:00',
            day_working_hours: 'MON,TUE,WED,THU,FRI,STA,SUN',
            preferred_pickup_slots: '10:00 AM - 7:00 PM',
            channelId: '1',
        };

        let dataCreate = {
            "phone": '8655076261',
            "city": 'Mumbai',
            "name": '__default_channel__',
            "pin": '400097',
            "address": '232 Sai Krupa Society,Malad East Mumbai',
            "state": 'Maharashtra',
            "country": 'India',
            "email": 'info@storeofapp.com',
            "registered_name": 'NA',
            "return_address": '232 Sai Krupa Society,Malad East Mumbai',
            "return_pin": '400097',
            "return_city": 'Mumbai',
            "return_state": 'Maharashtra',
            "return_country": 'India'
        };
        try{
            let res = await this.delhiveryApiService.createWarehouse(dataCreate);
            if (res) {
                const delhiveryWarehouseDefault = await this.findDelhiveryWarehouseByChannelId(1);
                if (delhiveryWarehouseDefault === undefined){
                    const delhiveryWarehouse = new DelhiveryWarehouse(delhiveryWarehouseInput);
                    return await this.connection.getRepository(DelhiveryWarehouse).save(delhiveryWarehouse);
                }
            }
        } catch (e) {
            const delhiveryWarehouseDefault = await this.findDelhiveryWarehouseByChannelId(1);
            if (delhiveryWarehouseDefault === undefined){
                const delhiveryWarehouse = new DelhiveryWarehouse(delhiveryWarehouseInput);
                return await this.connection.getRepository(DelhiveryWarehouse).save(delhiveryWarehouse);
            }
        }
    }

    async findDelhiveryWarehouseByChannelId(channelId: ID): Promise<DelhiveryWarehouse | undefined> {
        return await this.connection.getRepository(DelhiveryWarehouse).findOne({
            where: {
                channelId: channelId
            }
        });
    }
}
