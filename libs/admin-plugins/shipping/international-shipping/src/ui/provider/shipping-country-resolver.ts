import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseEntityResolver } from '@vendure/admin-ui/core';
import { DataService, BaseDataService } from '@vendure/admin-ui/core';
import { ShippingCountry, ShippingCountryPrice } from '../generated-types';
import { GET_SHIPPING_COUNTRY } from '../shipping-country-detail/shipping-country-detail.graphql';

/**
 * Resolves the id from the path into a Customer entity.
 */
@Injectable({
    providedIn: 'root',
})
export class ShippingCountryResolver extends BaseEntityResolver<ShippingCountryPrice> {
    constructor(router: Router, dataService: DataService, private baseDataService: BaseDataService) {
        super(
            router,
            {
                id: '',
                country_code: '',
                country_name: '',
                price: 0
            },
            id => this.baseDataService.query<ShippingCountry.Query, ShippingCountry.Variables>(GET_SHIPPING_COUNTRY, {
                id,
            }).mapStream((data) => data.shippingCountry),
        );
        }  
    }