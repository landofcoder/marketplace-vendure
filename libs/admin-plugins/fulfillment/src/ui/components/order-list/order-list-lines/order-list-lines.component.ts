import { ChangeDetectionStrategy, Input, Component, SimpleChanges } from '@angular/core';
import { OrderDetailComponent } from '@vendure/admin-ui/order';
import { LanguageCode } from '@vendure/core';
import { combineLatest, Observable, of } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, switchMap, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'vdr-order-list-lines',
    templateUrl: './order-list-lines.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListLinesComponent extends OrderDetailComponent {
    @Input('order-id') id: string;

    entity$: Observable<any>;
    init() {}
    ngOnInit() {
        if(this.id){
            this.entity$ = this.dataService.order.getOrder(this.id).single$.pipe(
                map(data  => data.order),
                shareReplay(1),
            );
            this.isNew$ = this.entity$.pipe(
                map((entity) => entity.id === ''),
                shareReplay(1),
            );
            this.languageCode$ = this.route.paramMap.pipe(
                map((paramMap) => paramMap.get('lang')),
                switchMap((lang) => {
                    if (lang) {
                        return of(lang as LanguageCode);
                    } else {
                        return this.dataService.settings
                            .getActiveChannel()
                            .mapSingle((data) => data.activeChannel.defaultLanguageCode);
                    }
                }),
                distinctUntilChanged(),
                shareReplay(1),
            );
    
            combineLatest(this.entity$, this.languageCode$)
                .pipe(takeUntil(this.destroy$))
                .subscribe(([order, languageCode]) => {
                    this.setFormValues(order);
                    this.detailForm.markAsPristine();
                });
            super.ngOnInit();
        }
    }
    ngOnChanges(changes: SimpleChanges) {
        this.ngOnInit();
    }
}