import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent, DataService } from '@vendure/admin-ui/core';
import { DeletionResult, GetFacetList } from '@vendure/admin-ui/core';
import { GetAllContact, SortOrder } from '../../generated-types';
import { ModalService } from '@vendure/admin-ui/core';
import { EMPTY } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GET_ALL_CONTACT, DELETE_CONTACT } from './all-contact-list.graphql';
import { NotificationService } from '@vendure/admin-ui/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import {
    Contact,
    UpdateContactInput,
    UpdateContact,
    DeleteContact
} from '../../generated-types';

@Component({
    selector: 'kb-all-contact-list',
    templateUrl: './all-contact-list.component.html',
    styleUrls: ['./all-contact-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllContactListComponent extends BaseListComponent<
    GetAllContact.Query,
    GetAllContact.Items,
    GetAllContact.Variables
> {
    filteredState: string | null = 'new';

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
                return this.dataService.query<GetAllContact.Query>(GET_ALL_CONTACT, args).refetchOnChannelChange();
            },
            data => data.contacts,
            (skip, take) => {
                return {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    options: {
                        skip,
                        take,
                        sort: {
                            createdAt: SortOrder.Desc,
                        },
                        ...(this.filteredState != null
                            ? {
                                  filter: {
                                      state: {
                                          eq: this.filteredState,
                                      },
                                  },
                              }
                            : {}),
                    },
                };
            },
        );
    }
    deleteContact(contactId: string) {
        this.modalService
            .dialog({
                title: "Delete Contact?",
                buttons: [
                    { type: 'secondary', label: _('common.cancel') },
                    { type: 'danger', label: _('common.delete'), returnValue: true },
                ],
            })
            .pipe(
                switchMap(response =>
                    response ? this.dataService.mutate<DeleteContact.Mutation, DeleteContact.Variables>(DELETE_CONTACT, {
                        id: contactId
                    }) : EMPTY,
                ),
            )
            .subscribe(
                () => {
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
}
