import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { SharedModule, registerCustomFieldComponent } from '@vendure/admin-ui/core';
import { NgModule } from '@angular/core';
import { ProductRecommendationsComponent } from './components/recommendations/product-recommendations.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
    imports: [SharedModule, NgSelectModule, FormsModule, BrowserModule],
    declarations: [ProductRecommendationsComponent],
    providers: [
        registerCustomFieldComponent(
            "Product",
            "productRecommendationsEnabled",
            ProductRecommendationsComponent
        ),
    ]
})
export class ProductRecommendationsSharedModule {}