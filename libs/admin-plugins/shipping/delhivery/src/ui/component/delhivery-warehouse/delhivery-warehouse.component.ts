import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
    BaseDetailComponent,
    DataService,
    NotificationService,
    ServerConfigService,
    GetAvailableCountries,
} from '@vendure/admin-ui/core';
import { Observable, of } from 'rxjs';

import {
    DelhiveryWarehouse,
    UpdateDelhiveryWarehouseInput,
    UpdateDelhiveryWarehouse,
    CreateDelhiveryWarehouseInput,
    CreateDelhiveryWarehouse,
    GetDelhiveryWarehouseByChannelId,
    GetDelhiveryWarehouseByPickupName,
    GetDelhiveryWarehouse,
} from '../../generated-types';
import { UPDATE_DELHIVERY_WAREHOUSE, CREATE_DELHIVERY_WAREHOUSE } from "./delhivery-warehouse.graphql";
import { GET_DELHIVERY_WAREHOUSE_BY_CHANNEL_ID, GET_DELHIVERY_WAREHOUSE_BY_PICKUP_NAME, GET_DELHIVERY_WAREHOUSE } from "../../providers/routing/delhivery-warehouse-resolver.graphql";
import { CheckBoxSelectionService } from '@syncfusion/ej2-angular-dropdowns';

