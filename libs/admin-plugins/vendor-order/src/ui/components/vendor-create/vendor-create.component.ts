import {
  CreateVendor,
  CreateVendorInfo,
  CreateVendorContact,
  CreateVendorMarketingContact,
  CreateVendorBank,
} from "../../generated-types";
import { ActivatedRoute, Router } from "@angular/router";
import {Component, OnInit} from "@angular/core";
import { Observable } from "rxjs";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import {
  BaseDataService,
  DataService,
  GetAvailableCountries,
  NotificationService,
} from "@vendure/admin-ui/core";
import {
  CREATE_VENDOR,
  CREATE_VENDOR_INFO,
  CREATE_VENDOR_CONTACT,
  CREATE_VENDOR_BANK,
  CREATE_VENDOR_MARKETING_CONTACT,
} from "./vendor-create.graphql";
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

@Component({
  selector: "vdr-vendor-list",
  styleUrls: ["./vendor-create.component.scss"],
  templateUrl: "./vendor-create.component.html",
})
export class VendorCreateComponent {
  form: FormGroup;
  createVendorResponse: {
    vendor: any;
    vendorInfo: any;
    contact: any;
    marketingContact: any;
    banking: any;
  };
  typeOptions: any = ["CURRENT", "SAVING"];
  availableCountries$: Observable<GetAvailableCountries.Items[]>;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private route: ActivatedRoute,
    private baseDataService: BaseDataService,
    private notificationService: NotificationService,
  ) {
    this.availableCountries$ = this.dataService.settings
      .getAvailableCountries()
      .mapSingle((result) => result.countries.items);
    this.createVendorResponse = {
      vendor: null,
      vendorInfo: null,
      contact: null,
      marketingContact: null,
      banking: null,
    };
    this.form = this.formBuilder.group({
      vendor: this.formBuilder.group({
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: ["", Validators.email],
        phone: ["", Validators.required],
        GSTINID: ["", Validators.required],
        state: ["", Validators.required],
        // countryCode: ["", Validators.required],
        ownerName: ["", Validators.required],
        ownerEmail: ["", Validators.email],
      }),
      vendorInfo: this.formBuilder.group({
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
        staffEmail: ["", Validators.email],
        phone: ["", Validators.required],
      }),
      contact: this.formBuilder.group({
        contactName: ["", Validators.required],
        email: ["", Validators.email],
        phone: ["", Validators.required],
      }),
      marketingContact: this.formBuilder.group({
        name: ["", Validators.required],
        emailAddress: ["", Validators.email],
        phone: ["", Validators.required],
      }),
      banking: this.formBuilder.group({
        account: ["", Validators.required],
        code: ["", Validators.required],
        address: ["", Validators.required],
        type: ["", Validators.required],
        isCheck: "",
      }),
    });
  }

  async submit() {
    try {
      console.log(this.form.value);
      console.log(this.createVendorResponse);
      if (!this.createVendorResponse.vendor)
        this.createVendorResponse.vendor = await this.baseDataService
          .mutate<CreateVendor.Mutation, CreateVendor.Variables>(
            CREATE_VENDOR,
            {
              input: this.form.value.vendor,
            }
          )
          .toPromise();
      if (!this.createVendorResponse.vendorInfo)
        this.createVendorResponse.vendorInfo = await this.baseDataService
          .mutate<CreateVendorInfo.Mutation, CreateVendorInfo.Variables>(
            CREATE_VENDOR_INFO,
            {
              input: {
                ...this.form.value.vendorInfo,
                vendorId: this.createVendorResponse.vendor.createVendor.id,
              },
            }
          )
          .toPromise();
      if (!this.createVendorResponse.contact)
        this.createVendorResponse.contact = await this.baseDataService
          .mutate<CreateVendorContact.Mutation, CreateVendorContact.Variables>(
            CREATE_VENDOR_CONTACT,
            {
              input: {
                ...this.form.value.contact,
                vendorId: this.createVendorResponse.vendor.createVendor.id,
              },
            }
          )
          .toPromise();
      if (!this.createVendorResponse.marketingContact)
        this.createVendorResponse.marketingContact = await this.baseDataService
          .mutate<
            CreateVendorMarketingContact.Mutation,
            CreateVendorMarketingContact.Variables
          >(CREATE_VENDOR_MARKETING_CONTACT, {
            input: {
              ...this.form.value.marketingContact,
              vendorId: this.createVendorResponse.vendor.createVendor.id,
            },
          })
          .toPromise();
      if (!this.createVendorResponse.banking)
        this.createVendorResponse.banking = await this.baseDataService
          .mutate<CreateVendorBank.Mutation, CreateVendorBank.Variables>(
            CREATE_VENDOR_BANK,
            {
              input: {
                ...this.form.value.banking,
                vendorId: this.createVendorResponse.vendor.createVendor.id,
              },
            }
          )
          .toPromise();

      console.log("reactive form submit", this.form.value);
      // show notification
      this.notificationService.success(_('common.notify-create-success'), {
        entity: 'Vendor',
      });

      await this.router.navigate(['/vendor/vendor-management']);
    } catch (e) {
      console.log("go catch");
      this.notificationService.error(_('common.notify-add-error'), {
        entity: 'Vendor',
      });
      console.log(e);
    }
  }
}
