import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {InjectConnection} from '@nestjs/typeorm';
import {Allow, Ctx, getEntityOrThrow, ListQueryBuilder, patchEntity, Permission, RequestContext} from '@vendure/core';
import {Connection} from 'typeorm';
import {DelhiveryWarehouse} from "../../entities/delhivery-warehouse.entity";
import {
    CreateDelhiveryWarehouseInput,
    MutationCreateDelhiveryWarehouseArgs,
    MutationUpdateDelhiveryWarehouseArgs,
    QueryDelhiveryWarehouseArgs,
    QueryDelhiveryWarehouseByChannelIdArgs,
    QueryDelhiveryWarehouseByPickupNameArgs,
    QueryDelhiveryWarehousesArgs
} from "../../generated-admin-types";
import { VendorDelhiveryApiService } from "@bavaan/vendure-order-vendor-plugin/src/serivces/delhivery-api.sevice";

@Resolver()
export class DelhiveryWarehouseAdminResolver {
    constructor(
        @InjectConnection() private connection: Connection,
        private listQueryBuilder: ListQueryBuilder,
        private delhiveryApiService: VendorDelhiveryApiService,
    ) {}

    @Query()
    @Allow(Permission.ReadPromotion)
    async delhiveryWarehouses(@Ctx() ctx: RequestContext, @Args() args: QueryDelhiveryWarehousesArgs) {
        return this.listQueryBuilder
            .build(DelhiveryWarehouse, args.options || undefined)
            .getManyAndCount()
            .then(([items, totalItems]) => ({
                items,
                totalItems,
            }));
    }

    @Query()
    @Allow(Permission.ReadPromotion)
    async delhiveryWarehouse(@Ctx() ctx: RequestContext, @Args() args: QueryDelhiveryWarehouseArgs) {
        return this.connection.getRepository(DelhiveryWarehouse).findOne(args.id);
    }

    @Query()
    @Allow(Permission.ReadPromotion)
    async delhiveryWarehouseByChannelId(@Ctx() ctx: RequestContext, @Args() args: QueryDelhiveryWarehouseByChannelIdArgs) {
        return this.connection.getRepository(DelhiveryWarehouse).findOne({
            where:{
                channelId: args.input.channelId,
            }
        });
    }

    @Query()
    @Allow(Permission.ReadPromotion)
    async delhiveryWarehouseByPickupName(@Ctx() ctx: RequestContext, @Args() args: QueryDelhiveryWarehouseByPickupNameArgs) {
        return this.connection.getRepository(DelhiveryWarehouse).findOne({
            where:{
                pickup_name: args.input.pickup_name,
            }
        });
    }

    @Mutation()
    @Allow(Permission.CreatePromotion)
    async createDelhiveryWarehouse(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationCreateDelhiveryWarehouseArgs,
    ) {
        let delhiveryWarehouseInput : CreateDelhiveryWarehouseInput = {
            // @ts-ignore
            pickup_name: args.input.pickup_name,
            city: args.input.city,
            pincode: args.input.pincode,
            state: args.input.state,
            address: args.input.address,
            country: args.input.country,
            contact_person_name: args.input.contact_person_name,
            contact_person_email: args.input.contact_person_email,
            contact_person_phone: args.input.contact_person_phone,
            return_address: args.input.return_address,
            return_pincode: args.input.return_pincode,
            return_city: args.input.return_city,
            return_state: args.input.return_state,
            return_country: args.input.return_country,
            from_working_hours: args.input.from_working_hours,
            to_working_hours: args.input.to_working_hours,
            day_working_hours: args.input.day_working_hours,
            preferred_pickup_slots: args.input.preferred_pickup_slots,
            channelId: args.input.channelId,
        };

        let dataCreate = {
            "phone": args.input.contact_person_phone,
            "city": args.input.city,
            "name": args.input.pickup_name,
            "pin": args.input.pincode,
            "address": args.input.address,
            "state": args.input.state,
            "country": args.countryName,
            "email": args.input.contact_person_email,
            "registered_name": args.input.contact_person_name,
            "return_address": args.input.return_address,
            "return_pin": args.input.return_pincode,
            "return_city": args.input.return_city,
            "return_state": args.input.return_state,
            "return_country": args.input.return_country
        };

        let dataEdit = {
            "name": args.input.pickup_name,
            "registered_name": args.input.contact_person_name,
            "address": args.input.address,
            "pin": args.input.pincode,
            "phone": args.input.contact_person_phone
        };

        try{
            let res = await this.delhiveryApiService.createWarehouse(dataCreate);
            if (res) {
                const delhiveryWarehouse = new DelhiveryWarehouse(delhiveryWarehouseInput);
                // @ts-ignore
                return await this.connection.getRepository(DelhiveryWarehouse).save(delhiveryWarehouse);
            }
        } catch (e) {
            console.log("err", e.response.data.error);
            let result = await this.delhiveryApiService.editWarehouse(dataEdit);
            if (result) {
                const delhiveryWarehouse = new DelhiveryWarehouse(delhiveryWarehouseInput);
                // @ts-ignore
                return await this.connection.getRepository(DelhiveryWarehouse).save(delhiveryWarehouse);
            }
        }
    }

