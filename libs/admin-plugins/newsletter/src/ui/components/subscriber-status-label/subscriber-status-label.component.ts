import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SubscriberStatus } from '../../common/ui-types';

@Component({
    selector: 'kb-subscriber-status-label',
    templateUrl: './subscriber-status-label.component.html',
    styleUrls: ['./subscriber-status-label.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriberStatusLabelComponent {
    @Input() status: SubscriberStatus;

    getIcon(status: SubscriberStatus) {
        switch (status) {
            case 'subscribed':
                return 'check-circle';
            case 'unsubscribed':
                return 'times-circle';
        }
    }
}
