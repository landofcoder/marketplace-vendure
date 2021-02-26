import { NgModule } from '@angular/core';
import { SharedModule, createResolveData, detailBreadcrumb, CanDeactivateDetailGuard, Channel } from '@vendure/admin-ui/core';
import { RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { PromotionListComponent } from "./components/promotion-list/promotion-list.component";
import { ShippingMethodListComponent } from "./components/shipping-method-list/shipping-method-list.component";
import { VendorListComponent } from "./components/vendor-list/vendor-list.component";
import {VendorCreateComponent} from "./components/vendor-create/vendor-create.component";
import {VendorDetailComponent} from "./components/vendor-detail/vendor-detail.component";
import {VendorResolver} from "./providers/routing/vendor-resolver";
import {CurrentVendorResolver} from "./providers/routing/current-vendor-resolver";

@NgModule({
    imports: [SharedModule,
        RouterModule.forChild([
            {
                path: 'marketing/promotions',
                component: PromotionListComponent,
                data: {
                    breadcrumb: marker('breadcrumb.promotions'),
                },
            },
            {
                path: 'settings/shipping-methods',
                component: ShippingMethodListComponent,
                data: {
                    breadcrumb: marker('breadcrumb.shipping-methods'),
                },
            },
            {
                path: 'vendor/vendor-management',
                component: VendorListComponent,
                data: { breadcrumb: marker("vendor.vendor-management"), },
            },
            {
                path: 'vendor/create',
                component: VendorCreateComponent,
                data: { breadcrumb: marker("vendor.create"), },
            },
            {
                path: 'vendor/info/:id',
                component: VendorDetailComponent,
                resolve: createResolveData(VendorResolver),
                canDeactivate: [CanDeactivateDetailGuard],
                data: { breadcrumb: marker("vendor.info"), },
            },
            {
                path: 'vendor/info',
                component: VendorDetailComponent,
                resolve: createResolveData(CurrentVendorResolver),
                canDeactivate: [CanDeactivateDetailGuard],
                data: { breadcrumb: marker("vendor.info"), },
            },
        ]),
    ],
    declarations: [
        PromotionListComponent,
        ShippingMethodListComponent,
        VendorListComponent,
        VendorCreateComponent,
        VendorDetailComponent
    ],
    providers: [VendorResolver]
})

export class VendorOrderUiLazyModule {}
