import { ChartComponent } from './components/chart/chart.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@vendure/admin-ui/core';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { CategoryService, DateTimeService, ScrollBarService, ColumnSeriesService, LineSeriesService, 
    ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService,LegendService, TooltipService
 } from '@syncfusion/ej2-angular-charts';

@NgModule({
    imports: [SharedModule, ChartModule],
    declarations: [ChartComponent],
    exports: [ChartComponent, SharedModule],
    providers: [ CategoryService, DateTimeService, ScrollBarService, LineSeriesService, ColumnSeriesService, 
        ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService,]
})
export class DailyOrdersSharedModule {}