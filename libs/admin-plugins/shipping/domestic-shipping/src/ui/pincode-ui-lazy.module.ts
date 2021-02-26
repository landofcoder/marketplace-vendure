import { NgModule, } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SharedModule, createResolveData, CanDeactivateDetailGuard  } from '@vendure/admin-ui/core';
import { AllPincodeListComponent } from './components/all-pincode-list/all-pincode-list.component';
import { PincodeDetailComponent } from './components/pincode-detail/pincode-detail.component';
import { GetPincode } from './generated-types';
import { PincodeDetailResolver } from './providers/routing/pincode-detail-resolver';


@NgModule({
    imports: [SharedModule,
        RouterModule.forChild([
            {
              path: 'pincodes/pincode-management',
              pathMatch: 'full',
              component: AllPincodeListComponent,
              data: { breadcrumb: 'pincodes', },
            },
            {
                path: 'pincodes/pincode/:id',
                pathMatch: '',
                component: PincodeDetailComponent,
                resolve: createResolveData(PincodeDetailResolver),
                canDeactivate: [CanDeactivateDetailGuard],
                data: {
                    breadcrumb: pincodeDetailBreadcrumb
                },
            },
            {
                path: 'pincodes/pincode/create',
                component: PincodeDetailComponent,
                data: { breadcrumb: 'create', },
            },
        ]),
    ],
    declarations: [
        PincodeDetailComponent,
        AllPincodeListComponent,
    ],
  })


export class PincodeUiLazyModule {}

export function pincodeDetailBreadcrumb(resolved: { entity: Observable<GetPincode.Pincode> }) {
    return resolved.entity.pipe(
        map(entity => {
            if (entity.pincode === 0){
                return [
                    {
                        label: 'Pincodes',
                        link: ['/pincodes'],
                    },
                    {
                        label: 'create',
                        link: [],
                    },
                ]
            } else {
                return [
                    {
                        label: 'Pincodes',
                        link: ['/pincodes'],
                    },
                    {
                        label: `${entity.pincode}`,
                        link: [],
                    },
                ]
            }
        }),
    );
}
