import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, BaseDataService } from '@vendure/admin-ui/core';
import { BaseEntityResolver } from '@vendure/admin-ui/core';
import { GetNewsletter, Newsletter } from '../../generated-types';
import { GET_NEWSLETTER } from './newsletter-detail-resolver.graphql';

@Injectable({
    providedIn: 'root',
})
export class NewsletterDetailResolver extends BaseEntityResolver<Newsletter.Fragment> {
    constructor(router: Router, dataService: DataService, private baseDataService: BaseDataService) {
        super(
            router,
            {
                __typename: 'Newsletter',
                id: '',
                createdAt: '',
                updatedAt: '',
                subject: '',
                customerGroupId: 0,
                priority: 0,
                template_name: '',
                templateContent: '',
                templateCss: '',
                params: '',
                status: 1,
                type: 'html'
            },
            (id) => {
                //dataService.settings.getChannel(id).mapStream((data) => data.channel)
                return this.baseDataService.query<GetNewsletter.Query, GetNewsletter.Variables>(GET_NEWSLETTER, {
                    id,
                }).mapStream((data) => data.newsletter);
            },
        );
    }
}
