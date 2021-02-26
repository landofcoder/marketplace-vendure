import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, BaseDataService } from '@vendure/admin-ui/core';
import { BaseEntityResolver } from '@vendure/admin-ui/core';

import { GetDelhiveryWarehouse, DelhiveryWarehouse } from '../../generated-types';

import { GET_DELHIVERY_WAREHOUSE } from './delhivery-warehouse-resolver.graphql';
import {Validators} from "@angular/forms";

@Injectable({
    providedIn: 'root',
})
export class DelhiveryWarehouseResolver extends BaseEntityResolver<DelhiveryWarehouse.Fragment> {
    constructor(router: Router, dataService: DataService, private baseDataService: BaseDataService) {
        super(
            router,
            {
                __typename: 'DelhiveryWarehouse',
                id: '',
                createdAt: '',
                updatedAt: '',
                pickup_name: '',
                city: '',
                pincode: '',
                state: '',
                address: '',
                country: '',
                contact_person_name: '',
                contact_person_email: '',
                contact_person_phone: '',
                return_address: '',
                return_pincode: '',
                return_city: '',
                return_state: '',
                return_country: '',
                from_working_hours: '',
                to_working_hours: '',
                day_working_hours: '',
                preferred_pickup_slots: '',
                channelId: '',
            },
            (id) => {
                return this.baseDataService.query<GetDelhiveryWarehouse.Query, GetDelhiveryWarehouse.Variables>(GET_DELHIVERY_WAREHOUSE, {
                    id,
                }).mapStream((data) => data.delhiveryWarehouse);
            },
        );
    }
}
