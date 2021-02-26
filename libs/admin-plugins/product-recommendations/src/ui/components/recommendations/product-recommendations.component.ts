import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CustomFieldControl, CustomFieldConfigType, DataService } from '@vendure/admin-ui/core';
import { ID } from '@vendure/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import { ProductRecommendations, UpdateRecommendations } from '../../generated-types';
import { PRODUCT_RECOMMENDATIONS, UPDATE_RECOMMENDATIONS } from '../provider/routing/product-recommendations-resolver.graphql';
import { notify } from "@bavaan/ui-devkit";
import { distinctUntilChanged, switchMap, tap } from "rxjs/operators";
import { NotificationService } from '@vendure/admin-ui/core';

type ProductSearch = {
    search: { items: { productId: ID; productName: string }[] };
};
@Component({
    selector: 'product-recommendations',
    templateUrl: './product-recommendations.html',
    styleUrls: ['./product-recommendations.css']
})
export class ProductRecommendationsComponent implements CustomFieldControl, OnInit, OnDestroy {
    productId: ID | null;

    config: CustomFieldConfigType;
    readonly: boolean;
    formControl: FormControl;
    crossSell: { productId: ID; productName: string }[];
    upSell: { productId: ID; productName: string }[];
    productSearchUpSell$: Observable<ProductSearch>;
    productSearchCrossSell$: Observable<ProductSearch>;
    upSellLoading = true;
    crossSellLoading = true;
    productInput$ = new Subject<string>();

    constructor(
        private route: ActivatedRoute,
        private dataService: DataService,
        private cdr: ChangeDetectorRef,
        private notificationService: NotificationService
    ) {
        this.crossSell = [];
        this.upSell = [];
    }

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap) => {
            this.productId = paramMap.get("id");
            if (this.productId) {
                this.dataService.query<ProductRecommendations.Query, ProductRecommendations.Variables>(
                    PRODUCT_RECOMMENDATIONS,
                    {
                        productId: this.productId
                    }
                )
                .single$.toPromise()
                .then((response) => {
                    console.log(response)
                    const res = <
                        {
                            productRecommendations: {
                                type: "CROSSSELL" | "UPSELL";
                                recommendation: {
                                    id: ID;
                                    name: string;
                                };
                            }[];
                        }
                        >response;

                    this.crossSell = res.productRecommendations
                        .filter((r) => r.type === "CROSSSELL")
                        .map((r) => ({
                            productId: r.recommendation.id,
                            productName: r.recommendation.name,
                        }));
                    this.upSell = res.productRecommendations
                        .filter((r) => r.type === "UPSELL")
                        .map((r) => ({
                            productId: r.recommendation.id,
                            productName: r.recommendation.name,
                        }));

                    this.crossSellLoading = false;
                    this.upSellLoading = false;
                    this.cdr.detectChanges();

                    //enable search
                    this.searchProducts();
                })
                .catch((e) => {
                    notify({
                        message:
                            "Product recommendations couldn't be fetched. Check the console.",
                        type: "error",
                    });
                    console.error(e);
                });
            }
        })
    }
    ngOnDestroy() { }
    searchProducts() {
        this.productSearchUpSell$ = this.productInput$.pipe(
            distinctUntilChanged(),
            tap(() => (this.upSellLoading = true)),
            switchMap((term) =>
                this.dataService.product
                    .searchProducts(term)
                    .stream$.pipe(tap(() => (this.upSellLoading = false)))
            )
        );
        this.productSearchCrossSell$ = this.productInput$.pipe(
            distinctUntilChanged(),
            tap(() => (this.crossSellLoading = true)),
            switchMap((term) =>
                this.dataService.product
                    .searchProducts(term)
                    .stream$.pipe(tap(() => (this.crossSellLoading = false)))
            )
        );
    }
    saveProductRecommendations() {
        if (this.productId) {
            this.dataService.mutate<UpdateRecommendations.Mutation>(
                UPDATE_RECOMMENDATIONS,
                {
                    productId: this.productId,
                    crossSellIds: this.crossSell.map((r) => r.productId),
                    upSellIds: this.upSell.map((r) => r.productId),
                }
            )
            .toPromise()
            .then(() =>
                this.notificationService.success("Update product recommendations successfully")
            )
            .catch((e) => {
                this.notificationService.error("Update product recommendations successfully")
                console.error(e);
            });
        }
    }
}