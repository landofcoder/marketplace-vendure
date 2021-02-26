import { NgModule } from '@angular/core';
import { addNavMenuItem, SharedModule } from '@vendure/admin-ui/core';

@NgModule({
    imports: [SharedModule],
    providers: [
        addNavMenuItem(
            {
                id: 'pincodes',
                label: 'Pincodes',
                routerLink: ['/pincodes/pincode-management'],
                icon: 'map-marker',
            },
            'settings',
        ),
    ],
    exports: [],
})
export class PincodeUiExtensionModule {}
