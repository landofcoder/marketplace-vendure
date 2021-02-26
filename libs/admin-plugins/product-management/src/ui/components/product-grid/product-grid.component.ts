import { Component, OnInit, ViewChild, ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';
import {
    BaseListComponent,
    DataService,
    ModalService,
    NotificationService,
} from '@vendure/admin-ui/core';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { Observable, EMPTY, forkJoin, combineLatest } from 'rxjs';
import { takeUntil, switchMap, map, debounceTime } from 'rxjs/operators';
import { GetProductListCustomize } from '../../generated-types';
import { GET_PRODUCT_LIST } from './product-grid.graphql';
import { FormControl } from '@angular/forms';
import { PaginationInstance } from 'ngx-pagination';

@Component({
    selector: 'bav-product-grid',
    templateUrl: './product-grid.component.html',
    styleUrls: ['./product-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ProductGridComponent extends BaseListComponent<
    GetProductListCustomize.Query,
    GetProductListCustomize.Items,
    GetProductListCustomize.Variables
    > implements OnInit {

    paginationConfig$: Observable<PaginationInstance>;
    selected: any[] = [];
    searchTerm = new FormControl('');
    status: string | null = '';
    stock: string | null = '';

    constructor(
        private dataService: DataService,
        private modalService: ModalService,
        private notificationService: NotificationService,
        router: Router,
        route: ActivatedRoute) {
        super(router, route);
        super.setQueryFn(
            (...args: any[]) => {
                return this.dataService.query<GetProductListCustomize.Query>(GET_PRODUCT_LIST, args).refetchOnChannelChange();
            },
            (data) => data.productGrid,
            (skip, take) => {
                return {
                    options: {
                        skip,
                        take,
                        filter: {
                            ...(this.searchTerm.value && {name: { contains: this.searchTerm.value } }),
                            ...(this.status && {enabled: {eq: (this.status === "true")}}),
                            ...(this.stock && {isInStock: {eq: (this.stock === "true")}})
                        },
                    },
                };
            },
        );
    }

    ngOnInit() {
        super.ngOnInit();
        this.paginationConfig$ = combineLatest(this.itemsPerPage$, this.currentPage$, this.totalItems$).pipe(
            map(([itemsPerPage, currentPage, totalItems]) => ({ itemsPerPage, currentPage, totalItems })),
        );
        this.searchTerm.valueChanges
            .pipe(debounceTime(250), takeUntil(this.destroy$))
            .subscribe(() => this.refresh());
    }


    saveProduct(rowData: any) {
        const variantInputs = rowData.variants
        this.modalService
            .dialog({
                title: _('Save Product'),
                buttons: [
                    {type: 'secondary', label: _('common.cancel'), returnValue: false},
                    {type: 'danger', label: _('Save'), returnValue: true},
                ],
            })//this.productDetailService.updateProduct(productInput, variantsInput);, this.dataService.product.updateProductVariants(variantInputs)
            .pipe(
                switchMap(response => (
                    response ? forkJoin([this.dataService.product.updateProduct(rowData), this.dataService.product.updateProductVariants(variantInputs)]) : EMPTY
                    )
                )
            )
            .subscribe(() => {
                this.notificationService.success(_('common.notify-update-success'), {
                    entity: 'Product',
                });
                this.refresh();
            }, err => {
                this.notificationService.error(_('common.notify-update-error'), {
                    entity: 'Product',
                });
            });
    }

    saveAllChange(){
        if(this.selected.length>0) {
            let arrVariants = this.selected.map(o => o.variants);
            let variantInputs = [].concat.apply([], arrVariants);
            let apiUpdate:Array<Observable<any>> = this.selected.map(o => this.dataService.product.updateProduct(o));
            apiUpdate.push(this.dataService.product.updateProductVariants(variantInputs));
            this.modalService
                .dialog({
                    title: _('Save All Product'),
                    buttons: [
                        {type: 'secondary', label: _('common.cancel'), returnValue: false},
                        {type: 'danger', label: _('Save'), returnValue: true},
                    ],
                })
                .pipe(
                    switchMap(response => (
                            response ? forkJoin(apiUpdate) : EMPTY
                        )
                    )
                )
                .subscribe(() => {
                    this.notificationService.success(_('common.notify-update-success'), {
                        entity: 'Product',
                    });
                    this.refresh();
                }, err => {
                    this.notificationService.error(_('common.notify-update-error'), {
                        entity: 'Product',
                    });
                });
        }else{
            this.notificationService.error('Please choose product',{
                entity: 'Product'
            });
        }
    }

    deleteProduct(productId: any) {
        this.modalService
            .dialog({
                title: _('catalog.confirm-delete-product'),
                buttons: [
                    {type: 'secondary', label: _('common.cancel')},
                    {type: 'danger', label: _('common.delete'), returnValue: true},
                ],
            })
            .pipe(switchMap(response => (response ? this.dataService.product.deleteProduct(productId) : EMPTY)))
            .subscribe(() => {
                this.notificationService.success(_('common.notify-delete-success'), {
                    entity: 'Product',
                });
                this.refresh();
            }, err => {
                this.notificationService.error(_('common.notify-delete-error'), {
                    entity: 'Product',
                });
            });
    }

}
