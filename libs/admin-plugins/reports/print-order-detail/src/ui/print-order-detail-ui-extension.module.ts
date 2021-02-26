import { NgModule } from '@angular/core';
import {SharedModule, addNavMenuSection, addActionBarItem, OnClickContext} from '@vendure/admin-ui/core';

@NgModule({
  imports: [SharedModule],
  providers: [
    // addActionBarItem({
    //   id: 'print-pdf',
    //   label: 'Print Pdf',
    //   locationId: 'order-detail',
    //   buttonStyle: 'outline',
    //   requiresPermission: 'SuperAdmin',
    //   //routerLink: ['/admin/orders/print-order-detail/:id'],
    //   onClick: (event: MouseEvent, context: OnClickContext) => {
    //       console.log('---------event ------', event);
    //       console.log('---------context ------', context);
    //     // @ts-ignore
    //     // let TestComponent = new PrintOrderDetailComponent();
    //     // TestComponent.printOrderDetail(event.view.location.pathname.slice(14))
    //   }
    // }),
  ]
})
export class PrintOrderDetailUiExtensionModule {}