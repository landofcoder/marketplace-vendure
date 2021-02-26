import { NgModule } from '@angular/core';
import { SharedModule  } from '@vendure/admin-ui/core';
import { RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { ProductGridComponent } from "./components/product-grid/product-grid.component"

@NgModule({
  imports: [SharedModule,
      RouterModule.forChild([{
            path: 'products',
            pathMatch: 'full',
            component: ProductGridComponent,
            data: { breadcrumb: marker('breadcrumb.products'), },
        }]),
  ],
    declarations: [ProductGridComponent],
})

export class ProductManagementUiLazyModule {}
