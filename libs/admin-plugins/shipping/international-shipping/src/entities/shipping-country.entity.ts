import { DeepPartial, VendureEntity, Country} from '@vendure/core';
import { Entity, ManyToOne, Column } from 'typeorm';


@Entity()
export class ShippingCountry extends VendureEntity {
    constructor(input?: DeepPartial<ShippingCountry>) {
        super(input);
    }

    @ManyToOne(type => Country, country => country.id)
    country: Country;

    @Column()
    price: number;

}
