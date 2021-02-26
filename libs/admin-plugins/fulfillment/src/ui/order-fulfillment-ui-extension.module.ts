import { NgModule } from '@angular/core';
import { SharedModule, addNavMenuItem } from '@vendure/admin-ui/core';

@NgModule({
    imports: [SharedModule],
    providers: [
        // addNavMenuItem({
        //     id: 'reutrn-orders',
        //     label: 'Return Orders',
        //     routerLink: ['/orders/return'],
        //     icon: 'cusor-hand-open',
        // },'sales'),
    ],
    declarations: [
        
    ],
    exports: [],
})
export class OrderFulfillmentUiExtensionModule { }
