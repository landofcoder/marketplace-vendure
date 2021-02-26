import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ContactState } from '../../common/ui-types';

@Component({
    selector: 'kb-contact-state-label',
    templateUrl: './contact-state-label.component.html',
    styleUrls: ['./contact-state-label.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactStateLabelComponent {
    @Input() state: ContactState;

    getIcon(state: ContactState) {
        switch (state) {
            case 'new':
                return 'bubble-exclamation';
            case 'checked':
                return 'check-circle';
            case 'sent':
                return 'times-circle';
            case 'error':
                return 'times-circle';
        }
    }
}
