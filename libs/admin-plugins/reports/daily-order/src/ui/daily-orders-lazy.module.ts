import { RouterModule } from '@angular/router';
import { DailyOrdersSharedModule } from './daily-orders-shared.module';
import { ChartComponent } from './components/chart/chart.component';
import { NgModule } from '@angular/core';
@NgModule({
    imports: [
        DailyOrdersSharedModule,
        RouterModule.forChild([
            {
                path: '',
                pathMatch: 'full',
                component: ChartComponent,
                data: {
                    breadcrumb: [
                        {
                            label: 'Daily Orders',
                            link: [],
                        },
                    ],
                },
            }
        ])
    ],
    declarations: [],
    providers: [],

})
export class DailyOrderLazyModule {}