import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import {
    BaseDataService,
    BaseDetailComponent,
    DataService,
    ModalService,
    NotificationService,
    ServerConfigService,
} from '@vendure/admin-ui/core';
import { notNullOrUndefined } from '@vendure/common/lib/shared-utils';
import { EMPTY, forkJoin, from, of, Observable, Subject, combineLatest } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';
import { DelhiveryAccount, GetDelhiveryAccount } from "../../generated-types";
import { LanguageCode } from '@vendure/common/lib/generated-types';
import { GET_DELHIVERY_ACCOUNT, UPDATE_DELHIVERY_ACCOUNT } from './delhivery-account.graphql'

@Component({
    selector: 'vdr-delhivery-account',
    templateUrl: './delhivery-account.component.html',
    styleUrls: ['./delhivery-account.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DelhiveryAccountComponent implements OnInit, OnDestroy {

    detailForm: FormGroup;
    entity$: Observable<DelhiveryAccount.Fragment>;
    private onDestroy$: Subject<boolean> = new Subject<boolean>();


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        protected serverConfigService: ServerConfigService,
        private changeDetector: ChangeDetectorRef,
        protected dataService: DataService,
        private formBuilder: FormBuilder,
        private notificationService: NotificationService,
        private modalService: ModalService,
        private baseDataService: BaseDataService
    ) {
        
        this.detailForm = this.formBuilder.group({
            id: "",
            client_name: ["", Validators.required],
            user_name: ["", Validators.required],
            api_key: ["", Validators.required],
            shipping_mode: ["", Validators.required],
            hand_fee: ["", Validators.required],
        })

    }

    ngOnInit() {
        this.route.params.pipe(takeUntil(this.onDestroy$)).subscribe((params: any) => {
            const { id } = params;
            this.entity$ = this.baseDataService.query<GetDelhiveryAccount.Query, GetDelhiveryAccount.Variables>(GET_DELHIVERY_ACCOUNT, {})
                .mapStream((data) => {
                    let res = data.delhiveryAccount ? data.delhiveryAccount : {id: '', client_name: '', user_name: '', api_key: '', shipping_mode: ''} as any;
                    return res;
                });
            // console.log(this.entity$);

            combineLatest(this.entity$)
                .pipe(takeUntil(this.onDestroy$))
                .subscribe(([entity]) => {
                    this.setFormValues(entity);
                    this.detailForm.markAsPristine();
                });

          });
        
    }

    ngOnDestroy() {
        this.onDestroy$.next(true);
        this.onDestroy$.complete();
    }

    saveButtonEnabled(): boolean {
        return this.detailForm.dirty && this.detailForm.valid;
    }

    save(){

        this.modalService
            .dialog({
                title: _('Save Delhivery Config'),
                buttons: [
                    {type: 'secondary', label: _('common.cancel'), returnValue: false},
                    {type: 'danger', label: _('Save'), returnValue: true},
                ],
            })
            .pipe(
                switchMap(response => (
                        response ? forkJoin([
                            this.baseDataService.mutate(UPDATE_DELHIVERY_ACCOUNT, {input: this.detailForm.value as any})
                        ]) : EMPTY
                    )
                )
            )
            .subscribe(() => {
                this.notificationService.success(_('common.notify-update-success'), {
                    entity: 'Delhivery',
                });
                this.detailForm.markAsPristine();
                this.changeDetector.markForCheck();
            }, err => {
                this.notificationService.error(_('common.notify-update-error'), {
                    entity: 'Delhivery',
                });
            });

    }

    protected setFormValues(entity: DelhiveryAccount.Fragment): void {
        this.detailForm.patchValue({
            id: entity.id,
            client_name: entity.client_name,
            user_name: entity.user_name,
            api_key: entity.api_key,
            shipping_mode: entity.shipping_mode,
            hand_fee: entity.hand_fee
        });
    }

}
