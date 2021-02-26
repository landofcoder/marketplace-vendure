import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import { InjectConnection } from '@nestjs/typeorm';
import {
    Ctx,
    RequestContext, ShippingMethod
} from '@vendure/core';
import { Connection } from 'typeorm';
import { Pincode } from '../entities/pincode.entity';
import {QueryCheckPincodeArgs} from "../generated-shop-types";

@Resolver()
export class PincodeShopResolver {
    constructor(
        @InjectConnection() private connection: Connection
    ) {}


    @Query()
    async checkPincode(@Ctx() ctx: RequestContext, @Args() args: QueryCheckPincodeArgs) {
        let check = await this.connection.getRepository(Pincode).findOne({
            where: {
                pincode: args.input.pincode
            }
        });
        if(check) {

            let findShipping = await this.connection
                .getRepository(ShippingMethod)
                .findOne({
                    where:{
                        code: "bavaan-domestic-shipping"
                    }
                });

            if (findShipping && args.input.productWeight){
                let checker: any = {};
                let caculator = findShipping.calculator.args;
                for (let obj of caculator){
                    checker[obj.name] = obj.value;
                }

                return{
                    status: "success",
                    data: {
                        price: (checker.firstItemWeight + (args.input.productWeight / checker.itemWeight)* checker.addedItemWeight) * 100,
                        label: "Delivery in 2 - 4 days",
                        pincode: check
                    }
                }

            }

            return {
                status: "success",
                data: {
                    price: 50000,
                    label: "Delivery in 2 - 4 days",
                    pincode: check
                }
            }
        } else {
            return {
                status: "error",
                data: {
                    message: "Cannot found pincode"
                }
            }
        }
    }
}
