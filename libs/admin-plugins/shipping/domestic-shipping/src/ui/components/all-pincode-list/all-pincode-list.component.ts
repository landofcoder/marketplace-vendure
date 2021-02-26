import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent, DataService } from '@vendure/admin-ui/core';
import { GetAllPincode, SortOrder } from '../../generated-types';
import { ModalService } from '@vendure/admin-ui/core';
import { GET_ALL_PINCODE, DELETE_PINCODE, CHECK_PINCODE } from './all-pincode-list.graphql';
import { NotificationService } from '@vendure/admin-ui/core';
import { Pincode, DeletePincode, CheckPincode } from '../../generated-types';
import {marker as _} from "@biesbjerg/ngx-translate-extract-marker";
import {switchMap} from "rxjs/operators";

import {EMPTY} from "rxjs";

@Component({
    selector: 'kb-all-pincode-list',
    templateUrl: './all-pincode-list.component.html',
    styleUrls: ['./all-pincode-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllPincodeListComponent extends BaseListComponent<
    GetAllPincode.Query,
    GetAllPincode.Items,
    GetAllPincode.Variables
> {
    checkPincodeResult: any;
    inputPincode: any;
    constructor(
        private dataService: DataService,
        router: Router,
        route: ActivatedRoute,
        private modalService: ModalService,
        private notificationService: NotificationService
        ) {
        super(router, route);

        super.setQueryFn(
            (...args: any[]) => {
                return this.dataService.query<GetAllPincode.Query>(GET_ALL_PINCODE, args).refetchOnChannelChange();
            },
            data => data.pincodes,
            // @ts-ignore
            (skip, take) => {
                return {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    options: {
                        skip,
                        take,
                        sort: {
                            createdAt: SortOrder.Desc,
                        },
                    },
                };
            },
        );
    }

    handleClear(){
        this.inputPincode = '';
        this.checkPincode(0);
    }

    deletePincode(pincodeId: string) {
        this.modalService
            .dialog({
                title: "Delete Pincode?",
                buttons: [
                    { type: 'secondary', label: _('common.cancel') },
                    { type: 'danger', label: _('common.delete'), returnValue: true },
                ],
            })
            .pipe(
                switchMap(response =>
                    response ? this.dataService.mutate<DeletePincode.Mutation, DeletePincode.Variables>(DELETE_PINCODE, {
                        id: pincodeId
                    }) : EMPTY,
                ),
            )
            .subscribe(
                (x) => {
                    console.log("x", x);
                    if(x && x.deletePincode && x.deletePincode.error === "false"){
                        this.checkPincode(0);
                    }
                    this.notificationService.success(_('common.notify-delete-success'), {
                        entity: 'Promotion',
                    });
                    this.refresh();
                },
                err => {
                    this.notificationService.error(_('common.notify-delete-error'), {
                        entity: 'Promotion',
                    });
                },
            );
    }

    checkPincode(pincodeCheck){
        // @ts-ignore
        this.checkPincodeResult = this.dataService.mutate<CheckPincode.Query, CheckPincode.Variables>(CHECK_PINCODE, {
            pincode: {
                pincode: parseInt(pincodeCheck)
            }
        });
        if(this.checkPincodeResult){
            return true;
        }
    }
}
