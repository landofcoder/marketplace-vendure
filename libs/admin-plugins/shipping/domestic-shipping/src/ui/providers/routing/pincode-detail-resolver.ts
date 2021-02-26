import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, BaseDataService } from '@vendure/admin-ui/core';
import { BaseEntityResolver } from '@vendure/admin-ui/core';

import { GetPincode, Pincode } from '../../generated-types';

import { GET_PINCODE } from './pincode-detail-resolver.graphql';

@Injectable({
    providedIn: 'root',
})
export class PincodeDetailResolver extends BaseEntityResolver<Pincode.Fragment> {
    constructor(router: Router, dataService: DataService, private baseDataService: BaseDataService) {
        super(
            router,
            {
                __typename: 'Pincode',
                id: '',
                createdAt: '',
                updatedAt: '',
                pincode: 0,
                state: '',
                district: '',
                prepaid: true,
                cod: true,
                pickup: true,
                cash: true,
                repl: true
            },
            (id) => {
                return this.baseDataService.query<GetPincode.Query, GetPincode.Variables>(GET_PINCODE, {
                    id,
                }).mapStream((data) => data.pincode);
            },
        );
    }
}
