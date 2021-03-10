import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomFieldConfigType, CustomFieldControl } from '@vendure/admin-ui/core';

@Component({
    selector: 'bavaan-product-status',
    template: `
    <div>
        {{ formControl.value }}
    </div>
    `,
    styles: [`
    .clr-toggle-wrapper { display: none;}
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ProductStatusComponent implements CustomFieldControl {
    readonly: boolean;
    config: CustomFieldConfigType;
    formControl: FormControl;

    get productId(): string | null {
        return this.route.snapshot.paramMap.get('id');
    }

    constructor(private route: ActivatedRoute) {}
}
