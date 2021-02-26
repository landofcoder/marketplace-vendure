import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
    BaseDetailComponent,
    DataService,
    NotificationService,
    ServerConfigService,
} from '@vendure/admin-ui/core';
import { Observable, of } from 'rxjs';

import {
    Pincode,
    UpdatePincodeInput,
    UpdatePincode,
    CreatePincodeInput,
    CreatePincode,
    CheckPincode, GetPincode
} from '../../generated-types';
import {UPDATE_PINCODE, CREATE_PINCODE} from "./pincode-detail.graphql";
import {CHECK_PINCODE} from "../all-pincode-list/all-pincode-list.graphql";
import {GET_PINCODE} from "../../providers/routing/pincode-detail-resolver.graphql";

@Component({
    selector: 'kb-pincode-detail',
    templateUrl: './pincode-detail.component.html',
    styleUrls: ['./pincode-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class PincodeDetailComponent extends BaseDetailComponent<Pincode.Fragment>
    implements OnInit {
    detailForm: FormGroup;
    checkPincodeResult: any;
    pincodeDetail: any;
    checkPincode: any;
    updatePincode: any;
    pincodeId: any;

    constructor(
        route: ActivatedRoute,
        router: Router,
        serverConfigService: ServerConfigService,
        private formBuilder: FormBuilder,
        protected dataService: DataService,
        private changeDetector: ChangeDetectorRef,
        private notificationService: NotificationService,
    ) {
        super(route, router, serverConfigService, dataService);
        this.detailForm = this.formBuilder.group({
            pincode: ['', Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(6),
                Validators.pattern("^[0-9]*$"),
            ]),],
            state: ['', Validators.required],
            district: ['', Validators.required],
            prepaid: [true, Validators.required],
            cod: [true, Validators.required],
            pickup: [true, Validators.required],
            cash: [true, Validators.required],
            repl: [true, Validators.required]
        });
    }

    ngOnInit(): void {
        this.init();
        if (this.id){
            this.updatePincode = true;
        }
        this.dataService.mutate<GetPincode.Query, GetPincode.Variables>(GET_PINCODE, {
            id: this.id
        }).subscribe((data) => {
            data != null && data.pincode ? this.pincodeDetail = data.pincode.pincode : null;
        });
    }

    save() {
        if(this.id){
            if (this.detailForm.dirty) {
                const formValue = this.detailForm.value;
                const input: UpdatePincodeInput = {
                    id: this.id,
                    pincode: parseInt(formValue.pincode),
                    state: formValue.state,
                    district: formValue.district,
                    prepaid: formValue.prepaid,
                    cod: formValue.cod,
                    pickup: formValue.pickup,
                    cash: formValue.cash,
                    repl: formValue.repl
                };
                return this.dataService
                    .mutate<UpdatePincode.Mutation, UpdatePincode.Variables>(UPDATE_PINCODE, {
                        input,
                    }).subscribe(
                        (data) => {
                            this.detailForm.markAsPristine();
                            this.changeDetector.markForCheck();
                            this.notificationService.success('common.notify-update-success', {
                                entity: 'Pincode',
                            });
                        },
                        () => {
                            this.notificationService.error('common.notify-update-error', {
                                entity: 'Pincode',
                            });
                        },
                    );
            } else {
                return of(false);
            }
        }else{
            if (this.detailForm.dirty) {
                const formValue = this.detailForm.value;
                const input: CreatePincodeInput = {
                    pincode: parseInt(formValue.pincode),
                    state: formValue.state,
                    district: formValue.district,
                    prepaid: formValue.prepaid,
                    cod: formValue.cod,
                    pickup: formValue.pickup,
                    cash: formValue.cash,
                    repl: formValue.repl
                };
                this.dataService.mutate<CheckPincode.Query, CheckPincode.Variables>(CHECK_PINCODE, {
                    pincode: {
                        pincode: parseInt(formValue.pincode)
                    }
                }).subscribe((data) => {
                    data != null && data.checkPincode ? this.checkPincodeResult = data.checkPincode : null;
                    if(!this.checkPincodeResult){
                        return this.dataService
                            .mutate<CreatePincode.Mutation, CreatePincode.Variables>(CREATE_PINCODE, {
                                input,
                            })
                            .subscribe(
                                (data) => {
                                    this.detailForm.markAsPristine();
                                    this.changeDetector.markForCheck();
                                    this.notificationService.success('common.notify-create-success', {
                                        entity: 'Pincode',
                                    });
                                    // this.router.navigate(['../', data.createPincode.id], {
                                    //     relativeTo: this.route
                                    // });
                                    this.pincodeId = data.createPincode.id;
                                },
                                () => {
                                    this.notificationService.error('common.notify-create-error', {
                                        entity: 'Pincode',
                                    });
                                },
                            );
                    }else {
                        this.notificationService.error('Pincode already exist!');
                    }
                }, error => {
                    return this.dataService
                        .mutate<CreatePincode.Mutation, CreatePincode.Variables>(CREATE_PINCODE, {
                            input,
                        })
                        .subscribe(
                            (data) => {
                                this.detailForm.markAsPristine();
                                this.changeDetector.markForCheck();
                                this.notificationService.success('common.notify-create-success', {
                                    entity: 'Pincode',
                                });
                                this.router.navigate(['../', data.createPincode.id], {
                                    relativeTo: this.route
                                });
                            },
                            () => {
                                this.notificationService.error('common.notify-create-error', {
                                    entity: 'Pincode',
                                });
                            },
                        );
                });
                console.log("checkPincodeResult", this.checkPincodeResult);
            } else {
                return of(false);
            }
        }
    }

    protected setFormValues(entity: Pincode.Fragment): void {
        this.detailForm.patchValue({
            pincode: entity.pincode,
            state: entity.state,
            district: entity.district,
            prepaid: entity.prepaid,
            cod: entity.cod,
            pickup: entity.pickup,
            cash: entity.cash,
            repl: entity.repl
        });
    }
}
