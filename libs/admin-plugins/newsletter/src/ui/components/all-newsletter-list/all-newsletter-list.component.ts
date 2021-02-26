import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent, DataService } from '@vendure/admin-ui/core';
import { ModalService } from '@vendure/admin-ui/core';
import { EMPTY } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GetAllNewsletter, SortOrder, DeleteNewsletter } from '../../generated-types';
import { NotificationService } from '@vendure/admin-ui/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { GET_ALL_NEWSLETTER, DELETE_NEWSLETTER } from './all-newsletter-list.graphql';

@Component({
    selector: 'kb-all-newsletter-list',
    templateUrl: './all-newsletter-list.component.html',
    styleUrls: ['./all-newsletter-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllNewsletterListComponent extends BaseListComponent<
    GetAllNewsletter.Query,
    GetAllNewsletter.Items,
    GetAllNewsletter.Variables
> {
    filteredType: string | null = 'html';

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
                return this.dataService.query<GetAllNewsletter.Query>(GET_ALL_NEWSLETTER, args);
            },
            data => data.newsletters,
            (skip, take) => {
                return {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    options: {
                        skip,
                        take,
                        sort: {
                            createdAt: SortOrder.Desc,
                        },
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
    deleteNewsletter(newsletterId: string) {
        this.modalService
            .dialog({
                title: "Delete Newsletter Template?",
                buttons: [
                    { type: 'secondary', label: _('Cancel') },
                    { type: 'danger', label: _('Delete'), returnValue: true },
                ],
            })
            .pipe(
                switchMap(response =>
                    response ? this.dataService.mutate<DeleteNewsletter.Mutation, DeleteNewsletter.Variables>(DELETE_NEWSLETTER, {
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
