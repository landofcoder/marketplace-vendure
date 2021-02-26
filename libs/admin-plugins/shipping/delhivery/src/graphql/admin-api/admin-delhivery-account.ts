import { Args, Mutation, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Permission } from '@vendure/common/lib/generated-types';
import { Allow, Ctx } from "@vendure/core";
import { DelhiveryAccountService } from "../../services";
import { DelhiveryAccount } from "../../entities/delhivery-account.entity";
import { MutationUpdateDelhiveryAccountArgs } from "../../generated-admin-types";

@Resolver()
export class AdminDelhiveryAccount {
    constructor(
        private delhiveryAccountService: DelhiveryAccountService
    ) {}

    @Query()
    @Allow(Permission.SuperAdmin)
    async delhiveryAccount(): Promise<DelhiveryAccount | undefined> {
        return this.delhiveryAccountService.getDefault();
    }

    @Mutation()
    @Allow(Permission.SuperAdmin)
    async updateDelhiveryAccount(@Args() args: MutationUpdateDelhiveryAccountArgs): Promise<DelhiveryAccount> {
        if(args.input?.id){
            return this.delhiveryAccountService.update(args.input);
        }
        return this.delhiveryAccountService.create(args.input);
    }
}