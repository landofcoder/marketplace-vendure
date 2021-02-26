import { NgModule } from '@angular/core';
import { addNavMenuItem, registerCustomFieldComponent,addNavMenuSection } from '@vendure/admin-ui/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@vendure/admin-ui/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

@NgModule({
    imports: [SharedModule, SharedModule],
    providers: [
        addNavMenuSection({
                id: 'vendors',
                label: 'vendors',
                items: [
                    {
                        id: 'vendor-managements',
                        label: 'Vendor Managements',
                        routerLink: ['/vendor/vendor-management'],
                        icon: 'employee-group',
                    },
                    {

                        id: 'vendor-info',
                        label: 'Vendor Info',
                        routerLink: ['/vendor/info'],
                        icon: 'employee',
                    }
                ],
            },
            'settings'),

    ],
    exports: [],
})

export class VendorOrderUiExtensionModule {}
