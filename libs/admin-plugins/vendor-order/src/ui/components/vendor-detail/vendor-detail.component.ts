import { pick } from '@vendure/common/lib/pick';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import {
    LanguageCode,
    ModalService,
    NotificationService,
    DataService,
    ServerConfigService,
    BaseDataService,
    BaseDetailComponent,
    GetAvailableCountries
} from '@vendure/admin-ui/core';

import {EMPTY, forkJoin, Observable} from 'rxjs';
import {map, mergeMap, switchMap, take} from 'rxjs/operators';
import { ClrTabs } from '@clr/angular';
import {
    Scalars,
    UpdateVendor,
    VendorDetail, VendorDetailFragment,
} from "../../generated-types";
import {
    UPDATE_VENDOR,
    UPDATE_VENDOR_BANK,
    UPDATE_VENDOR_CONTACT,
    UPDATE_VENDOR_INFO,
    UPDATE_VENDOR_MARKETING_CONTACT
} from "./vendor-detail.graphql";


@Component({
    selector: 'vdr-vendor-detail',
    templateUrl: './vendor-detail.component.html',
    styleUrls: ['./vendor-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VendorDetailComponent extends BaseDetailComponent<VendorDetailFragment> implements OnInit, OnDestroy{
    detailForm: FormGroup;
    roles$: Observable<VendorDetail.Roles[]>;
    availableCountries$: Observable<GetAvailableCountries.Items[]>;
    typeOptions: any = ["CURRENT", "SAVING"];

    // @ts-ignore
    @ViewChild(ClrTabs) private readonly tabs: ClrTabs;

    constructor(
        route: ActivatedRoute,
        router: Router,
        protected serverConfigService: ServerConfigService,
        private changeDetector: ChangeDetectorRef,
        protected dataService: DataService,
        private formBuilder: FormBuilder,
        private notificationService: NotificationService,
        private modalService: ModalService,
        private baseDataService: BaseDataService
    ) {
        super(route, router, serverConfigService, dataService);
        this.availableCountries$ = this.dataService.settings
            .getAvailableCountries()
            .mapSingle((result) => result.countries.items);
        this.detailForm = this.formBuilder.group({
            vendor: this.formBuilder.group({
                id: ["", Validators.required],
                firstName: ["", Validators.required],
                lastName: ["", Validators.required],
                email: ["", Validators.required],
                phone: ["", Validators.required],
                GSTINID: ["", Validators.required],
                state: ["", Validators.required],
                ownerName: ["", Validators.required],
                ownerEmail: ["", [Validators.required, Validators.email]],
                verified: false,
            }),
            vendorInfo: this.formBuilder.array([this.formBuilder.group({
                id: ["", Validators.required],
                brandName: ["", Validators.required],
                regAddress: ["", Validators.required],
                panno: ["", Validators.required],
                GSTINID: ["", Validators.required],
                state: ["", Validators.required],
                postalCode: ["", Validators.required],
                city: ["", Validators.required],
                countryCode: ["", Validators.required],
                ADHAR: ["", Validators.required],
                aboutUs: ["", Validators.required],
                staffEmail: ["", [Validators.required, Validators.email]],
                phone: ["", Validators.required],
            })]),
            contacts: this.formBuilder.array([this.formBuilder.group({
                id: ["", Validators.required],
                contactName: ["", Validators.required],
                email: ["", [Validators.required, Validators.email]],
                phone: ["", Validators.required],
            })]),
            marketingContact: this.formBuilder.array([this.formBuilder.group({
                id: ["", Validators.required],
                name: ["", Validators.required],
                emailAddress: ["", [Validators.required, Validators.email] ],
                phone: ["", Validators.required],
            })]),
            banks: this.formBuilder.array([this.formBuilder.group({
                id: ["", Validators.required],
                account: ["", Validators.required],
                code: ["", Validators.required],
                address: ["", Validators.required],
                type: ["", Validators.required],
                isCheck: "",
            })]),
        });

    }

    ngOnInit() {
        this.init();
        this.roles$ = this.entity$.pipe(map(v => v.user.roles));
    }

    ngOnDestroy() {
        this.destroy();
    }

    saveButtonEnabled(): boolean {
        return this.detailForm.dirty && this.detailForm.valid;
    }

    save(){

        const vendor =  this.detailForm.get('vendor') as FormGroup;
        const vendorInfo =  this.detailForm.get('vendorInfo') as FormArray;
        const contacts =  this.detailForm.get('contacts') as FormArray;
        const marketingContact =  this.detailForm.get('marketingContact') as FormArray;
        const banks =  this.detailForm.get('banks') as FormArray;

        let changes: any[] = [];
        if(vendor.dirty){
            // push to changes
            let apiUpdateVendor = this.baseDataService.mutate<UpdateVendor.Mutation, UpdateVendor.Variables>(
                UPDATE_VENDOR,
                {
                    input: pick(vendor.value, ['id', 'firstName', 'lastName', 'email', 'phone', 'GSTINID', 'state', 'ownerName', 'ownerEmail']),
                 });
            changes.push(apiUpdateVendor);
        }

        if(vendorInfo.dirty){
            // check change in array vendor info
            for(let info of vendorInfo.controls){
                // add in changes
                if(info.dirty){
                    let apiUpdateVendorInfo = this.baseDataService.mutate(UPDATE_VENDOR_INFO, {input: info.value as any});
                    changes.push(apiUpdateVendorInfo);
                }
            }
        }

        if(contacts.dirty){
            // check change in array vendor contact
            for(let contact of contacts.controls){
                // add in changes
                if(contact.dirty){
                    let apiUpdateVendorContact = this.baseDataService.mutate(UPDATE_VENDOR_CONTACT, {input: contact.value as any});
                    changes.push(apiUpdateVendorContact);
                }
            }
        }

        if(marketingContact.dirty){
            // check change in array vendor marketing contact
            for(let marketing of marketingContact.controls){
                // add in changes
                if(marketing.dirty){
                    let apiUpdateMarkingContact = this.baseDataService.mutate(UPDATE_VENDOR_MARKETING_CONTACT, {input: marketing.value as any});
                    changes.push(apiUpdateMarkingContact);
                }
            }
        }

        if(banks.dirty){
            // check change in array vendor marketing contact
            for(let bank of banks.controls){
                // add in changes
                if(bank.dirty){
                    let apiUpdateBank = this.baseDataService.mutate(UPDATE_VENDOR_BANK, {input: bank.value as any});
                    changes.push(apiUpdateBank);
                }
            }
        }

        this.modalService
            .dialog({
                title: _('Save Vendor'),
                buttons: [
                    {type: 'secondary', label: _('common.cancel'), returnValue: false},
                    {type: 'danger', label: _('Save'), returnValue: true},
                ],
            })
            .pipe(
                switchMap(response => (
                        response ? forkJoin(changes) : EMPTY
                    )
                )
            )
            .subscribe(() => {
                this.notificationService.success(_('common.notify-update-success'), {
                    entity: 'Vendor',
                });
                this.detailForm.markAsPristine();
                this.changeDetector.markForCheck();
            }, err => {
                this.notificationService.error(_('common.notify-update-error'), {
                    entity: 'Vendor',
                });
            });

    }
    get vendorInfo() {
        return this.detailForm.get('vendorInfo') as FormArray;
    }

    get contacts() {
        return this.detailForm.get('contacts') as FormArray;
    }

    get marketingContact() {
        return this.detailForm.get('marketingContact') as FormArray;
    }

    get banks() {
        return this.detailForm.get('banks') as FormArray;
    }

    protected setFormValues(entity: VendorDetailFragment, languageCode: LanguageCode){
        this.detailForm.patchValue({
            vendor: {
                id: entity.id,
                verified: entity.verified,
                firstName: entity.firstName,
                lastName: entity.lastName,
                email: entity.email,
                phone: entity.phone,
                GSTINID: entity.GSTINID,
                state: entity.state,
                ownerName: entity.ownerName,
                ownerEmail: entity.ownerEmail,
            },
            vendorInfo: entity.info,
            contacts: entity.contacts,
            marketingContact: entity.marketing,
            banks: entity.banks
        });
    }
}
