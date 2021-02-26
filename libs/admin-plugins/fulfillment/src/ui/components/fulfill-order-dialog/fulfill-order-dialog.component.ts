import { Order } from '@vendure/core';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
    DataService,
    Dialog,
    GlobalFlag,
    OrderDetail,
    OrderDetailFragment,
} from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FulfillOrderInput } from '../../generated-types';

@Component({
    selector: 'vdr-fulfill-order-dialog',
    templateUrl: './fulfill-order-dialog.component.html',
    styleUrls: ['./fulfill-order-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FulfillOrderDialogComponent implements Dialog<FulfillOrderInput>, OnInit {
    order: Order;
    resolveWith: (result?: FulfillOrderInput) => void;
    method = '';
    trackingCode = '';
    courier = '';
    fulfillmentQuantities: { [lineId: string]: { fulfillCount: number; max: number } } = {};
    packageAmount = 0;
    numberItem  = 0;
    orderId = '' as any;
    orderWeight = 0;
    weightFlag = true;

    constructor(private dataService: DataService, private changeDetector: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.dataService.settings.getGlobalSettings().single$.subscribe(({ globalSettings }) => {
            this.fulfillmentQuantities = this.order.lines.reduce((result, line: any) => {
                const fulfillCount = this.getFulfillableCount(line, globalSettings.trackInventory);
                return {
                    ...result,
                    [line.id]: { fulfillCount, max: fulfillCount },
                };
            }, {});
            this.changeDetector.markForCheck();
            this.order.lines.map((line: any) => {
                if (this.weightFlag == true && line.productVariant.customFields?.weight) {
                    this.orderWeight += parseInt(line.productVariant.customFields?.weight)*parseInt(line.quantity)
                }
                else {
                    this.weightFlag = false
                }
                this.numberItem += parseInt(line.quantity)
            })
        });

        if (this.order.shippingMethod) {
            this.method = this.order.shippingMethod.name;
        }
        this.packageAmount = this.order.total;
        this.orderId = this.order.id;
        let totalWeight = 0;
        // this.order.lines.map(line => {
        //     totalWeight += line.featuredAsset
        // })
    }

    getFulfillableCount(line: OrderDetail.Lines, globalTrackInventory: boolean): number {
        const { trackInventory, stockOnHand } = line.productVariant;
        const effectiveTracInventory =
            trackInventory === GlobalFlag.INHERIT ? globalTrackInventory : trackInventory === GlobalFlag.TRUE;

        const unfulfilledCount = this.getUnfulfilledCount(line);
        return effectiveTracInventory ? Math.min(unfulfilledCount, stockOnHand) : unfulfilledCount;
    }

    getUnfulfilledCount(line: OrderDetail.Lines): number {
        const fulfilled = line.items.reduce((sum, item) => sum + (item.fulfillment ? 1 : 0), 0);
        return line.quantity - fulfilled;
    }

    select() {
        const lines = Object.entries(this.fulfillmentQuantities).map(([orderLineId, { fulfillCount }]) => ({
            orderLineId,
            quantity: fulfillCount,
        }));
        this.resolveWith({
            lines: lines,
            trackingCode: this.trackingCode,
            method: this.method,
            numberItem: this.numberItem,
            orderWeight: this.orderWeight,
            packageAmount: this.packageAmount,
            orderId: this.orderId,
            courier: this.courier
            // numberItem: this.numberItem,
            // orderWeight: parseInt(this.orderWeight),
            // packageAmount:this.packageAmount,
            // orderId: this.orderId
        });
    }

    cancel() {
        this.resolveWith();
    }
    selectMethod(value) {
        console.log(value);
        console.log(this.method)
    }
}
