import { NgModule } from '@angular/core';
import { addNavMenuItem, registerCustomFieldComponent,addNavMenuSection } from '@vendure/admin-ui/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@vendure/admin-ui/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

@NgModule({
    imports: [SharedModule, SharedModule],
    providers: [
        addNavMenuItem(
            {
                id: 'ecomexpress-account',
                label: 'Ecomexpress account',
                routerLink: ['/ecomexpress/account/configs'],
                icon: 'employee',
            },
            'settings',
        ),

    ],
    exports: [],
})

export class EcomexpressUiExtensionModule {}
