import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseListComponent, LocalStorageService, ServerConfigService, GetOrderList, SortOrder, DataService } from '@vendure/admin-ui/core';
import { merge, Observable, combineLatest, EMPTY } from 'rxjs';
import { debounceTime, takeUntil, map, distinctUntilChanged, shareReplay } from 'rxjs/operators';
import { PaginationInstance } from 'ngx-pagination';
import {COUNT_ORDER_BY_STATUS, GET_LIST_ORDERS } from './order_list.graphql';

interface OrderFilterConfig {
    active?: boolean;
    states?: string[];
}

interface FilterPreset {
    name: string;
    config: OrderFilterConfig;
}

@Component({
    selector: 'vdr-custom-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListComponent
    extends BaseListComponent<GetOrderList.Query, GetOrderList.Items>
    implements OnInit {

    currentOrderSelected$: any;
    paginationConfig$: Observable<PaginationInstance>;

    searchTerm = new FormControl('');
    customFilterForm: FormGroup;
    orderStates = this.serverConfigService.getOrderProcessStates().map(item => item.name);
    filterPresets: FilterPreset[] = [
        {
            name: 'new',
            config: {
                active: false,
                states: ['PaymentAuthorized', 'PaymentSettled']
            },
        },
        {
            name: 'packed',
            config: {
                active: false,
                states: ['Packed'],
            },
        },
        {
            name: 'handover',
            config: {
                active: false,
                states: ['Handover'],
            },
        },
        {
            name: 'transit',
            config: {
                active: false,
                states: ['Shipped', 'PartiallyShipped'],
            },
        },
        {
            name: 'delivered',
            config: {
                active: false,
                states: ['Delivered'],
            },
        },
        {
            name: 'cancelled',
            config: {
                active: false,
                states: ['Cancelled'],
            },
        },
        {
            name: 'returned',
            config: {
                active: false,
                states: ['Returned'],
            },
        },
        {
            name: 'upcomming',
            config: {
                active: true,
            },
        },
    ];
    activePreset$: Observable<string>;
    selectedDate: any;
    countOrderByStatus$: Observable<any>;

    constructor(
        private serverConfigService: ServerConfigService,
        private dataService: DataService,
        private localStorageService: LocalStorageService,
        router: Router,
        route: ActivatedRoute
    ) {
        super(router, route);
        super.setQueryFn(
            () => this.dataService.query<any, any>(GET_LIST_ORDERS, {}).refetchOnChannelChange(),
            data => {
                console.log("ORDERS", data.orders)
                return data.orders
            },
            // tslint:disable-next-line:no-shadowed-variable
            (skip, take) =>
                this.createQueryOptions(
                    skip,
                    take,
                    this.searchTerm.value,
                    this.route.snapshot.queryParamMap.get('filter') || 'new',
                ),
        );
        // const lastFilters = this.localStorageService.get('orderListLastCustomFilters');
        // if (lastFilters) {
        //     this.setQueryParam(lastFilters, { replaceUrl: true });
        // }
    }

    ngOnInit() {
        super.ngOnInit();
        this.activePreset$ = this.route.queryParamMap.pipe(
            map(qpm => qpm.get('filter') || 'new'),
            distinctUntilChanged(),
        );
        merge(this.searchTerm.valueChanges.pipe(debounceTime(250)), this.route.queryParamMap)
            .pipe(takeUntil(this.destroy$))
            .subscribe(val => {
                this.refresh();
            });

        const queryParamMap = this.route.snapshot.queryParamMap;
        this.customFilterForm = new FormGroup({
            states: new FormControl(queryParamMap.getAll('states') ?? []),
            //placedAtStart: new FormControl(queryParamMap.get('placedAtStart')),
            //placedAtEnd: new FormControl(queryParamMap.get('placedAtEnd')),
        });

        this.paginationConfig$ = combineLatest(this.itemsPerPage$, this.currentPage$, this.totalItems$).pipe(
            map(([itemsPerPage, currentPage, totalItems]) => ({ itemsPerPage, currentPage, totalItems })),
        );

        this.countOrderByStatus$ = this.dataService.query<any, any>(COUNT_ORDER_BY_STATUS, {}).refetchOnChannelChange().mapStream(res => {
            var obj = {};
            console.log(res);
            if(res.countOrderByStatus){
                let newStatus = res.countOrderByStatus.filter(o => o.state == 'PaymentAuthorized' || o.state == 'PaymentSettled');
                obj['new'] = newStatus.length ? newStatus.map(o => o.count ).reduce((pre, cur) => parseInt(pre) + parseInt(cur)) : 0;
                let upcommingStatus = res.countOrderByStatus.filter(o => o.state == 'Created' || o.state == 'AddingItems' || o.state == 'ArrangingPayment' || o.state == 'ArrangingAdditionalPayment');
                obj['upcomming'] = upcommingStatus.length ? upcommingStatus.map(o => o.count ).reduce((pre, cur) => parseInt(pre) + parseInt(cur)) : 0;
                let packStatus = res.countOrderByStatus.filter(o => o.state == 'Packed');
                obj['packed'] = packStatus.length ? packStatus[0].count : 0;
                let handoverStatus = res.countOrderByStatus.filter(o => o.state == 'Handover');
                obj['handover'] = handoverStatus.length ? handoverStatus[0].count : 0;
                let transitStatus = res.countOrderByStatus.filter(o => o.state == 'Shipped' || o.state == 'PartiallyShipped');
                obj['transit'] = transitStatus.length ? transitStatus.map(o => o.count ).reduce((pre, cur) => parseInt(pre) + parseInt(cur)) : 0;
                let deliveredStatus = res.countOrderByStatus.filter(o => o.state == 'Delivered');
                obj['delivered'] = deliveredStatus.length ? deliveredStatus[0].count : 0;
                let cancelledStatus = res.countOrderByStatus.filter(o => o.state == 'Cancelled');
                obj['cancelled'] = cancelledStatus.length ? cancelledStatus[0].count : 0;
                let returnedStatus = res.countOrderByStatus.filter(o => o.state == 'Returned');
                obj['returned'] = returnedStatus.length ? returnedStatus[0].count : 0;
            }
            return obj;
        }).pipe(shareReplay(1));;

    }

    openOrderDetail(order) {
        this.currentOrderSelected$ = order;
    }

    formatOrderCode(code){
        if(code.length > 15){
            return code.substring(0,15) + '...'
        }
        return code
    }

    selectFilterPreset(presetName: string) {
        
        const lastCustomFilters = this.localStorageService.get('orderListLastCustomFilters') ?? {};
        const emptyCustomFilters = { states: undefined, placedAtStart: undefined, placedAtEnd: undefined };
        const filters = presetName === 'custom' ? lastCustomFilters : emptyCustomFilters;
        this.setQueryParam(
            {
                filter: presetName,
                page: 1,
                ...filters,
            },
            { replaceUrl: true },
        );
    }

    applyCustomFilters() {
        const formValue = this.customFilterForm.value;
        const customFilters = {
            states: formValue.states,
            placedAtStart: this.selectedDate.startDate ? (this.selectedDate.startDate as any).toISOString() : undefined,//formValue.placedAtStart,
            placedAtEnd: this.selectedDate.endDate ? (this.selectedDate.endDate as any).toISOString() : undefined//formValue.placedAtEnd,
        };
        const queryParams = this.route.snapshot.queryParamMap;
        const filter = queryParams.get('filter') || 'new';
        this.setQueryParam({
            filter: filter,
            page: 1,
            ...customFilters,
        },
        { replaceUrl: true },
        );
        this.customFilterForm.markAsPristine();
        this.localStorageService.set('orderListLastCustomFilters', customFilters);
    }

    // tslint:disable-next-line:no-shadowed-variable
    private createQueryOptions(skip: number, take: number, searchTerm: string, activeFilterPreset?: string) {
        const filterConfig = this.filterPresets.find(p => p.name === activeFilterPreset);
        const filter: any = {};
        if (filterConfig) {
            if (filterConfig.config.active != null) {
                filter.active = {
                    eq: filterConfig.config.active,
                };
            }
            if (filterConfig.config.states) {
                filter.state = {
                    in: filterConfig.config.states,
                };
            }
        } 
        //else if (activeFilterPreset === 'custom') {
            const queryParams = this.route.snapshot.queryParamMap;
            //const states = queryParams.getAll('states') ?? [];
            const placedAtStart = queryParams.get('placedAtStart');
            const placedAtEnd = queryParams.get('placedAtEnd');
            // if (states.length) {
            //     filter.state = {
            //         in: states,
            //     };
            // }
            if (placedAtStart && placedAtEnd) {
                filter.orderPlacedAt = {
                    between: {
                        start: placedAtStart,
                        end: placedAtEnd,
                    },
                };
            } else if (placedAtStart) {
                filter.orderPlacedAt = {
                    after: placedAtStart,
                };
            } else if (placedAtEnd) {
                filter.orderPlacedAt = {
                    before: placedAtEnd,
                };
            }
        //}
        return {
            options: {
                skip,
                take,
                filter: {
                    ...(filter ?? {}),
                    code: {
                        contains: searchTerm,
                    },
                },
                sort: {
                    updatedAt: SortOrder.DESC,
                },
            },
        };
    }

}
