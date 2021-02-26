import { NgModule } from '@angular/core';
import { SharedModule, createResolveData, detailBreadcrumb, CanDeactivateDetailGuard } from '@vendure/admin-ui/core';
import { RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { DelhiveryAccountComponent } from "./component/delhivery-account/delhivery-account.component";
import { DelhiveryWarehouseComponent } from "./component/delhivery-warehouse/delhivery-warehouse.component";
import { Observable } from "rxjs";
import { GetDelhiveryWarehouse } from "./generated-types";
import { map } from "rxjs/operators";
import { DelhiveryWarehouseResolver } from "./providers/routing/delhivery-warehouse-resolver";
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';

@NgModule({
    imports: [SharedModule,
        MultiSelectModule,
        RouterModule.forChild([
            {
                path: 'delhivery/account/configs',
                pathMatch: 'full',
                component: DelhiveryAccountComponent,
                data: {
                    breadcrumb: marker('delhivery_account.breadcrumb'),
                },
            },
            {
                path: 'delhivery/warehouse/:id',
                pathMatch: '',
                resolve: createResolveData(DelhiveryWarehouseResolver),
                canDeactivate: [CanDeactivateDetailGuard],
                component: DelhiveryWarehouseComponent,
                data: {
                    breadcrumb: delhiveryBreadcrumb
                },
            },
            {
                path: 'delhivery/warehouse/create',
                pathMatch: '',
                component: DelhiveryWarehouseComponent,
                data: {
                    breadcrumb: delhiveryBreadcrumb
                },
            },
        ]),
    ],
    declarations: [
        DelhiveryAccountComponent,
        DelhiveryWarehouseComponent
    ],
    providers: []
})

export class DelhiveryUiLazyModule {}

export function delhiveryBreadcrumb(resolved: { entity: Observable<GetDelhiveryWarehouse.DelhiveryWarehouse> }) {
    return resolved.entity.pipe(
        map(entity => {
            console.log("entity", entity);
            if (entity.pickup_name === ''){
                return [
                    {
                        label: 'Delhivery Warehouse',
                        link: ['/delhivery-warehouse'],
                    },
                    {
                        label: 'Create',
                        link: [],
                    },
                ]
            } else {
                return [
                    {
                        label: 'Delhivery Warehouse',
                        link: ['/delhivery-warehouse'],
                    },
                    {
                        label: `${entity.pickup_name}`,
                        link: [],
                    },
                ]
            }
        }),
    );
}
