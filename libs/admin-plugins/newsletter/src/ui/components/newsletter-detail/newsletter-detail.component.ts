import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
    BaseDetailComponent,
    DataService,
    NotificationService,
    ServerConfigService,
} from '@vendure/admin-ui/core';
import { Observable, of } from 'rxjs';
import { filter, map, mapTo, switchMap } from 'rxjs/operators';

import {
    Newsletter,
    UpdateNewsletterInput,
    UpdateNewsletter,
} from '../../generated-types';

import { UPDATE_NEWSLETTER } from './newsletter-detail.graphql';

@Component({
    selector: 'kb-newsletter-detail',
    templateUrl: './newsletter-detail.component.html',
    styleUrls: ['./newsletter-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class NewsletterDetailComponent extends BaseDetailComponent<Newsletter.Fragment>
    implements OnInit {
    detailForm: FormGroup;
    constructor(
        route: ActivatedRoute,
        router: Router,
        serverConfigService: ServerConfigService,
        private formBuilder: FormBuilder,
        protected dataService: DataService,
        private changeDetector: ChangeDetectorRef,
        private notificationService: NotificationService,
    ) {
        super(route, router, serverConfigService, dataService);
        this.detailForm = this.formBuilder.group({
            subject: '',
            customerGroupId: 0,
            priority: 0,
            status: 1,
            enabled: true,
            template_name: '',
            templateContent: '',
            templateCss: '',
            type: 'html'
        });
    }

    ngOnInit(): void {
        this.init();
    }

    save() {
        this.saveChanges()
            .pipe(filter(result => !!result))
            .subscribe(
                () => {
                    this.detailForm.markAsPristine();
                    this.changeDetector.markForCheck();
                    this.notificationService.success('common.notify-update-success', {
                        entity: 'Newsletter',
                    });
                },
                () => {
                    this.notificationService.error('common.notify-update-error', {
                        entity: 'Newsletter',
                    });
                },
            );
    }

    private saveChanges(): Observable<boolean> {
        if (this.detailForm.dirty) {
            const formValue = this.detailForm.value;
            const input: UpdateNewsletterInput = {
                id: this.id,
                subject: formValue.subject,
                priority: formValue.priority,
                template_name: formValue.template_name,
                type: formValue.type,
                templateContent: formValue.templateContent,
                templateCss: formValue.templateCss,
                status: (formValue.enabled && (formValue.enabled==true || formValue.enabled=="true"|| formValue.enabled=="1"))?1:0,
            };
            return this.dataService
                .mutate<UpdateNewsletter.Mutation, UpdateNewsletter.Variables>(UPDATE_NEWSLETTER, {
                    input,
                })
                .pipe(mapTo(true));
        } else {
            return of(false);
        }
    }

    protected toBoolean(value?: string): boolean {
        if (!value) {
          //Could also throw an exception up to you
          return false
        }
      
        switch (value.toLocaleLowerCase()) {
          case 'true':
          case '1':
          case 'on':
          case 'yes':
            return true
          default:
            return false
        }
      }
    protected setFormValues(entity: Newsletter.Fragment): void {
        this.detailForm.patchValue({
            subject: entity.subject,
            priority: entity.priority,
            template_name: entity.template_name,
            type: entity.type,
            templateContent: entity.templateContent,
            status: entity.status,
            enabled: this.toBoolean(entity.status.toString()),
            templateCss: entity.templateCss
        });
    }
}
