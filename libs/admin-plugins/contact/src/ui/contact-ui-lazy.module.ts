import { NgModule, } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SharedModule, createResolveData, CanDeactivateDetailGuard  } from '@vendure/admin-ui/core';
import { AllContactListComponent } from './components/all-contact-list/all-contact-list.component';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { ContactStateLabelComponent } from './components/contact-state-label/contact-state-label.component';
import { GetContact } from './generated-types';
import { ContactDetailResolver } from './providers/routing/contact-detail-resolver';

@NgModule({
    imports: [SharedModule,
        RouterModule.forChild([{
              path: 'contacts',
              pathMatch: 'full',
              component: AllContactListComponent,
              data: { breadcrumb: 'contact', },
          },
          {
            path: 'contacts/:id',
            pathMatch: '',
            component: ContactDetailComponent,
            resolve: createResolveData(ContactDetailResolver),
            canDeactivate: [CanDeactivateDetailGuard],
            data: {
                breadcrumb: contactDetailBreadcrumb
            },
        },
        ]),
    ],
    declarations: [
        ContactDetailComponent,
        AllContactListComponent,
        ContactStateLabelComponent,
    ],
  })


export class ContactUiLazyModule {}

export function contactsBreadcrumb(resolved: { data: any }, params: any) {
    return [
        {
            label: 'Contacts',
            link: [''],
        },
    ];
}

export function contactDetailBreadcrumb(resolved: { entity: Observable<GetContact.Contact> }) {
    return resolved.entity.pipe(
        map(entity => [
            {
                label: 'Contacts',
                link: ['/contacts'],
            },
            {
                label: `${entity.subject}`,
                link: [],
            },
        ]),
    );
}
