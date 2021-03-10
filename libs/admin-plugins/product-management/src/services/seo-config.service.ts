import { Injectable, OnModuleInit } from '@nestjs/common';
import {
    assertFound,
    ID,
    patchEntity,
    TransactionalConnection
} from '@vendure/core';

import { SeoConfigInput } from "../generated-admin-types";
import { SeoConfig } from "../entities/seo-config.entity";

@Injectable()
export class SEOConfigService implements OnModuleInit {
    constructor(
        private connection: TransactionalConnection,
    ) {

    }
    onModuleInit() {
        this.initDefaultSEOPage();
    }
    async getDefault(): Promise<SeoConfig | undefined> {
        let result = await this.connection
            .getRepository(SeoConfig)
            .findOne();

        return result;

    }

    async create(input: SeoConfigInput): Promise <SeoConfig> {
        const seoConfig = new SeoConfig(input);
        let result = await this.connection.getRepository(SeoConfig).save(seoConfig);
        return result

    }

    async update(input: any): Promise <SeoConfig> {
        if (input?.id) {
            return this.connection.getRepository(SeoConfig).save(input, {reload: true});

        } else {
            throw new Error("Check input params");
        }
    }

    private async initDefaultSEOPage(){
        let defaultConfig = await this.getDefault();
        if(!defaultConfig){
            let config: SeoConfigInput = {
                title: 'swarajshop',
                titleTemplate: 'SEO | %s',
                description: 'This is the swarajshop page',
                url: 'http://162.243.171.34:9000/',
                site_name: 'swarajshop page'
            }
            this.create(config);
        }
    }

}
