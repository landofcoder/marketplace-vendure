import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, BaseDataService } from '@vendure/admin-ui/core';
import { BaseEntityResolver } from '@vendure/admin-ui/core';
import { GetSubscriber, Subscriber } from '../../generated-types';
import { GET_SUBSCRIBER } from './subscriber-detail-resolver.graphql';

@Injectable({
    providedIn: 'root',
})
export class SubscriberDetailResolver extends BaseEntityResolver<Subscriber.Fragment> {
    constructor(router: Router, dataService: DataService, private baseDataService: BaseDataService) {
        super(
            router,
            {
                __typename: 'Subscriber',
                id: '',
                createdAt: '',
                updatedAt: '',
                email: '',
                subscriberToken: '',
                type: 'guest',
                customerFirstName: '',
                customerLastName: '',
                customerPhone: '',
                status: '',
                tags: ''
            },
            (id) => {
                //dataService.settings.getChannel(id).mapStream((data) => data.channel)
                return this.baseDataService.query<GetSubscriber.Query, GetSubscriber.Variables>(GET_SUBSCRIBER, {
                    id,
                }).mapStream((data) => data.subscriber);
            },
        );
    }
}
