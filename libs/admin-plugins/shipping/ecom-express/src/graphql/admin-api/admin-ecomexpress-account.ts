import { Args, Mutation, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Permission } from '@vendure/common/lib/generated-types';
import { Allow, Ctx } from "@vendure/core";
import { MutationUpdateEcomExpressConfigArgs} from "../../generated-admin-types";
import {EcomExpressAccount} from "../../entities/ecom-express-account.entity";
import {EcomExpressService} from "../../services/ecom-express.service";

@Resolver()
export class AdminEcomexpressAccount {
    constructor(
        private ecomexpressService : EcomExpressService
    ) {}

    @Query()
    @Allow(Permission.SuperAdmin)
    async ecomexpressAccountConfig(): Promise<EcomExpressAccount | undefined> {
        return this.ecomexpressService.getDefault();
    }

    @Mutation()
    @Allow(Permission.SuperAdmin)
    async updateEcomExpressConfig(@Args() args: MutationUpdateEcomExpressConfigArgs): Promise<EcomExpressAccount> {
        let ecomexpressAccount= await this.ecomexpressService.getDefault();
        if(ecomexpressAccount){
            let inputUpdate = {...ecomexpressAccount, ...args.input}
            return this.ecomexpressService.update(inputUpdate);
        }
        return this.ecomexpressService.create(args.input);
    }
}