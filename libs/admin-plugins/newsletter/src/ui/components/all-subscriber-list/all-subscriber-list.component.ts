import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent, DataService } from '@vendure/admin-ui/core';
import { ModalService } from '@vendure/admin-ui/core';
import { EMPTY } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { 
    GetAllSubscriber, 
    SortOrder, 
    DeleteSubscriber,
    UnSubscriber
} from '../../generated-types';
import { NotificationService } from '@vendure/admin-ui/core';
import { 
    DELETE_SUBSCRIBER,
    GET_ALL_SUBSCRIBER, 
    SUBMIT_UNSUBSCRIBER 
} from './all-subscriber-list.graphql';

@Component({
    selector: 'kb-all-subscriber-list',
    templateUrl: './all-subscriber-list.component.html',
    styleUrls: ['./all-subscriber-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllSubscriberListComponent extends BaseListComponent<
    GetAllSubscriber.Query,
    GetAllSubscriber.Items,
    GetAllSubscriber.Variables
> {
    filteredStatus: string | null = 'subscribed';
    filteredType: string | null = 'guest';

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
                return this.dataService.query<GetAllSubscriber.Query>(GET_ALL_SUBSCRIBER, args);
            },
            data => data.subscribers,
            (skip, take) => {
                return {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    options: {
                        skip,
                        take,
                        sort: {
                            createdAt: SortOrder.Desc,
                        },
                        ...(this.filteredStatus != null
                            ? {
                                  filter: {
                                      status: {
                                          eq: this.filteredStatus,
                                      },
                                  },
                              }
                            : {}),
                        ...(this.filteredType != null
                            ? {
                                    filter: {
                                        type: {
                                            eq: this.filteredType,
                                        },
                                    },
                                }
                            : {}),
                    },
                };
            },
        );
    }
    deleteSubscriber(newsletterId: string) {
        this.modalService
            .dialog({
                title: "Delete Subscriber?",
                buttons: [
                    { type: 'secondary', label: _('Cancel') },
                    { type: 'danger', label: _('Delete'), returnValue: true },
                ],
            })
            .pipe(
                switchMap(response =>
                    response ? this.dataService.mutate<DeleteSubscriber.Mutation, DeleteSubscriber.Variables>(DELETE_SUBSCRIBER, {
                        id: newsletterId
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
    unSubscriber(newsletterId: string) {
        this.modalService
            .dialog({
                title: "Submit Unsubscribe for the subsriber?",
                buttons: [
                    { type: 'secondary', label: _('Cancel') },
                    { type: 'primary', label: _('Unsubscribe'), returnValue: true },
                ],
            })
            .pipe(
                switchMap(response =>
                    response ? this.dataService.mutate<UnSubscriber.Mutation, UnSubscriber.Variables>(SUBMIT_UNSUBSCRIBER, {
                        id: newsletterId
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
