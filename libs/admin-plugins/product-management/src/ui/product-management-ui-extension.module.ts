import { NgModule } from '@angular/core';
import { addNavMenuItem, registerCustomFieldComponent } from '@vendure/admin-ui/core';
import { RouterModule } from '@angular/router';
import { SharedModule, addActionBarItem } from '@vendure/admin-ui/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { ProductStatusComponent } from './components/product-status/product-status.component';
import { of } from 'rxjs';
import { SET_PRODUCT_STATUS } from './components/product-status/set-product-status.graphql';

@NgModule({
    imports: [SharedModule],
    providers: [
        addActionBarItem({
            id: 'product-approval',
            label: 'Approval',
            locationId: 'product-detail',
            //buttonColor: 'primary',
            buttonStyle: 'outline',
            requiresPermission: 'SuperAdmin',
            onClick: (event, context) => {
                const productId = context.route.snapshot.paramMap.get('id');
                console.log('approval', productId);
                return context.dataService.mutate<any, any>(SET_PRODUCT_STATUS, {
                    productID: productId,
                    status: 'Approval'
                }).subscribe(
                    (data) => {
                        if (data && data.setProductStatus) {
                        context.notificationService.success('Update Product Sucess', {  entity: 'Product'});
                        location.reload();
                        } else {
                            context.notificationService.error('Update Product Error', {  entity: 'Product'});
                        }
                    }
                );
            },
            //disabled: of(true),
        }),
        addActionBarItem({
            id: 'product-reject',
            label: 'Reject',
            locationId: 'product-detail',
            //buttonColor: 'primary',
            buttonStyle: 'outline',
            requiresPermission: 'SuperAdmin',
            onClick: (event, context) => {
                const productId = context.route.snapshot.paramMap.get('id');
                console.log('reject', productId);
                return context.dataService.mutate<any, any>(SET_PRODUCT_STATUS, {
                    productID: productId,
                    status: 'Reject'
                }).subscribe(
                    (data) => {
                        if(data && data.setProductStatus){
                            context.notificationService.success('Update Product Sucess', {  entity: 'Product'});
                            location.reload();
                        } else {
                            context.notificationService.error('Update Product Error', {  entity: 'Product'});
                        }
                        
                    }
                );
            },
            //disabled: of(false),
        }),
        addNavMenuItem(
            {
                id: 'seo-config',
                label: 'SEO Config',
                routerLink: ['/settings/config/seo'],
                icon: 'setting',
            },
            'settings',
        ),
        registerCustomFieldComponent('Product', 'status', ProductStatusComponent),
    ],
    exports: [],
})

export class ProductManagementUiExtensionModule {}
