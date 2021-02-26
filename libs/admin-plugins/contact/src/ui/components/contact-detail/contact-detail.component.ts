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

import { ContactState } from '../../common/ui-types';
import {
    Contact,
    UpdateContactInput,
    UpdateContact,
} from '../../generated-types';

import { UPDATE_CONTACT } from './contact-detail.graphql';

@Component({
    selector: 'kb-contact-detail',
    templateUrl: './contact-detail.component.html',
    styleUrls: ['./contact-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class ContactDetailComponent extends BaseDetailComponent<Contact.Fragment>
    implements OnInit {
    detailForm: FormGroup;
    contactState$: Observable<ContactState>;

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
            subject: ['', Validators.required],
            message: ['', Validators.required],
            body: '',
            authorName: ['', Validators.required],
            authorEmail: ['', Validators.required],
            authorPhone: '',
            authorLocation: '',
            state: '',
            response: '',
            adminNote: '',
            tags: ''
        });
    }

    ngOnInit(): void {
        this.init();
        this.contactState$ = this.entity$.pipe(map(contact => contact.state as ContactState));
    }

    save() {
        this.saveChanges()
            .pipe(filter(result => !!result))
            .subscribe(
                () => {
                    this.detailForm.markAsPristine();
                    this.changeDetector.markForCheck();
                    this.notificationService.success('common.notify-update-success', {
                        entity: 'Contact',
                    });
                },
                () => {
                    this.notificationService.error('common.notify-update-error', {
                        entity: 'Contact',
                    });
                },
            );
    }

    private saveChanges(): Observable<boolean> {
        if (this.detailForm.dirty) {
            const formValue = this.detailForm.value;
            const input: UpdateContactInput = {
                id: this.id,
                subject: formValue.subject,
                message: formValue.message,
                tags: formValue.tags,
                adminNote: formValue.adminNote,
                body: formValue.body,
                response: formValue.response,
            };
            return this.dataService
                .mutate<UpdateContact.Mutation, UpdateContact.Variables>(UPDATE_CONTACT, {
                    input,
                })
                .pipe(mapTo(true));
        } else {
            return of(false);
        }
    }

    protected setFormValues(entity: Contact.Fragment): void {
        this.detailForm.patchValue({
            subject: entity.subject,
            body: entity.body,
            message: entity.message,
            authorName: entity.authorName,
            authorEmail: entity.authorEmail,
            authorPhone: entity.authorPhone,
            authorIp: entity.authorIp,
            authorLocation: entity.authorLocation,
            state: entity.state,
            response: entity.response,
            adminNote: entity.adminNote,
        });
    }
}
