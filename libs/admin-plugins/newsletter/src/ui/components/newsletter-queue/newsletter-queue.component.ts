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
    AddNewsletterInput,
    UpdateNewsletterQueue,
} from '../../generated-types';

import { UPDATE_NEWSLETTER_QUEUE } from './newsletter-queue.graphql';

@Component({
    selector: 'kb-newsletter-queue',
    templateUrl: './newsletter-queue.component.html',
    styleUrls: ['./newsletter-queue.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class NewsletterQueueComponent extends BaseDetailComponent<Newsletter.Fragment>
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
            newsletterId: 0,
            subject: '',
            startAt: '',
            templateContent: '',
            templateCss: ''
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
                        entity: 'NewsletterQueue',
                    });
                },
                () => {
                    this.notificationService.error('common.notify-update-error', {
                        entity: 'NewsletterQueue',
                    });
                },
            );
    }

    private saveChanges(): Observable<boolean> {
        if (this.detailForm.dirty) {
            const formValue = this.detailForm.value;
            const input: AddNewsletterInput = {
                newsletterId: this.id,
                subject: formValue.subject,
                startAt: formValue.startAt,
                templateContent: formValue.templateContent,
                templateCss: formValue.templateCss
            };
            return this.dataService
                .mutate<UpdateNewsletterQueue.Mutation, UpdateNewsletterQueue.Variables>(UPDATE_NEWSLETTER_QUEUE, {
                    input,
                })
                .pipe(mapTo(true));
        } else {
            return of(false);
        }
    }

    protected setFormValues(entity: Newsletter.Fragment): void {
        this.detailForm.patchValue({
            subject: entity.subject,
            templateContent: entity.templateContent,
            templateCss: entity.templateCss
        });
    }
}