@Component({
    selector: 'kb-delhivery-warehouse',
    templateUrl: './delhivery-warehouse.component.html',
    styleUrls: ['./delhivery-warehouse.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [CheckBoxSelectionService]
})
export class DelhiveryWarehouseComponent extends BaseDetailComponent<DelhiveryWarehouse.Fragment>
    implements OnInit {
    detailForm: FormGroup;
    hoursFrom: any[];
    hoursTo: any[];
    step: string = "30";
    defaultTime: string = "0:30";
    toHourTime: any;
    times: {
        time: any;
        minutes: any;
    };
    slotArray: any[];
    public preferredPickup: any[] = ['10:00 AM - 7:00 PM', '1:00 PM - 8:00 PM'];
    fromHourSelect: any;
    toHourSelect: any;
    preferredPickupSelect:any;
    returnAddress: any = true;
    public daysData: Object[] =  [
        { id: 'MON', days: 'Monday' },
        { id: 'TUE', days: 'Tuesday' },
        { id: 'WED', days: 'Wednesday' },
        { id: 'THU', days: 'Thursday' },
        { id: 'FRI', days: 'Friday' },
        { id: 'STA', days: 'Saturday' },
        { id: 'SUN', days: 'Sunday' }
    ];
    public fields: Object = { text: 'days', value: 'id' };
    public placeholder: string = 'Select days';
    public mode: string;
    public selectAllText: string;
    idParam: any;
    channelId: any;
    availableCountries$: Observable<GetAvailableCountries.Items[]>;
    coutryNameSelect: string = 'India';

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
        this.idParam = this.route.snapshot.params.id;
        if (this.idParam === 'create'){
            this.hoursFrom = this.getHours(this.step, this.defaultTime);
        } else {
            this.hoursFrom = this.getHours(this.step, this.defaultTime);
            this.hoursTo = this.getHours(this.step, this.defaultTime);
        }
        this.availableCountries$ = this.dataService.settings
            .getAvailableCountries()
            .mapSingle((result) => result.countries.items);
        this.detailForm = this.formBuilder.group({
            pickup_name: ['', Validators.required],
            city: ['', Validators.required],
            pincode: ['', Validators.required],
            state: ['', Validators.required],
            address: ['', Validators.required],
            country: ['', Validators.required],
            contact_person_name: ['', Validators.required],
            contact_person_email: ['', Validators.required],
            contact_person_phone: ['', Validators.required],
            return_address: '',
            return_pincode: '',
            return_city: '',
            return_state: '',
            return_country: '',
            from_working_hours: ['', Validators.required],
            to_working_hours: ['', Validators.required],
            day_working_hours: ['', Validators.required],
            preferred_pickup_slots: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.init();
        this.mode = 'CheckBox';
        this.selectAllText= 'Select All';
        this.dataService.settings
            .getActiveChannel()
            .refetchOnChannelChange()
            .mapStream(data => data.activeChannel)
            .subscribe((channel) => {
                this.dataService
                    .mutate<GetDelhiveryWarehouseByChannelId.Query, GetDelhiveryWarehouseByChannelId.Variables>(GET_DELHIVERY_WAREHOUSE_BY_CHANNEL_ID, {
                        input: {
                            channelId: channel.id
                        },
                    }).subscribe((data) => {
                        if (data.delhiveryWarehouseByChannelId){
                            this.router.navigate(['../', data.delhiveryWarehouseByChannelId.id], {
                                relativeTo: this.route
                            });
                            this.hoursFrom = this.getHours(this.step, this.defaultTime);
                            this.hoursTo = this.getHours(this.step, this.defaultTime);
                        } else if (data.delhiveryWarehouseByChannelId === null) {
                            this.router.navigate(['../create'], {
                                relativeTo: this.route
                            });
                        }
                    },
                    (error) => {
                        console.log("err", error);
                    }
                );
            })
    }

    checkValue(event: any){
        if (event.target.checked) {
            this.returnAddress = true;
        } else {
            this.returnAddress = false;
        }
    }

    save() {
        this.dataService.settings
            .getActiveChannel()
            .mapStream(data => data.activeChannel)
            .subscribe((channel) => {
                if(this.id){
                    if (this.detailForm.dirty) {
                        const formValue = this.detailForm.value;
                        this.dataService
                            .mutate<GetDelhiveryWarehouseByPickupName.Query, GetDelhiveryWarehouseByPickupName.Variables>(GET_DELHIVERY_WAREHOUSE_BY_PICKUP_NAME, {
                                input: {
                                    pickup_name: formValue.pickup_name
                                },
                            }).subscribe((data1) => {
                                this.dataService
                                    .mutate<GetDelhiveryWarehouse.Query, GetDelhiveryWarehouse.Variables>(GET_DELHIVERY_WAREHOUSE, {
                                        id: this.id
                                    }).subscribe((data2) => {
                                        if (data2 && data2.delhiveryWarehouse){
                                            if (data1.delhiveryWarehouseByPickupName && data1.delhiveryWarehouseByPickupName.pickup_name !== data2.delhiveryWarehouse.pickup_name){
                                                this.notificationService.error('Pickup Name already exists! Please re-enter Pickup Name!');
                                            } else {
                                                const input: UpdateDelhiveryWarehouseInput = {
                                                    id: this.id,
                                                    pickup_name: formValue.pickup_name,
                                                    city: formValue.city,
                                                    pincode: formValue.pincode,
                                                    state: formValue.state,
                                                    address: formValue.address,
                                                    country: formValue.country,
                                                    contact_person_name: formValue.contact_person_name,
                                                    contact_person_email: formValue.contact_person_email,
                                                    contact_person_phone: formValue.contact_person_phone,
                                                    return_address: formValue.return_address,
                                                    return_pincode: formValue.return_pincode,
                                                    return_city: formValue.return_city,
                                                    return_state: formValue.return_state,
                                                    return_country: formValue.return_country,
                                                    from_working_hours: formValue.from_working_hours,
                                                    to_working_hours: formValue.to_working_hours,
                                                    day_working_hours: formValue.day_working_hours.toString(),
                                                    preferred_pickup_slots: formValue.preferred_pickup_slots,
                                                    channelId: channel.id,
                                                };
                                                return this.dataService
                                                    .mutate<UpdateDelhiveryWarehouse.Mutation, UpdateDelhiveryWarehouse.Variables>(UPDATE_DELHIVERY_WAREHOUSE, {
                                                        input,
                                                    }).subscribe(
                                                        (data) => {
                                                            this.detailForm.markAsPristine();
                                                            this.changeDetector.markForCheck();
                                                            this.notificationService.success('common.notify-update-success', {
                                                                entity: 'DelhiveryWarehouse',
                                                            });
                                                        },
                                                        () => {
                                                            this.notificationService.error('common.notify-update-error', {
                                                                entity: 'DelhiveryWarehouse',
                                                            });
                                                        },
                                                    );
                                            }
                                        }
                                });
                            },
                            (error) => {
                                this.notificationService.error('common.notify-create-error', {
                                    entity: 'DelhiveryWarehouse',
                                });
                            }
                        );
                    } else {
                        return of(false);
                    }
                }else{
                    if (this.detailForm.dirty) {
                        const formValue = this.detailForm.value;
                        if (this.returnAddress === true) {
                            this.dataService
                                .mutate<GetDelhiveryWarehouseByPickupName.Query, GetDelhiveryWarehouseByPickupName.Variables>(GET_DELHIVERY_WAREHOUSE_BY_PICKUP_NAME, {
                                    input: {
                                        pickup_name: formValue.pickup_name
                                    },
                                }).subscribe((data) => {
                                    if (data.delhiveryWarehouseByPickupName){
                                        this.notificationService.error('Pickup Name already exists! Please re-enter Pickup Name!');
                                    } else if (data.delhiveryWarehouseByPickupName === null){
                                        const input: CreateDelhiveryWarehouseInput = {
                                            pickup_name: formValue.pickup_name,
                                            city: formValue.city,
                                            pincode: formValue.pincode,
                                            state: formValue.state,
                                            address: formValue.address,
                                            country: formValue.country,
                                            contact_person_name: formValue.contact_person_name,
                                            contact_person_email: formValue.contact_person_email,
                                            contact_person_phone: formValue.contact_person_phone,
                                            return_address: formValue.address,
                                            return_pincode: formValue.pincode,
                                            return_city: formValue.city,
                                            return_state: formValue.state,
                                            return_country: formValue.country,
                                            from_working_hours: formValue.from_working_hours,
                                            to_working_hours: formValue.to_working_hours,
                                            day_working_hours: formValue.day_working_hours.toString(),
                                            preferred_pickup_slots: formValue.preferred_pickup_slots,
                                            channelId: channel.id,
                                        };
                                        const countryName = this.coutryNameSelect;
                                        return this.dataService
                                            .mutate<CreateDelhiveryWarehouse.Mutation, CreateDelhiveryWarehouse.Variables>(CREATE_DELHIVERY_WAREHOUSE, {
                                                input, countryName
                                            })
                                            .subscribe(
                                                (data) => {
                                                    this.detailForm.markAsPristine();
                                                    this.changeDetector.markForCheck();
                                                    this.notificationService.success('common.notify-create-success', {
                                                        entity: 'DelhiveryWarehouse',
                                                    });
                                                    this.router.navigate(['../', data.createDelhiveryWarehouse.id], {
                                                        relativeTo: this.route
                                                    });
                                                },
                                                () => {
                                                    this.notificationService.error('common.notify-create-error', {
                                                        entity: 'DelhiveryWarehouse',
                                                    });
                                                },
                                            );
                                    }
                                },
                                (error) => {
                                    this.notificationService.error('common.notify-create-error', {
                                        entity: 'DelhiveryWarehouse',
                                    });
                                }
                            );
                        } else if (this.returnAddress === false) {
                            this.dataService
                                .mutate<GetDelhiveryWarehouseByPickupName.Query, GetDelhiveryWarehouseByPickupName.Variables>(GET_DELHIVERY_WAREHOUSE_BY_PICKUP_NAME, {
                                    input: {
                                        pickup_name: formValue.pickup_name
                                    },
                                }).subscribe((data) => {
                                    if (data.delhiveryWarehouseByPickupName){
                                        this.notificationService.error('Pickup Name already exists! Please re-enter Pickup Name!');
                                    } else if (data.delhiveryWarehouseByPickupName === null){
                                        const input: CreateDelhiveryWarehouseInput = {
                                            pickup_name: formValue.pickup_name,
                                            city: formValue.city,
                                            pincode: formValue.pincode,
                                            state: formValue.state,
                                            address: formValue.address,
                                            country: formValue.country,
                                            contact_person_name: formValue.contact_person_name,
                                            contact_person_email: formValue.contact_person_email,
                                            contact_person_phone: formValue.contact_person_phone,
                                            return_address: formValue.return_address,
                                            return_pincode: formValue.return_pincode,
                                            return_city: formValue.return_city,
                                            return_state: formValue.return_state,
                                            return_country: formValue.return_country,
                                            from_working_hours: formValue.from_working_hours,
                                            to_working_hours: formValue.to_working_hours,
                                            day_working_hours: formValue.day_working_hours.toString(),
                                            preferred_pickup_slots: formValue.preferred_pickup_slots,
                                            channelId: channel.id
                                        };
                                        const countryName = this.coutryNameSelect;
                                        return this.dataService
                                            .mutate<CreateDelhiveryWarehouse.Mutation, CreateDelhiveryWarehouse.Variables>(CREATE_DELHIVERY_WAREHOUSE, {
                                                input, countryName
                                            })
                                            .subscribe(
                                                (data) => {
                                                    this.detailForm.markAsPristine();
                                                    this.changeDetector.markForCheck();
                                                    this.notificationService.success('common.notify-create-success', {
                                                        entity: 'DelhiveryWarehouse',
                                                    });
                                                    this.router.navigate(['../', data.createDelhiveryWarehouse.id], {
                                                        relativeTo: this.route
                                                    });
                                                },
                                                () => {
                                                    this.notificationService.error('common.notify-create-error', {
                                                        entity: 'DelhiveryWarehouse',
                                                    });
                                                },
                                            );
                                    }
                                },
                                (error) => {
                                    this.notificationService.error('common.notify-create-error', {
                                        entity: 'DelhiveryWarehouse',
                                    });
                                }
                            );
                        }
                    } else {
                        return of(false);
                    }
                }
            });
    }

    protected setFormValues(entity: DelhiveryWarehouse.Fragment): void {
        this.detailForm.patchValue({
            pickup_name: entity.pickup_name,
            city: entity.city,
            pincode: entity.pincode,
            state: entity.state,
            address: entity.address,
            country: entity.country !== '' ? entity.country : 'IN',
            contact_person_name: entity.contact_person_name,
            contact_person_email: entity.contact_person_email,
            contact_person_phone: entity.contact_person_phone,
            return_address: entity.return_address,
            return_pincode: entity.return_pincode,
            return_city: entity.return_city,
            return_state: entity.return_state,
            return_country: entity.return_country !== '' ? entity.return_country : 'IN',
            from_working_hours: entity.from_working_hours,
            to_working_hours: entity.to_working_hours,
            day_working_hours: entity.day_working_hours.split(","),
            preferred_pickup_slots: entity.preferred_pickup_slots,
        });
    }

    //Function Get List Hours and Convert Hour
    getHours(step, yourTime) {
        this.slotArray = [];
        const startMinutes = yourTime ? this.howManyMinutesPassed(yourTime) : 0;
        const parsedSlotSize = parseInt(step.toString(), 10);

        for (let i = startMinutes; i <= 24 * 60; i += parsedSlotSize) {
            // @ts-ignore
            this.times = {
                time: this.convertMinutesToTimeFormat(i),
                minutes: i,
            };
            this.slotArray.push(this.times);
        }

        return [...this.slotArray];
    }

    howManyMinutesPassed(time) {
        const [hour, minutes] = time.split(':').map((value) => parseInt(value, 10));
        return hour * 60 + minutes;
    }

    public convertMinutesToTimeFormat(mins) {
        let h: string | number = Math.floor(mins / 60);
        let m: string | number = mins % 60;
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        return `${h}:${m}:00`;
    }

    formatTime(time)
    {
        const H = +time.substr(0, 2);
        const h = H % 12 || 12;
        const ampm = (H < 12 || H === 24) ? " AM" : " PM";
        return h + time.substr(2, 3) + ampm;
    }
    fromHourChange(value:any){
        this.toHourTime = value;
        this.hoursTo = this.getHours(this.step, this.toHourTime);
        this.fromHourSelect = this.formatTime(value);
    }
    toHourChange(value:any){
        this.preferredPickup = [];
        let pickupPreferred = ['10:00 AM - 7:00 PM', '1:00 PM - 8:00 PM'];
        this.toHourSelect = this.formatTime(value);
        this.preferredPickupSelect = this.fromHourSelect + " - " + this.toHourSelect;
        this.preferredPickup.push(this.preferredPickupSelect);
        this.preferredPickup.push.apply(this.preferredPickup, pickupPreferred);
    }
    countryChange(value: any){
        let text = value.target.options[value.target.options.selectedIndex].text;
        this.coutryNameSelect = text;
    }
}
