import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import {
    Channel,
    LanguageCode,
    RequestContext,
    ShippingMethod,
    ShippingMethodService,
    TransactionalConnection
} from "@vendure/core";
import { DomesticShippingEligibilityChecker, DomesticShippingCalculator} from "./domestic-shipping";
import { DEFAULT_CHANNEL_CODE } from "@vendure/common/lib/shared-constants";

@Injectable()
export class InitializerService implements OnModuleInit {

    constructor(
        private connection: TransactionalConnection,
        private shippingMethodService: ShippingMethodService
    ) {
    }

    onModuleInit() {
        this.initShippingMethod();
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
                        code: "bavaan-domestic-shipping"
                    }
                });

            if(!findShipping){
                await this.shippingMethodService.create(ctx, {
                    checker: {
                        code: DomesticShippingEligibilityChecker.code,
                        arguments: [],
                    },
                    calculator: {
                        code: DomesticShippingCalculator.code,
                        arguments: [
                            { name: 'itemWeight', value: '500' },
                            { name: 'firstItemWeight', value: '80' },
                            { name: 'addedItemWeight', value: '60' },
                            { name: 'firstItemRate', value: '100' },
                            { name: 'addedItemRate', value: '80' }
                        ],
                    },
                    code: "bavaan-domestic-shipping",
                    translations: [{ languageCode: ctx.languageCode, name: "Domestic Shipping Method", description: "Domestic Shipping Method" }],
                });
            }
        }
    }

}