    @Mutation()
    @Allow(Permission.UpdatePromotion)
    async updateDelhiveryWarehouse(
        @Ctx() ctx: RequestContext,
        @Args() { input }: MutationUpdateDelhiveryWarehouseArgs,
    ) {
        // @ts-ignore
        const delhiveryWarehouse = await getEntityOrThrow(this.connection, DelhiveryWarehouse, input.id);
        const originalPickupName = delhiveryWarehouse.pickup_name;
        const originalCity = delhiveryWarehouse.city;
        const originalPincode = delhiveryWarehouse.pincode;
        const originalState = delhiveryWarehouse.state;
        const originalAddress = delhiveryWarehouse.address;
        const originalCountry = delhiveryWarehouse.country;
        const originalContactPersonName = delhiveryWarehouse.contact_person_name;
        const originalContactPersonEmail = delhiveryWarehouse.contact_person_email;
        const originalContactPersonPhone = delhiveryWarehouse.contact_person_phone;
        const originalReturnAddress = delhiveryWarehouse.return_address;
        const originalReturnPincode = delhiveryWarehouse.return_pincode;
        const originalReturnCity = delhiveryWarehouse.return_city;
        const originalReturnState = delhiveryWarehouse.return_state;
        const originalReturnCountry = delhiveryWarehouse.return_country;
        const originalFromWorkingHours = delhiveryWarehouse.from_working_hours;
        const originalToWorkingHours = delhiveryWarehouse.to_working_hours;
        const originalDayWorkingHours = delhiveryWarehouse.day_working_hours;
        const originalPreferredPickupSlots = delhiveryWarehouse.preferred_pickup_slots;
        const originalChannelId = delhiveryWarehouse.channelId;
        const updatedDelhiveryWarehouse = patchEntity(delhiveryWarehouse, input as any);
        let isUpdated = false;
        if (input.pickup_name !== originalPickupName) {
            isUpdated = true
        }
        if (input.city !== originalCity) {
            isUpdated = true
        }
        if (input.pincode !== originalPincode) {
            isUpdated = true
        }
        if (input.state !== originalState) {
            isUpdated = true
        }
        if (input.address !== originalAddress) {
            isUpdated = true
        }
        if (input.country !== originalCountry) {
            isUpdated = true
        }
        if (input.contact_person_name !== originalContactPersonName) {
            isUpdated = true
        }
        if (input.contact_person_email !== originalContactPersonEmail) {
            isUpdated = true
        }
        if (input.contact_person_phone !== originalContactPersonPhone) {
            isUpdated = true
        }
        if (input.return_address !== originalReturnAddress) {
            isUpdated = true
        }
        if (input.return_pincode !== originalReturnPincode) {
            isUpdated = true
        }
        if (input.return_city !== originalReturnCity) {
            isUpdated = true
        }
        if (input.return_state !== originalReturnState) {
            isUpdated = true
        }
        if (input.return_country !== originalReturnCountry) {
            isUpdated = true
        }
        if (input.from_working_hours !== originalFromWorkingHours) {
            isUpdated = true
        }
        if (input.to_working_hours !== originalToWorkingHours) {
            isUpdated = true
        }
        if (input.day_working_hours !== originalDayWorkingHours) {
            isUpdated = true
        }
        if (input.preferred_pickup_slots !== originalPreferredPickupSlots) {
            isUpdated = true
        }
        if (input.channelId !== originalChannelId) {
            isUpdated = true
        }
        if(isUpdated){
            updatedDelhiveryWarehouse.updatedAt = new Date();
        }

        let data = {
            "name": delhiveryWarehouse.pickup_name,
            "registered_name": delhiveryWarehouse.contact_person_name,
            "address": delhiveryWarehouse.address,
            "pin": delhiveryWarehouse.pincode,
            "phone": delhiveryWarehouse.contact_person_phone
        };
        try{
            let res = await this.delhiveryApiService.editWarehouse(data);
            if (res){
                return this.connection.getRepository(DelhiveryWarehouse).save(updatedDelhiveryWarehouse);
            }
        } catch (e) {
            console.log("err", e);
            if (e.response.data.detail === 'Invalid token'){
                return e;
            }
        }
    }
}
