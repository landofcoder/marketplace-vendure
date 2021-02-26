import { NgModule } from '@angular/core';
import { addNavMenuItem, SharedModule } from '@vendure/admin-ui/core';

@NgModule({
    imports: [SharedModule],
    providers: [
        addNavMenuItem(
            {
                id: 'subscribers',
                label: 'Subscribers',
                routerLink: ['/subscribers'],
                icon: 'star',
            },
            'marketing',
        ),
        addNavMenuItem(
            {
                id: 'newsletters',
                label: 'Newsletters',
                routerLink: ['/newsletters'],
                icon: 'star',
            },
            'marketing',
        ),
    ],
    exports: [],
})
export class NewsletterUiExtensionModule {}
