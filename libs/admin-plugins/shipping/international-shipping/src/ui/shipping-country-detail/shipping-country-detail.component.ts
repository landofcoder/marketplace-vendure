import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import {
    BaseDetailComponent,
    DataService,
    LanguageCode,
    NotificationService,
    ServerConfigService,
    GetAvailableCountries
} from '@vendure/admin-ui/core';
import { combineLatest, Observable } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import {
    CreateShippingCountry,
    CreateShippingCountryInput,
    ShippingCountryPrice,
    UpdateShippingCountry,
    UpdateShippingCountryInput
} from '../generated-types';
import {CREATE_SHIPPING_COUNTRY, UPDATE_SHIPPING_COUNTRY} from "./shipping-country-detail.graphql";

@Component({
    selector: 'vdr-shipping-country-detail',
    templateUrl: './shipping-country-detail.component.html',
    styleUrls: ['./shipping-country-detail.component.scss'],
})
export class ShippingCountryDetailComponent
    extends BaseDetailComponent<ShippingCountryPrice>
    implements OnInit, OnDestroy {
    country$: Observable<ShippingCountryPrice>;
    detailForm: FormGroup;
    availableCountries$: Observable<GetAvailableCountries.Items[]>;

    constructor(
        router: Router,
        route: ActivatedRoute,
        serverConfigService: ServerConfigService,
        private changeDetector: ChangeDetectorRef,
        protected dataService: DataService,
        private formBuilder: FormBuilder,
        private notificationService: NotificationService,
    ) {
        super(route, router, serverConfigService, dataService);
        this.availableCountries$ = this.dataService.settings
            .getAvailableCountries()
            .mapSingle((result) => result.countries.items);
        this.detailForm = this.formBuilder.group({
            id: '',
            country_code: '',
            country_name: '',
            price: [0, Validators.required]
        });
    }

    ngOnInit() {
        this.init();
        this.country$ = this.entity$;
    }

    ngOnDestroy(): void {
        this.destroy();
    }

    create() {
        if (!this.detailForm.dirty) {
            return;
        }
        const formValue = this.detailForm.value;
        const input: CreateShippingCountryInput = {
            country_code: formValue.country_code,
            price: formValue.price,
        };
        this.dataService
            .mutate<CreateShippingCountry.Mutation, CreateShippingCountry.Variables>(CREATE_SHIPPING_COUNTRY, {
                input,
            })
            .subscribe(
                data => {
                    this.notificationService.success(_('common.notify-create-success'), {
                        entity: 'ShipingCountry',
                    });
                    this.detailForm.markAsPristine();
                    this.changeDetector.markForCheck();
                    this.router.navigate(['../', data.createShippingCountry.id], { relativeTo: this.route });
                },
                err => {
                    this.notificationService.error(_('common.notify-create-error'), {
                        entity: 'ShippingCountry',
                    });
                },
            );
    }

    save() {
        const formValue = this.detailForm.value;
        const input: UpdateShippingCountryInput = {
            id: formValue.id,
            price: formValue.state
        };
        this.dataService
            .mutate<UpdateShippingCountry.Mutation, UpdateShippingCountry.Variables>(UPDATE_SHIPPING_COUNTRY, {
                input,
            })
            .subscribe(
                data => {
                    this.notificationService.success(_('common.notify-update-success'), {
                        entity: 'ShippingCountry',
                    });
                    this.detailForm.markAsPristine();
                    this.changeDetector.markForCheck();
                },
                err => {
                    this.notificationService.error(_('common.notify-update-error'), {
                        entity: 'ShippingCountry',
                    });
                },
            );
    }

    protected setFormValues(country: ShippingCountryPrice, languageCode: LanguageCode): void {

        this.detailForm.patchValue({
            id: country.id,
            country_code: country.country_code,
            country_name: country.country_name,
            price: country.price
        });
    }
}
