import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ModalService } from '@vendure/admin-ui/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, EMPTY } from 'rxjs';
import { debounceTime, takeUntil, switchMap } from 'rxjs/operators';
import { BaseListComponent } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import {DeleteVendor, GetVendorsList, Vendor} from "../../generated-types";
import { GET_VENDORS_LIST, DELETE_VENDOR } from './vendor-list.graphql';
import { SUPER_ADMIN_USER_IDENTIFIER } from '@vendure/common/lib/shared-constants';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { NotificationService } from '@vendure/admin-ui/core';

@Component({
    selector: 'vdr-vendor-list',
    templateUrl: './vendor-list.component.html',
    styleUrls: ['./vendor-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VendorListComponent extends BaseListComponent< GetVendorsList.Query, GetVendorsList.Items> implements OnInit {
    searchTerm = new FormControl('');

    constructor(
        private modalService: ModalService,
        private dataService: DataService,
        private notificationService: NotificationService,
        router: Router, route: ActivatedRoute
    ){
        super(router, route);
        super.setQueryFn(
            (...args: any[]) => {
                return this.dataService.query<GetVendorsList.Query>(GET_VENDORS_LIST, args);
            },
            data => data.vendors,
            (skip, take) => {
                return {
                    options: {
                        skip,
                        take,
                        filter: {
                            email: {
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

    isDefaultVendor(vendor: Vendor): boolean {
        return vendor.email === SUPER_ADMIN_USER_IDENTIFIER;
    }

    deleteVendor(id: string) {
        this.modalService
            .dialog({
                title: _('vendor.confirm-delete-vendor'),
                buttons: [
                    { type: 'secondary', label: _('common.cancel') },
                    { type: 'danger', label: _('common.delete'), returnValue: true },
                ],
            })
            .pipe(switchMap(response => (response ? this.dataService.mutate<DeleteVendor.Mutation, DeleteVendor.Variables>(DELETE_VENDOR, { id }) : EMPTY)))
            .subscribe(
                () => {
                    this.notificationService.success(_('common.notify-delete-success'), {
                        entity: 'Vendor',
                    });
                    this.refresh();
                },
                err => {
                    this.notificationService.error(_('common.notify-delete-error'), {
                        entity: 'Vendor',
                    });
                },
            );
    }
}
