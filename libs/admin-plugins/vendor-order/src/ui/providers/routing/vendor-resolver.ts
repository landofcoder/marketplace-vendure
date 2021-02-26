import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseEntityResolver } from '@vendure/admin-ui/core';
import { DataService, BaseDataService } from '@vendure/admin-ui/core';
import {GetVendorById, VendorDetail, VendorDetailFragment} from "../../generated-types";
import {GET_VENDOR_BY_ID} from "../../components/vendor-detail/vendor-detail.graphql";

@Injectable({
    providedIn: 'root',
})
export class VendorResolver extends BaseEntityResolver<VendorDetailFragment> {
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
                user: { roles: []} as any,
            },
            (id) => {
                return this.baseDataService.query<GetVendorById.Query, GetVendorById.Variables>(GET_VENDOR_BY_ID, {
                    id,
                }).mapStream((data) => data.getVendorByID);
            },
        );
    }
}
