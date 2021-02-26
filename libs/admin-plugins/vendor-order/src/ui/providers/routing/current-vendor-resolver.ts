import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseEntityResolver } from '@vendure/admin-ui/core';
import { DataService, BaseDataService } from '@vendure/admin-ui/core';
import {GetCurrentVendor, VendorDetail, VendorDetailFragment} from "../../generated-types";
import { GET_CURRENT_VENDOR} from "../../components/vendor-detail/vendor-detail.graphql";

@Injectable({
    providedIn: 'root',
})
export class CurrentVendorResolver extends BaseEntityResolver<VendorDetailFragment> {
    constructor(router: Router, dataService: DataService, private baseDataService: BaseDataService) {
        super(
            router,
            {
                __typename: 'Vendor',
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                GSTINID: '',
                state: '',
                ownerName: '',
                ownerEmail: '',
                banks: [],
                contacts:[],
                info:[],
                marketing:[],
                verified: false,
                user: { roles: [] } as any,
            },
            () => {
                return this.baseDataService.query<GetCurrentVendor.Query, GetCurrentVendor.Variables>(GET_CURRENT_VENDOR, {})
                    .mapStream((data) => data.activeVendor);
            },
        );
    }
}
