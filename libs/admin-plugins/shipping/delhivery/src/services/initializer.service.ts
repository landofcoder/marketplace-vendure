import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Channel, LanguageCode, RequestContext, ShippingMethod, TransactionalConnection} from "@vendure/core";
import { DelhiveryShippingCalculator, DelhiveryShippingEligibilityChecker} from "./delhivery-shipping";
import { DEFAULT_CHANNEL_CODE } from "@vendure/common/lib/shared-constants";
import { ShippingConfiguration } from "@vendure/core/dist/service/helpers/shipping-configuration/shipping-configuration";
import {DelhiveryApiService} from "./delhivery-api.sevice";

@Injectable()
export class InitializerService implements OnModuleInit {

    constructor(
        private connection: TransactionalConnection,
        private shippingConfiguration: ShippingConfiguration,
        private delhiveryApiService: DelhiveryApiService
    ) {
    }

    onModuleInit() {
        this.initShippingMethod();
        this.registerDefaultWarehouse();
    }

    async initShippingMethod(){
        const channel = await this.connection
            .getRepository(Channel)
            .findOne({
                relations: ['defaultShippingZone', 'defaultTaxZone'],
                where:{
                    code: DEFAULT_CHANNEL_CODE
                }
            });

        //console.log('channel -------------- ', channel);
        if (channel) {
            const ctx = new RequestContext({
                apiType: 'admin',
                isAuthorized: true,
                authorizedAsOwnerOnly: false,
                channel,
                languageCode: LanguageCode.en,
            });

            let findShipping = await this.connection
                .getRepository(ShippingMethod)
                .findOne({
                    where:{
                        code: "bavaan-delhivery"
                    }
                });

            if(!findShipping){
                let shippingMethod = new ShippingMethod({
                    checker: this.shippingConfiguration.parseCheckerInput({
                        code: DelhiveryShippingEligibilityChecker.code,
                        arguments: []
                    }),
                    calculator: this.shippingConfiguration.parseCalculatorInput({
                        code: DelhiveryShippingCalculator.code,
                        arguments: []
                    }),
                    description: "Delhivery Shipping Method",
                    code: "bavaan-delhivery",
                });
                shippingMethod.channels = [channel];
                await this.connection.getRepository(ShippingMethod).save(shippingMethod);
            }
        }
    }

    async registerDefaultWarehouse(){

        let registerInfo = {
            "phone": "8655076261",
            "city": "Mumbai",
            "name": DEFAULT_CHANNEL_CODE,
            "pin": "400097",
            "address": "232 Sai Krupa Society,Malad East Mumbai",
            "country": "India",
            "email": "swarajshopindia@gmail.com",
            "registered_name": DEFAULT_CHANNEL_CODE,
            "return_address": "swarajshopindia@gmail.com",
            "return_pin":"400097",
            "return_city":"Mumbai",
            "return_state":"Maharashtra",
            "return_country": "India"
        };
        try{
            let res = await this.delhiveryApiService.createWarehouse(registerInfo);
            return res;
        } catch (e) {

        }

    }
}