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
import { GET_SEO_CONFIG, UPDATE_SEO_CONFIG } from './config-seo.graphql'
import { SeoConfig, GetSeoConfig, UpdateSeoConfig} from "../../generated-types";

@Component({
    selector: 'vdr-config-seo',
    templateUrl: './config-seo.component.html',
    styleUrls: ['./config-seo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SEOConfigComponent implements OnInit, OnDestroy {

    detailForm: FormGroup;
    entity$: Observable<SeoConfig.Fragment>;
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
            title: ["", Validators.required],
            titleTemplate: ["", Validators.required],
            description: ["", Validators.required],
            url: ["", Validators.required],
            site_name: ["", Validators.required]
        })

    }

    ngOnInit() {
        this.route.params.pipe(takeUntil(this.onDestroy$)).subscribe((params: any) => {

            this.entity$ = this.baseDataService.query< GetSeoConfig.Query, GetSeoConfig.Variables>(GET_SEO_CONFIG, {})
                .mapStream((data) => {
                    let res = data.getSEOConfig? data.getSEOConfig : {
                        id: '',
                        title: '',
                        titleTemplate: '',
                        description: '',
                        url: '',
                        site_name: ''} as any;
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
                title: _('Save SEO config'),
                buttons: [
                    {type: 'secondary', label: _('common.cancel'), returnValue: false},
                    {type: 'danger', label: _('Save'), returnValue: true},
                ],
            })
            .pipe(
                switchMap(response => (
                        response ? forkJoin([
                            this.baseDataService.mutate(UPDATE_SEO_CONFIG, {input: this.detailForm.value as any})
                        ]) : EMPTY
                    )
                )
            )
            .subscribe(() => {
                this.notificationService.success(_('common.notify-update-success'), {
                    entity: 'SEOConfig',
                });
                this.detailForm.markAsPristine();
                this.changeDetector.markForCheck();
            }, err => {
                this.notificationService.error(_('common.notify-update-error'), {
                    entity: 'SEOConfig',
                });
            });

    }

    protected setFormValues(entity: SeoConfig.Fragment): void {
        this.detailForm.patchValue({
            id: entity.id,
            title: entity.title,
            titleTemplate: entity.titleTemplate,
            description: entity.description,
            url: entity.url,
            site_name: entity.site_name
        });
    }

}
