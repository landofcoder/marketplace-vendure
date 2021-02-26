import { NgModule } from '@angular/core';
import { SharedModule, createResolveData, detailBreadcrumb, CanDeactivateDetailGuard } from '@vendure/admin-ui/core';
import { RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import {EcomexpressAccountComponent} from "./component/ecomexpress-account/ecomexpress-account.component";

@NgModule({
    imports: [SharedModule,
        MultiSelectModule,
        RouterModule.forChild([
            {
                path: 'ecomexpress/account/configs',
                pathMatch: '',
                component: EcomexpressAccountComponent,
                data: {
                    breadcrumb: marker('ecomexpress_account.breadcrumb'),
                },
            }
        ]),
    ],
    declarations: [
        EcomexpressAccountComponent
    ],
    providers: []
})

export class EcomexpressUiLazyModule {}

