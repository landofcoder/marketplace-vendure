import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import {
    BaseListComponent,
    DataService,
    ModalService,
    NotificationService,
} from '@vendure/admin-ui/core';
import {combineLatest, EMPTY, merge, Observable, Subject} from 'rxjs';
import {debounceTime, map, startWith, switchMap, takeUntil, tap} from 'rxjs/operators';
import {DELETE_SHIPPING_COUNTRY, GET_SHIPPING_COUNTRY_LIST} from "./shipping-country-list.graphql";
import {DeleteShippingCountry, GetShippingCountryPrice, DeletionResult} from "../generated-types";

@Component({
    selector: 'vdr-shipping-country-list',
    templateUrl: './shipping-country-list.component.html',
    styleUrls: ['./shipping-country-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShippingCountryListComponent extends BaseListComponent< GetShippingCountryPrice.Query, GetShippingCountryPrice.Items> implements OnInit {
    searchTerm = new FormControl('');

    constructor(
        private dataService: DataService,
        private notificationService: NotificationService,
        private modalService: ModalService,
        router: Router, route: ActivatedRoute
    ) {
        super(router, route);
        super.setQueryFn(
            (...args: any[]) => {
                return this.dataService.query<GetShippingCountryPrice.Query>(GET_SHIPPING_COUNTRY_LIST, args);
            },
            data => data.shippingCountries,
            (skip, take) => {
                return {
                    options: {
                        skip,
                        take,
                        filter: {
                            country_name: {
                                contains: this.searchTerm.value,
                            },
                        },
                    },
                };
            },
        );
    }

    ngOnInit() {
        super.ngOnInit();
        merge(this.searchTerm.valueChanges)
            .pipe(
                debounceTime(250),
                takeUntil(this.destroy$),
            )
            .subscribe(() => this.refresh());
    }

    deleteCountry(countryId: string) {
        this.modalService
            .dialog({
                title: _('catalog.confirm-delete-country'),
                buttons: [
                    { type: 'secondary', label: _('common.cancel') },
                    { type: 'danger', label: _('common.delete'), returnValue: true },
                ],
            })
            .pipe(
                switchMap(response =>
                    response ? this.dataService.mutate<DeleteShippingCountry.Mutation, DeleteShippingCountry.Variables>(DELETE_SHIPPING_COUNTRY, {
                        id: countryId,
                    }) : EMPTY,
                ),
            )
            .subscribe(
                response => {
                    if (response.deleteShippingCountry.result === DeletionResult.Deleted) {
                        this.notificationService.success(_('common.notify-delete-success'), {
                            entity: 'ShippingCountry',
                        });
                        this.refresh();
                    } else {
                        this.notificationService.error(response.deleteShippingCountry.message || '');
                    }
                },
                err => {
                    this.notificationService.error(_('common.notify-delete-error'), {
                        entity: 'ShippingCountry',
                    });
                },
            );
    }

}
