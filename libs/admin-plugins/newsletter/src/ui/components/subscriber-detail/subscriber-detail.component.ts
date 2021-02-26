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

import { SubscriberStatus, SubscriberType } from '../../common/ui-types';
import {
    Subscriber,
    UpdateSubscriberInput,
    UpdateSubscriber,
} from '../../generated-types';

import { UPDATE_SUBSCRIBER } from './subscriber-detail.graphql';

@Component({
    selector: 'kb-subscriber-detail',
    templateUrl: './subscriber-detail.component.html',
    styleUrls: ['./subscriber-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class SubscriberDetailComponent extends BaseDetailComponent<Subscriber.Fragment>
    implements OnInit {
    detailForm: FormGroup;
    subscriberStatus$: Observable<SubscriberStatus>;
    subscriberType$: Observable<SubscriberType>;

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
            customerFirstName: '',
            customerLastName: '',
            customerId: 0,
            subscriberToken: "",
            status: '',
            tags: '',
            email: ''
        });
    }

    ngOnInit(): void {
        this.init();
        this.subscriberStatus$ = this.entity$.pipe(map(subscriber => subscriber.status as SubscriberStatus));
        this.subscriberType$ = this.entity$.pipe(map(subscriber => subscriber.type as SubscriberType));
    }

    save() {
        this.saveChanges()
            .pipe(filter(result => !!result))
            .subscribe(
                () => {
                    this.detailForm.markAsPristine();
                    this.changeDetector.markForCheck();
                    this.notificationService.success('common.notify-update-success', {
                        entity: 'Subscriber',
                    });
                },
                () => {
                    this.notificationService.error('common.notify-update-error', {
                        entity: 'Subscriber',
                    });
                },
            );
    }

    private saveChanges(): Observable<boolean> {
        if (this.detailForm.dirty) {
            const formValue = this.detailForm.value;
            const input: UpdateSubscriberInput = {
                id: this.id,
                customerFirstName: formValue.customerFirstName,
                customerLastName: formValue.customerLastName,
                tags: formValue.tags,
                customerId: formValue.customerId,
                status: formValue.status,
            };
            return this.dataService
                .mutate<UpdateSubscriber.Mutation, UpdateSubscriber.Variables>(UPDATE_SUBSCRIBER, {
                    input,
                })
                .pipe(mapTo(true));
        } else {
            return of(false);
        }
    }

    protected setFormValues(entity: Subscriber.Fragment): void {
        this.detailForm.patchValue({
            email: entity.email,
            customerFirstName: entity.customerFirstName,
            customerLastName: entity.customerLastName,
            customerPhone: entity.customerPhone,
            tags: entity.tags,
            status: entity.status,
            type: entity.type,
            subscriberToken: entity.subscriberToken,
            customerId: entity.author?entity.author.id:0
        });
    }
}
