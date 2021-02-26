import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    SimpleChanges,
    OnDestroy,
    OnInit,
    OnChanges,
    ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { OrderDetailComponent } from '@vendure/admin-ui/order';
import { LanguageCode } from '@vendure/core';
import { combineLatest, Observable, of } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, switchMap, takeUntil, take, tap } from 'rxjs/operators';
import {
    DataService,
    ModalService,
    NotificationService,
    ServerConfigService,
    GetOrderQuery,
    BaseDataService,
    Order,
    OrderDetail
} from '@vendure/admin-ui/core';
import { GET_PACKING_SLIP, GET_ORDER_DETAIL, ADD_FULFILLMENT_TO_ORDER, CREATE_FULFILLMENT_ORDER } from "./order_detail.graphql";
import {
    GetOrderDetail, PackingSlip, GetPackingSlip,
    FulfillOrderInput, AddFulfillmentToOrder, FulfillOrder, FulfillOrderMutation
} from "../../generated-types";
import { FulfillOrderDialogComponent } from '../fulfill-order-dialog/fulfill-order-dialog.component';

@Component({
    selector: 'vdr-order-detail-popup',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class OrderDetailPopupComponent extends OrderDetailComponent implements OnChanges {
    @Input('order-id') orderId: string;

    entity$: Observable<any>;
    packing_slip: Observable<PackingSlip | {} | null | undefined >;
    tracking_code: any;
    fulfilmentMethod: any;

    _modalService: ModalService;
    _notificationService: NotificationService;
    _changeDetector: ChangeDetectorRef;

    constructor(
        router: Router,
        route: ActivatedRoute,
        serverConfigService: ServerConfigService,
        changeDetector: ChangeDetectorRef,
        dataService: DataService,
        notificationService: NotificationService,
        modalService: ModalService,
        private baseDataService: BaseDataService,
    ) {
        super(router, route, serverConfigService, changeDetector, dataService, notificationService, modalService);
        this._modalService = modalService;
        this._notificationService = notificationService;
        this._changeDetector = changeDetector;
    }

    init() { }
    ngOnInit() {
        if (this.orderId) {
            this.id = this.orderId;
        } else {
            this.id = this.route.snapshot.paramMap.get('id') || '';
        }

        this.entity$ = this.dataService.query(GET_ORDER_DETAIL, {
            orderId: this.id
        }).mapStream((data: any) => {
            if (data && data.order && data.order.fulfillments && data.order.fulfillments[0]) {
                this.tracking_code = data.order.fulfillments[0].trackingCode;
                this.fulfilmentMethod = data.order.fulfillments[0].method;
            }
            if(this.tracking_code && this.fulfilmentMethod === "delhivery_shipping_method"){
                this.packing_slip = this.baseDataService.query<GetPackingSlip.Query, GetPackingSlip.Variables>(GET_PACKING_SLIP, {
                    trackingCode: this.tracking_code
                }).mapStream(o=>o.getPackingSlip).pipe();

                //     .subscribe(result=> {
                //     if (result.getPackingSlip?.pin) {
                //         this.packing_slip = result.getPackingSlip;
                //         console.log("packing_slip", this.packing_slip);
                //     } else {
                //         this._notificationService.error("Get Packing slip error");
                //     }
                // })
            }
            return data.order
        });

        this.isNew$ = this.entity$.pipe(
            map((entity) => entity.id === ''),
            shareReplay(1),
        );
        this.languageCode$ = this.route.paramMap.pipe(
            map((paramMap) => paramMap.get('lang')),
            switchMap((lang) => {
                if (lang) {
                    return of(lang as LanguageCode);
                } else {
                    return this.dataService.settings
                        .getActiveChannel()
                        .mapSingle((data) => data.activeChannel.defaultLanguageCode);
                }
            }),
            distinctUntilChanged(),
            shareReplay(1),
        );

        combineLatest(this.entity$, this.languageCode$)
            .pipe(takeUntil(this.destroy$))
            .subscribe(([order, languageCode]) => {
                this.setFormValues(order);
                this.detailForm.markAsPristine();
            });
        super.ngOnInit();
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log('---------changes', changes);
        this.ngOnInit();
    }


    ngOnDestroy() {
        this.destroy();
    }

    printInvoice(){
        const el: HTMLElement | null = document.getElementById('print-pdf');
        console.log(el);
        if(el){
            el.style.visibility = "visible";
            document.getElementsByTagName("body")[0].style.visibility = "hidden";
            window.print();

            el.style.visibility = "hidden";
            document.getElementsByTagName("body")[0].style.visibility = "visible";
        }
    }

    packOrder() {
        this.entity$
            .pipe(
                take(1),
                switchMap(order => {
                    return this._modalService.fromComponent(FulfillOrderDialogComponent, {
                        size: 'xl',
                        locals: {
                            order,
                        },
                    });
                }),
                switchMap((input: FulfillOrderInput | any) => {
                    if (input) {
                        return this.dataService.mutate<FulfillOrder.Mutation, FulfillOrder.Variables>(CREATE_FULFILLMENT_ORDER, {
                            input: input
                        })
                    } else {
                        return of(undefined);
                    }
                }),
                switchMap(result => this.recallOrder(result)),
                // switchMap((result: FulfillOrder | any) => {
                //     if (result) {
                //         this.recallOrder(result.fulfillOrder)
                //     }else {
                //         return of(undefined);
                //     }
                // }),
            )
            .subscribe(result => {
                if (result) {
                    this._changeDetector.markForCheck();
                    this._notificationService.success(_('order.create-fulfillment-success'));
                }
            });
    }

    printPackingSlip(fulfill: OrderDetail.Fulfillments) {
        document.getElementById("print-packing-slip")!.style.visibility = "visible";
        document.getElementsByTagName("body")[0].style.visibility = "hidden";
        window.print();
        document.getElementById("print-packing-slip")!.style.visibility = "hidden";
        document.getElementsByTagName("body")[0].style.visibility = "visible";
    }

    recallOrder(result: Object | undefined): Observable<GetOrderQuery | undefined> {
        this.fetchHistory.next();
        if (result) {
            return this.dataService.order.getOrder(this.id).single$;
        } else {
            return of(undefined);
        }
    }
}