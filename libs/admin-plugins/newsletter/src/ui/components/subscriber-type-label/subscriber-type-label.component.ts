import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SubscriberType } from '../../common/ui-types';

@Component({
    selector: 'kb-subscriber-type-label',
    templateUrl: './subscriber-type-label.component.html',
    styleUrls: ['./subscriber-type-label.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriberTypeLabelComponent {
    @Input() type: SubscriberType;

    getIcon(type: SubscriberType) {
        switch (type) {
            case 'guest':
                return 'check-circle';
            case 'customer':
                return 'times-circle';
        }
    }
}
