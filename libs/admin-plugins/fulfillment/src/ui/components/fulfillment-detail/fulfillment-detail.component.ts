import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {BaseDataService, NotificationService, OrderDetail} from '@vendure/admin-ui/core';
import {GetPackingSlip, PackingSlip} from "../../generated-types";
import { GET_PACKING_SLIP } from "../order-detail/order_detail.graphql";

@Component({
    selector: 'vdr-fulfillment-detail',
    templateUrl: './fulfillment-detail.component.html',
    styleUrls: ['./fulfillment-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FulfillmentDetailComponent implements OnInit{
    @Input() fulfillmentId: string;
    @Input() order: OrderDetail.Fragment;
    packing_slip: PackingSlip = {};
    _notificationService: NotificationService;
    fulfillmentInfo: OrderDetail.Fulfillments | undefined;

    constructor(
        private baseDataService: BaseDataService,
        notificationService: NotificationService,
    ){
        this._notificationService = notificationService;
    }

    ngOnInit() {
        // this.fulfillmentInfo = this.order.fulfillments.find(f => f.id === this.fulfillmentId);
        // if(this.fulfillmentInfo.trackingCode){
        //     this.baseDataService.query<GetPackingSlip.Query, GetPackingSlip.Variables>(GET_PACKING_SLIP, {
        //         trackingCode: this.fulfillmentInfo.trackingCode
        //     }).single$.subscribe(result=> {
        //         if (result.getPackingSlip?.pin) {
        //             this.packing_slip = result.getPackingSlip;
        //             console.log("packing_slip", this.packing_slip);
        //         } else {
        //             this._notificationService.error("Get Packing slip error");
        //         }
        //     })
        // }
    }

    get fulfillment(): OrderDetail.Fulfillments | undefined | null {
        return this.order.fulfillments && this.order.fulfillments.find(f => f.id === this.fulfillmentId);
    }

    get items(): Array<{ name: string; quantity: number }> {
        const itemMap = new Map<string, number>();
        for (const line of this.order.lines) {
            for (const item of line.items) {
                if (item.fulfillment && item.fulfillment.id === this.fulfillmentId) {
                    const count = itemMap.get(line.productVariant.name);
                    if (count != null) {
                        itemMap.set(line.productVariant.name, count + 1);
                    } else {
                        itemMap.set(line.productVariant.name, 1);
                    }
                }
            }
        }
        return Array.from(itemMap.entries()).map(([name, quantity]) => ({ name, quantity }));
    }

    getCustomFields(): Array<{ key: string; value: any }> {
        const customFields = (this.fulfillment as any).customFields;
        if (customFields) {
            return Object.entries(customFields)
                .filter(([key]) => key !== '__typename')
                .map(([key, value]) => ({ key, value: (value as any)?.toString() ?? '-' }));
        } else {
            return [];
        }
    }
}
