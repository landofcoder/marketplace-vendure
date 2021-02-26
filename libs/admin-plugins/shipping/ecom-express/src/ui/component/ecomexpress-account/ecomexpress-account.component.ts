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
import { EMPTY, forkJoin, from, of, Observable, Subject, combineLatest } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';
import { GET_ECOMEXPRESS_ACCOUNT, UPDATE_ECOMEXPRESS_ACCOUNT } from './ecomexpress-account.graphql'
import {EcomExpressAccount, GetEcomExpressAccount} from "../../generated-types";

@Component({
    selector: 'vdr-delhivery-account',
    templateUrl: './ecomexpress-account.component.html',
    styleUrls: ['./ecompress-account.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EcomexpressAccountComponent implements OnInit, OnDestroy {

    detailForm: FormGroup;
    entity$: Observable<EcomExpressAccount.Fragment>;
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
            username: ["", Validators.required],
            password: ["", Validators.required],
            production: ["", Validators.required],
        })

    }

    ngOnInit() {
        this.route.params.pipe(takeUntil(this.onDestroy$)).subscribe((params: any) => {

            this.entity$ = this.baseDataService.query<GetEcomExpressAccount.Query, GetEcomExpressAccount.Variables>(GET_ECOMEXPRESS_ACCOUNT, {})
                .mapStream((data) => {
                    let res = data.ecomexpressAccountConfig ? data.ecomexpressAccountConfig : {id: '', username: '', password: '', production: false} as any;
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
                title: _('Save EcomExpress acount config'),
                buttons: [
                    {type: 'secondary', label: _('common.cancel'), returnValue: false},
                    {type: 'danger', label: _('Save'), returnValue: true},
                ],
            })
            .pipe(
                switchMap(response => (
                        response ? forkJoin([
                            this.baseDataService.mutate(UPDATE_ECOMEXPRESS_ACCOUNT, {input: this.detailForm.value as any})
                        ]) : EMPTY
                    )
                )
            )
            .subscribe(() => {
                this.notificationService.success(_('common.notify-update-success'), {
                    entity: 'Ecomexpress',
                });
                this.detailForm.markAsPristine();
                this.changeDetector.markForCheck();
            }, err => {
                this.notificationService.error(_('common.notify-update-error'), {
                    entity: 'Ecomexpress',
                });
            });

    }

    protected setFormValues(entity: EcomExpressAccount.Fragment): void {
        this.detailForm.patchValue({
            id: entity.id,
            username: entity.username,
            password: entity.password,
            production: entity.production
        });
    }

}
