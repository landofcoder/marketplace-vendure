import { NgModule } from '@angular/core';
import { SharedModule, createResolveData, detailBreadcrumb, CanDeactivateDetailGuard } from '@vendure/admin-ui/core';
import { RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { ShippingCountryListComponent } from "./shipping-country-list/shipping-country-list.component";
import { ShippingCountryDetailComponent } from './shipping-country-detail/shipping-country-detail.component';
import { ShippingCountryResolver } from './provider/shipping-country-resolver';

@NgModule({
    imports: [SharedModule,
        RouterModule.forChild([
            {
                path: 'international-shipping/price',
                pathMatch: '',
                component: ShippingCountryListComponent,
                data: {
                    breadcrumb: marker('international_shipping.breadcrumb'),
                },
            },
            {
                path: 'international-shipping/price/:id',
                component: ShippingCountryDetailComponent,
                resolve: createResolveData(ShippingCountryResolver),
                canDeactivate: [CanDeactivateDetailGuard],
                data: {
                    breadcrumb: marker('international_shipping.breadcrumb'),
                },
            }
        ]),
    ],
    declarations: [
        ShippingCountryListComponent,
        ShippingCountryDetailComponent
    ],
    providers: []
})


export class InternationalUiLazyModule {}

