import { DeepPartial, VendureEntity} from '@vendure/core';
import { Entity, JoinColumn, OneToOne, Column, OneToMany } from 'typeorm';


@Entity()
export class DelhiveryWarehouse extends VendureEntity {
    constructor(input?: DeepPartial<DelhiveryWarehouse>) {
        super(input);
    }

    @Column()
    pickup_name: string;

    @Column()
    city: string;

    @Column()
    pincode: string;

    @Column()
    state: string;

    @Column()
    address: string;

    @Column()
    country: string;

    @Column()
    contact_person_name: string;

    @Column()
    contact_person_email: string;

    @Column()
    contact_person_phone: string;

    @Column()
    return_address: string;

    @Column()
    return_pincode: string;

    @Column()
    return_city: string;

    @Column()
    return_state: string;

    @Column()
    return_country: string;

    @Column()
    from_working_hours: string;

    @Column()
    to_working_hours: string;

    @Column()
    day_working_hours: string;

    @Column()
    preferred_pickup_slots: string;

    @Column()
    channelId: string;
}
