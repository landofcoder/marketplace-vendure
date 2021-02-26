import { NgModule } from '@angular/core';
import { addNavMenuItem, registerCustomFieldComponent } from '@vendure/admin-ui/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@vendure/admin-ui/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

@NgModule({
    imports: [SharedModule],
    providers: [
    ],
    exports: [],
})

export class ProductManagementUiExtensionModule {}
