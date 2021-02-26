import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { DataService, BaseDataService } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';
import { BaseEntityResolver } from '@vendure/admin-ui/core';

import { GetContact, Contact } from '../../generated-types';

import { GET_CONTACT } from './contact-detail-resolver.graphql';

@Injectable({
    providedIn: 'root',
})
export class ContactDetailResolver extends BaseEntityResolver<Contact.Fragment> {
    constructor(router: Router, dataService: DataService, private baseDataService: BaseDataService) {
        super(
            router,
            {
                __typename: 'Contact',
                id: '',
                createdAt: '',
                updatedAt: '',
                deletedAt: '',
                sentAt: '',
                subject: '',
                message: '',
                body: '',
                authorName: '',
                authorEmail: '',
                authorPhone: '',
                authorLocation: '',
                authorIp: '',
                adminUserId: 0,
                error: '',
                tags: '',
                state: '',
                adminNote: '',
                response: '',
                responseCreatedAt: '',
            },
            (id) => {
                //dataService.settings.getChannel(id).mapStream((data) => data.channel)
                return this.baseDataService.query<GetContact.Query, GetContact.Variables>(GET_CONTACT, {
                    id,
                }).mapStream((data) => data.contact);
            },
        );
    }
}
