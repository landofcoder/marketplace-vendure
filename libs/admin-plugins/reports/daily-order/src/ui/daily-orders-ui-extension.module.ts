import { DailyOrdersSharedModule } from './daily-orders-shared.module';
import { SharedModule, addNavMenuItem, addNavMenuSection } from '@vendure/admin-ui/core';
import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@NgModule({
    imports: [SharedModule, DailyOrdersSharedModule],
    providers: [
        addNavMenuSection({
            id: 'reports',
            label: 'Reports',
            items: [{
                id: 'daily-orders',
                label: 'Daily Orders',
                routerLink: ['/reports/daily-orders'],
                icon: 'cursor-hand-open',
            }],
        },
        'settings'),
    ],
    declarations: [],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DailyOrdersUiExtension {}