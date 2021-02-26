import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {InjectConnection} from '@nestjs/typeorm';
import {Allow, Ctx, getEntityOrThrow, ListQueryBuilder, patchEntity, Permission, RequestContext} from '@vendure/core';
import {Connection} from 'typeorm';
import {Pincode} from '../entities/pincode.entity';
import {
    MutationCreatePincodeArgs,
    MutationUpdatePincodeArgs,
    QueryCheckPincodeArgs,
    QueryPincodeArgs,
    QueryPincodesArgs,
    CreatePincodeInput,
} from '../generated-admin-types';

@Resolver()
export class PincodeAdminResolver {
    constructor(
        @InjectConnection() private connection: Connection,
        private listQueryBuilder: ListQueryBuilder,
    ) {}

    @Query()
    @Allow(Permission.ReadPromotion)
    async pincodes(@Ctx() ctx: RequestContext, @Args() args: QueryPincodesArgs) {
        return this.listQueryBuilder
            .build(Pincode, args.options || undefined)
            .getManyAndCount()
            .then(([items, totalItems]) => ({
                items,
                totalItems,
            }));
    }

    @Query()
    @Allow(Permission.ReadPromotion)
    async pincode(@Ctx() ctx: RequestContext, @Args() args: QueryPincodeArgs) {
        return this.connection.getRepository(Pincode).findOne(args.id);
    }

    @Query()
    @Allow(Permission.ReadPromotion)
    async checkPincode(@Ctx() ctx: RequestContext, @Args() args: QueryCheckPincodeArgs) {
        return this.connection.getRepository(Pincode).findOne({
            where:{
                pincode: args.input.pincode
            }
        })
    }

    @Mutation()
    @Allow(Permission.CreatePromotion)
    async createPincode(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationCreatePincodeArgs,
    ) {
        let pincodeInput : CreatePincodeInput = {
            // @ts-ignore
            pincode: parseInt(args.input.pincode),
            state: args.input.state,
            district: args.input.district,
            prepaid: args.input.prepaid,
            cod: args.input.cod,
            pickup: args.input.pickup,
            cash: args.input.cash,
            repl: args.input.repl
        }
        const pincode = new Pincode(pincodeInput);
        // @ts-ignore
        const pincodeObject = await this.connection.getRepository(Pincode).save(pincode);
        return pincodeObject;
    }

    @Mutation()
    @Allow(Permission.DeletePromotion)
    async deletePincode(
        @Ctx() ctx: RequestContext,
        @Args() args: QueryPincodeArgs
    ) {
        const pincodeObject = await this.connection.getRepository(Pincode).findOne(args.id);
        if(pincodeObject){
            // @ts-ignore
            await this.connection.getRepository(Pincode).remove(pincodeObject);
            return {error: "false", message: "Delete the pincode successfully!"};
        }
        return {error: "true", message: "Can not found pincode record to delete. Please try again!"};
    }

    @Mutation()
    @Allow(Permission.UpdatePromotion)
    async updatePincode(
        @Ctx() ctx: RequestContext,
        @Args() { input }: MutationUpdatePincodeArgs,
    ) {
        // @ts-ignore
        const pincode = await getEntityOrThrow(this.connection, Pincode, input.id);
        const originalPincode = pincode.pincode;
        const originalState = pincode.state;
        const originalDistrict = pincode.district;
        const originalPrepaid = pincode.prepaid;
        const originalCod = pincode.cod;
        const originalPickup = pincode.pickup;
        const originalCash = pincode.cash;
        const originalRepl = pincode.repl;
        const updatedPincode = patchEntity(pincode, input as any);
        let isUpdated = false;
        if (input.pincode !== originalPincode) {
            isUpdated = true
        }
        if (input.state !== originalState) {
            isUpdated = true
        }
        if (input.district !== originalDistrict) {
            isUpdated = true
        }
        if (input.prepaid !== originalPrepaid) {
            isUpdated = true
        }
        if (input.cod !== originalCod) {
            isUpdated = true
        }
        if (input.pickup !== originalPickup) {
            isUpdated = true
        }
        if (input.cash !== originalCash) {
            isUpdated = true
        }
        if (input.repl !== originalRepl) {
            isUpdated = true
        }
        if(isUpdated){
            updatedPincode.updatedAt = new Date();
        }
        return this.connection.getRepository(Pincode).save(updatedPincode);
    }
}
