import { NgModule } from '@angular/core';
import { SharedModule } from '@vendure/admin-ui/core';

@NgModule({
    imports: [SharedModule, SharedModule],
    exports: [SharedModule],
})
export class ContactsSharedModule {}
