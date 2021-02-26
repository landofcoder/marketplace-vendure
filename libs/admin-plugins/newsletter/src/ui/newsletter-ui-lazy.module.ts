import { NgModule, } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SharedModule, createResolveData, CanDeactivateDetailGuard  } from '@vendure/admin-ui/core';
import { AllNewsletterListComponent } from './components/all-newsletter-list/all-newsletter-list.component';
import { NewsletterDetailComponent } from './components/newsletter-detail/newsletter-detail.component';
import { NewsletterQueueComponent } from './components/newsletter-queue/newsletter-queue.component';
import { AllSubscriberListComponent } from './components/all-subscriber-list/all-subscriber-list.component';
import { SubscriberDetailComponent } from './components/subscriber-detail/subscriber-detail.component';
import { SubscriberStatusLabelComponent } from './components/subscriber-status-label/subscriber-status-label.component';
import { SubscriberTypeLabelComponent } from './components/subscriber-type-label/subscriber-type-label.component';
import { GetSubscriber, GetNewsletter } from './generated-types';
import { SubscriberDetailResolver } from './providers/routing/subscriber-detail-resolver';
import { NewsletterDetailResolver } from './providers/routing/newsletter-detail-resolver';


@NgModule({
    imports: [SharedModule,
        RouterModule.forChild([{
              path: 'subscribers',
              pathMatch: 'full',
              component: AllSubscriberListComponent,
              data: { breadcrumb: subscribersBreadcrumb, },
          },
          {
            path: 'subscribers/:id',
            pathMatch: '',
            component: SubscriberDetailComponent,
            resolve: createResolveData(SubscriberDetailResolver),
            canDeactivate: [CanDeactivateDetailGuard],
            data: {
                breadcrumb: subscriberDetailBreadcrumb
            },
        },
        {
            path: 'newsletters',
            pathMatch: 'full',
            component: AllNewsletterListComponent,
            data: { breadcrumb: newslettersBreadcrumb, },
        },
        {
          path: 'newsletters/:id',
          pathMatch: '',
          component: NewsletterDetailComponent,
          resolve: createResolveData(NewsletterDetailResolver),
          canDeactivate: [CanDeactivateDetailGuard],
          data: {
              breadcrumb: newsletterDetailBreadcrumb
          },
        },
       
        {
            path: 'newsletters/queue/:id',
            pathMatch: '',
            component: NewsletterQueueComponent,
            resolve: createResolveData(NewsletterDetailResolver),
            canDeactivate: [CanDeactivateDetailGuard],
            data: {
                breadcrumb: newsletterQueueBreadcrumb
            },
          },
        ]),
    ],
    declarations: [
        SubscriberDetailComponent,
        AllSubscriberListComponent,
        SubscriberStatusLabelComponent,
        SubscriberTypeLabelComponent,
        NewsletterDetailComponent,
        NewsletterQueueComponent,
        AllNewsletterListComponent,
    ],
  })


export class NewsletterUiLazyModule {}

export function subscribersBreadcrumb(resolved: { data: any }, params: any) {
    return [
        {
            label: 'Newsletter Subscribers',
            link: [''],
        },
    ];
}

export function subscriberDetailBreadcrumb(resolved: { entity: Observable<GetSubscriber.Subscriber> }) {
    return resolved.entity.pipe(
        map(entity => [
            {
                label: 'Subscribers',
                link: ['/subscribers'],
            },
            {
                label: `${entity.email}`,
                link: [],
            },
        ]),
    );
}


export function newslettersBreadcrumb(resolved: { data: any }, params: any) {
    return [
        {
            label: 'Newsletter Templates',
            link: [''],
        },
    ];
}

export function newsletterDetailBreadcrumb(resolved: { entity: Observable<GetNewsletter.Newsletter> }) {
    return resolved.entity.pipe(
        map(entity => [
            {
                label: 'Newsletter Templates',
                link: ['/newsletters'],
            },
            {
                label: `${entity.template_name}`,
                link: [],
            },
        ]),
    );
}



export function newsletterQueueBreadcrumb(resolved: { entity: Observable<GetNewsletter.Newsletter> }) {
    return resolved.entity.pipe(
        map(entity => [
            {
                label: 'Newsletter Templates',
                link: ['/newsletters'],
            },
            {
                label: `Edit Queue`,
                link: [],
            },
        ]),
    );
}