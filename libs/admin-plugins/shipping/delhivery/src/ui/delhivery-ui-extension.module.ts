import { NgModule } from '@angular/core';
import { addNavMenuItem, registerCustomFieldComponent,addNavMenuSection } from '@vendure/admin-ui/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@vendure/admin-ui/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

@NgModule({
    imports: [SharedModule, SharedModule],
    providers: [
        addNavMenuSection({
                id: 'delhivery',
                label: 'Delhivery',
                items: [
                    // {
                    //
                    //     id: 'delhivery-pickup',
                    //     label: 'Pickup',
                    //     routerLink: ['/delhivery/pickup'],
                    //     icon: 'employee',
                    // },
                    {
                        id: 'delhivery-warehouse',
                        label: 'Delhivery Warehouse',
                        routerLink: ['/delhivery/warehouse/create'],
                        icon: 'employee-group',
                    },
                    // {
                    //     id: 'delhivery-account',
                    //     label: 'Delhivery account',
                    //     routerLink: ['/delhivery/account/configs'],
                    //     icon: 'employee',
                    // },
                ],
            },
            'settings'),
        addNavMenuItem(
            {
                id: 'delhivery-account',
                label: 'Delhivery account',
                routerLink: ['/delhivery/account/configs'],
                icon: 'employee',
            },
            'settings',
        ),

    ],
    exports: [],
})

export class DelhiveryUiExtensionModule {}
