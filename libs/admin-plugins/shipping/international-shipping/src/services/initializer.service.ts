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
import { InternationalShippingEligibilityChecker, InternationalShippingCalculator} from "./international-shipping";
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
                        code: "bavaan-international-shipping"
                    }
                });

            if(!findShipping){
                await this.shippingMethodService.create(ctx, {
                    checker: {
                        code: InternationalShippingEligibilityChecker.code,
                        arguments: [],
                    },
                    calculator: {
                        code: InternationalShippingCalculator.code,
                        arguments: [
                            { name: 'rate', value: '1000' },
                            { name: 'taxRate', value: '0' },
                        ],
                    },
                    code: "bavaan-international-shipping",
                    translations: [{ languageCode: ctx.languageCode, name: "International Shipping Method", description: "International Shipping Method" }],
                });
            }
        }
    }

}