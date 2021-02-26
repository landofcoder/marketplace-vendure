import {OnInit, Component, Input} from '@angular/core';
import { Observable } from 'rxjs';
import {
    BaseDetailComponent,
    DataService,
    NotificationService,
    ServerConfigService,
} from '@vendure/admin-ui/core';
import {ActivatedRoute} from "@angular/router";

export function test(this: any) {
    this.printOrderDetail()
}

@Component({
    selector: 'vdr-print-order-detail',
    templateUrl: './print-order-detail.component.html',
    styleUrls: ['./print-order-detail.component.scss']
})
// @ts-ignore
export class PrintOrderDetailComponent extends BaseDetailComponent<>
    implements OnInit {
    // @ts-ignore
    @Input('order-id') idOrder: string;
    title = 'angular-print-service';
    // @ts-ignore
    entity$: Observable<any> | undefined;
    orderId: any;
    formatter: any;
    private currencyCode: any;
    metadata : string;

    constructor(
        serverConfigService: ServerConfigService,
        protected dataService: DataService,
        private notificationService: NotificationService,
        private route: ActivatedRoute,
    ) {
        super(serverConfigService, dataService);
    }

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap) => {
            this.orderId = paramMap.get("id");
            if (this.orderId) {
                this.entity$ = this.dataService.order.getOrder(this.orderId).mapStream(data=>data.order);
            }else{
                if (this.idOrder){
                    this.entity$ = this.dataService.order.getOrder(this.idOrder).mapStream(data=>data.order);
                }
            }
        })
    }

    keyValue (input) {
        Object.entries(input).forEach(([key,value]) => {
            console.log(key, value);
            this.metadata = key + ": " + value;
        })
        return this.metadata;
    }

    formatterConvertCurrency(currencyCode: any) {
        let locales = "";
        switch (currencyCode) {
            case "USD":
                locales = "en-US";
                break;
            case "INR":
                locales = "hi-IN";
                break;
            default:
                locales = "en-US";
        }
        if (currencyCode) {
            this.currencyCode = currencyCode;
            this.formatter = {
                format: (price: number) => {
                    return Intl.NumberFormat(locales, {
                        style: "currency",
                        currency: currencyCode,
                    }).format(price / 100);
                },
            };
        }
    }
}

