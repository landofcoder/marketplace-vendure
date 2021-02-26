// project/ui-extensions/greeter.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@vendure/admin-ui/core';
import { PrintOrderDetailComponent } from './print-order-detail/print-order-detail.component';
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: 'orders/:id/print-order-detail', component: PrintOrderDetailComponent,
  },
];

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class PrintOrderDetailUiLazyModule {}
