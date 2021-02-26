import { OnInit, OnDestroy, Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PRINT_ORDER_DETAIL } from "./print-order-detail.graphql";
// @ts-ignore
import {GetPrintOrderDetail, OrderFragment} from "../generated-types";
import {
    DataService,
    NotificationService,
    ServerConfigService,
} from '@vendure/admin-ui/core';
const htmlToPdfmake = require("html-to-pdfmake");
const pdfMake = require("pdfmake/build/pdfmake");
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-print-order-detail',
    templateUrl: './print-order-detail.component.html',
    styleUrls: ['./print-order-detail.component.scss']
})
// @ts-ignore
export class PrintOrderDetailComponent implements OnInit, OnDestroy {
    title = 'angular-print-service';
    // @ts-ignore
    // entity$: Observable<any> | undefined;
    orderDetail: OrderFragment | undefined | null;
    orderSubTotal: any;
    lines: any;
    shippingMethod: any;
    shippingDescription: any;
    shippingWithTax: any;
    orderTotal: any;
    formatter: any;
    customer : any;
    public tests: any;
    billingAddress : any;
    shippingAddress: any;
    private currencyCode: any;
    private onDestroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        serverConfigService: ServerConfigService,
        protected dataService: DataService,
        private notificationService: NotificationService,
        private readonly route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.tests = [1,2,3,4,5];
        this.route.params.pipe(takeUntil(this.onDestroy$)).subscribe((params: any) => {
            const { id } = params;
            this.dataService
                .query<GetPrintOrderDetail.Query, GetPrintOrderDetail.Variables>(
                    PRINT_ORDER_DETAIL,
                    {
                        id: id,
                    },
                )
                .mapStream((data) => data.order)
                .subscribe(x => {
                    if (x){
                        this.orderDetail = x;
                        this.formatterConvertCurrency(x.currencyCode);
                        this.lines = x.lines;
                        this.orderSubTotal = x.subTotal;
                        this.shippingMethod = x.shippingMethod;
                        if (this.shippingMethod){
                            this.shippingDescription = this.shippingMethod.description;
                        }
                        this.shippingWithTax = x.shippingWithTax;
                        this.orderTotal = x.total;
                        this.customer = x.customer;
                        this.shippingAddress = x.shippingAddress;
                        this.billingAddress = x.billingAddress;
                    }
                })
        });
    }

    ngOnDestroy() {
        this.onDestroy$.next(true);
        this.onDestroy$.complete();
    }

    log(thing) {
        console.log("asdasda", thing);
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

