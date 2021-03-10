import { NgModule } from '@angular/core';
import { SharedModule  } from '@vendure/admin-ui/core';
import { RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { ProductGridComponent } from "./components/product-grid/product-grid.component"
import { SEOConfigComponent } from './components/config-seo/config-seo.component';

@NgModule({
  imports: [SharedModule,
      RouterModule.forChild([
        {
            path: 'catalog/products',
            component: ProductGridComponent,
            data: { breadcrumb: marker('breadcrumb.products'), },
        },
        {
          path: 'settings/config/seo',
          pathMatch: '',
          component: SEOConfigComponent,
          data: {
              breadcrumb: marker('seo_config.breadcrumb'),
          },
        }
      ]),
  ],
    declarations: [ProductGridComponent, SEOConfigComponent],
})

export class ProductManagementUiLazyModule {}
