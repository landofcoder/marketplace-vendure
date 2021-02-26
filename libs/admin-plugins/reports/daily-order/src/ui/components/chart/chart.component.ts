import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent, DataService, BaseDataService, NotificationService, Order } from '@vendure/admin-ui/core';
import { Component, OnInit, Input } from '@angular/core';
import { DataDemo, formatData } from './data';
import * as FileSaver from 'file-saver';
import { DAILY_ORDERS, DAILY_ORDERS_QUERY } from '../../providers/routing/daily-order-resolver.graphql';
import { DailyOrders, TestDailyOrders } from '../../generated-types';
import { Apollo } from 'apollo-angular';
import { FormGroup, Validators, FormBuilder, FormControl } from "@angular/forms";
import { takeUntil, switchMap, map, debounceTime } from 'rxjs/operators';
@Component({
    selector: 'chart-element',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})
export class ChartComponent extends BaseListComponent
<TestDailyOrders.Query, TestDailyOrders.Items, TestDailyOrders.Variables>
implements OnInit {
    form: FormGroup;
    searchTerm = new FormControl('');
    constructor (
        private formBuilder: FormBuilder,
        router: Router,
        private dataService: DataService,
        route: ActivatedRoute,
        private baseDataService: BaseDataService,
        private notificationService: NotificationService,

    ){
        super(router, route);
        super.setQueryFn(
            (...args: any[]) => {
                return this.dataService.query<TestDailyOrders.Query>(
                    DAILY_ORDERS_QUERY,
                    {
                        input: {
                            month: `${this.month}`,
                            year: `${this.yearn}`,
                            state: "AddingItems"
                        }
                    }
                ).refetchOnChannelChange();
            },
            (data: any) => data.testDailyOrders
        )
        this.form  = this.formBuilder.group({
            month: '',
            year: '',
            state: ''
        })
        
    }
    filteredType: string | null = 'html';
    values = ''
    month = 'month'
    yearn = new Date().getFullYear()
    currentYear = new Date().getFullYear()
    percent = 20;
    async submit() {
        try {
            const response = await this.dataService.query<TestDailyOrders.Query, TestDailyOrders.Variables>(
                DAILY_ORDERS_QUERY,
                {
                    input: {
                        month: `${this.month}`,
                        year: `${this.yearn}`,
                        state: "AddingItems"
                    }
                }
            ).refetchOnChannelChange()
            .mapStream(o => o.testDailyOrders)
            .subscribe(x => {
                console.log(x)
                x != null && x.items ? this.chartData = formatData(x.items) : null ;
            });
        }
        catch(e) {
            this.notificationService.error(e)
            console.log(e);
        }
    }
    title = 'Order Statistics'
    onKey(value: string) {
        this.values = value;
    }
    onChangeHandle (value) {
        window.alert(value)
    }
    monthOnChange(value) {
        this.month = value
        this.submit()
    }
    yearnOnChange(value) {
        this.yearn = value
        this.submit()
    }
    public primaryXAxis: Object | undefined;
    public chartData: Object[] | undefined;
    public marker: Object | undefined;
    public tooltip: Object | undefined;
    blobType: string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    ngOnInit() {
        const res = super.ngOnInit();
        this.searchTerm.valueChanges.pipe(debounceTime(250), takeUntil(this.destroy$)).subscribe(() => this.refresh());
        
        this.submit()
        this.primaryXAxis = {
            valueType: 'Category',
        };
        this.tooltip = { enable: true, header: 'Total Orders', format: '<b>${point.x} : ${point.y}</b>' };
        this.marker = { visible: true, width: 10, height: 10 };
    }
    exportExcel() {
        const excel = require('exceljs');
    const fixed_data = this.chartData;

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet('orderStatistics');
    if (this.month === 'month') {
        worksheet.columns = [
            {header: 'Month', key: 'label', width: 10},
            {header: 'Total Orders', key: 'totalOrders', width: 30},
        ]
    }
    else {
        worksheet.columns = [
            {header: 'Day', key: 'label', width: 10},
            {header: 'Total Orders', key: 'totalOrders', width: 30},
            {header: 'Month', key: 'month', width: 10},
        ]
    }
    // worksheet.columns = [
    //     {header: 'Month', key: 'label', width: 10},
    //     {header: 'Total Orders', key: 'totalOrders', width: 30},
    //     {header: 'Day', key: 'day', width: 10},
    // ]
    worksheet.getColumn(1).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getColumn(2).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getColumn(3).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.addRows(fixed_data);
    workbook.xlsx.writeBuffer().then((data: BlobPart) => {
        const blob = new Blob([data], { type: this.blobType }); 
        FileSaver.saveAs(blob, 'order_statistics.csv');
       });
    }

}