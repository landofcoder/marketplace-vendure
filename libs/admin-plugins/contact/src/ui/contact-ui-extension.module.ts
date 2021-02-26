import { NgModule } from '@angular/core';
import { addNavMenuItem, registerCustomFieldComponent, SharedModule } from '@vendure/admin-ui/core';
import { AllContactListComponent } from './components/all-contact-list/all-contact-list.component';

@NgModule({
    imports: [SharedModule],
    providers: [
        addNavMenuItem(
            {
                id: 'contacts',
                label: 'Contacts',
                routerLink: ['/contacts'],
                icon: 'star',
            },
            'marketing',
        ),
    ],
    exports: [],
})
export class ContactUiExtensionModule {}
