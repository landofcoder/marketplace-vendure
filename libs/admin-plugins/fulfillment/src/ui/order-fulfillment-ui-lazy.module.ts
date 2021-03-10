import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from "@vendure/admin-ui/core";
import { marker } from "@biesbjerg/ngx-translate-extract-marker";
import { FormsModule } from "@angular/forms";
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { OrderListComponent } from "./components/order-list/order-list.component";
import { OrderDetailPopupComponent } from "./components/order-detail/order-detail.component";
import {FulfillOrderDialogComponent} from "./components/fulfill-order-dialog/fulfill-order-dialog.component";
import {LineFulfillmentComponent} from "./components/line-fulfillment/line-fulfillment.component";
import {LineRefundsComponent} from "./components/line-refunds/line-refunds.component";
import {CancelOrderDialogComponent} from "./components/cancel-order-dialog/cancel-order-dialog.component";
import {RefundStateLabelComponent} from "./components/refund-state-label/refund-state-label.component";
import {SettleRefundDialogComponent} from "./components/settle-refund-dialog/settle-refund-dialog.component";
import {OrderHistoryComponent} from "./components/order-history/order-history.component";
import {OrderPaymentCardComponent} from "./components/order-payment-card/order-payment-card.component";
import {OrderCustomFieldsCardComponent} from "./components/order-custom-fields-card/order-custom-fields-card.component";
import {PaymentDetailComponent} from "./components/payment-detail/payment-detail.component";
import {OrderProcessNodeComponent} from "./components/order-process-graph/order-process-node.component";
import {OrderProcessGraphComponent} from "./components/order-process-graph/order-process-graph.component";
import {FulfillmentDetailComponent} from "./components/fulfillment-detail/fulfillment-detail.component";
import {PaymentStateLabelComponent} from "./components/payment-state-label/payment-state-label.component";
import {SimpleItemListComponent} from "./components/simple-item-list/simple-item-list.component";
import {OrderProcessEdgeComponent} from "./components/order-process-graph/order-process-edge.component";
import { OrderProcessGraphDialogComponent } from './components/order-process-graph-dialog/order-process-graph-dialog.component';
import {FulfillmentStateLabelComponent} from "./components/fulfillment-state-label/fulfillment-state-label.component";
import {FulfillmentCardComponent} from "./components/fulfillment-card/fulfillment-card.component";
import { RefundOrderDialogComponent } from './components/refund-order-dialog/refund-order-dialog.component';
import {PrintOrderDetailComponent} from "./components/print-invoice/print-order-detail.component";
import {PackingSlipComponent} from "./components/print-packing-slip/packing-slip.component";
import {OrderListLinesComponent} from "./components/order-list/order-list-lines/order-list-lines.component";

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        NgxDaterangepickerMd.forRoot(),
        RouterModule.forChild([
            {
                path: 'orders',
                pathMatch: 'full',
                component: OrderListComponent,
                data: {breadcrumb: marker('breadcrumb.orders')},
            },
            {
                path: 'orders/:id',
                pathMatch: '',
                component: OrderDetailPopupComponent,
                data: {breadcrumb: marker('breadcrumb.orders'),},
            }
        ]),
    ],
    declarations: [
        OrderListComponent,
        OrderDetailPopupComponent,
        FulfillOrderDialogComponent,
        LineFulfillmentComponent,
        RefundOrderDialogComponent,
        CancelOrderDialogComponent,
        PaymentStateLabelComponent,
        LineRefundsComponent,
        OrderPaymentCardComponent,
        RefundStateLabelComponent,
        SettleRefundDialogComponent,
        OrderHistoryComponent,
        FulfillmentDetailComponent,
        PaymentDetailComponent,
        SimpleItemListComponent,
        OrderCustomFieldsCardComponent,
        OrderProcessGraphComponent,
        OrderProcessNodeComponent,
        OrderProcessEdgeComponent,
        OrderProcessGraphDialogComponent,
        FulfillmentStateLabelComponent,
        FulfillmentCardComponent,
        PrintOrderDetailComponent,
        PackingSlipComponent,
        OrderListLinesComponent,
    ],
    providers: [
    ]
})
export class OrderFulfillmentUiLazyModule { }