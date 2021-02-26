import {Injectable} from '@nestjs/common';
import {ID, PaginatedList} from '@vendure/common/lib/shared-types';
import {
    assertFound, Country,
    ListQueryBuilder, patchEntity,
    RequestContext,
    TransactionalConnection,
    translateDeep,
    UserInputError
} from "@vendure/core";
import {ShippingCountry} from "../entities/shipping-country.entity";
import {
    CreateShippingCountryInput,
    UpdateShippingCountryInput,
    DeletionResult,
    DeletionResponse, ShippingCountryPrice, ShippingCountryPriceListOptions
} from "../generated-admin-types";

@Injectable()
export class ShippingCountryService {
    constructor(
        private connection: TransactionalConnection,
        private listQueryBuilder: ListQueryBuilder
    ) {
    }

    findAll(
        ctx: RequestContext,
        options?: ShippingCountryPriceListOptions | null,
    ) {

        let search = options?.filter?.country_name?.contains || '';
        delete options?.filter;
        const qb = this.listQueryBuilder
            .build(ShippingCountry, options || undefined  , {
                relations: ['country']
            })
            .leftJoin("shippingcountry.country", "country")
            .leftJoinAndSelect('country.translations', 'countryTranslation')

        if(search) {
            qb.where('country.code like :q OR countryTranslation.name like :q', { q: `%${search}%` })
        }

        return qb.getManyAndCount()
            .then(([shippingCountries, totalItems]) => {
                const items = shippingCountries.map(shipping => {
                    let country = translateDeep(shipping.country, ctx.languageCode);
                    let shippingPrice: ShippingCountryPrice = {
                        id: shipping.id.toString(),
                        price: shipping.price,
                        country_code: country.code,
                        country_name: country.name
                    };
                    return shippingPrice;
                });
                return {
                    items,
                    totalItems,
                };
            });
    }

    async findOne(ctx: RequestContext, id: ID) {
        return await this.connection
            .getRepository(ShippingCountry)
            .createQueryBuilder('shippingcountry')
            .leftJoinAndSelect('shippingcountry.country', 'country')
            .leftJoinAndSelect('country.translations', 'countryTranslation')
            .where('shippingcountry.id = :id', { id })
            .getOne()
            .then(shipping => {
                if (shipping) {
                    let country = translateDeep(shipping.country, ctx.languageCode);
                    let shippingPrice: ShippingCountryPrice = {
                        id: shipping.id.toString(),
                        price: shipping.price,
                        country_code: country.code,
                        country_name: country.name
                    };
                    return shippingPrice;
                }
                return undefined;
            });
    }

    async findByCountryCode(ctx: RequestContext, code: String){
        return this.connection
            .getRepository(ctx, ShippingCountry)
            .createQueryBuilder("shippingcountry")
            .leftJoinAndSelect("shippingcountry.country", "country")
            .where("country.code = :code", { code})
            .getOne();
    }

    async create(ctx: RequestContext, input: CreateShippingCountryInput) {
        //check countryID
        let country = await this.connection
            .getRepository(ctx, Country)
            .findOne({
                where:{
                   code: input.country_code
                }
            });

        if (!country) {
            throw new Error('Country not found');
        }

        let checkExist = await this.findByCountryCode(ctx, input.country_code);

        if(checkExist){
            throw new Error("Exist country in data, Please edit the record");
        }

        let shippingCountry = {
            country: country,
            price: input.price
        }

        const price = new ShippingCountry(shippingCountry);

        let result = await this.connection.getRepository(ShippingCountry).save(price, { reload: true});
        return this.findOne(ctx, result.id);
    }

    async update(ctx: RequestContext, input: UpdateShippingCountryInput) {

        const shippingPrice = await this.connection
            .getRepository(ctx, ShippingCountry)
            .findOne(input.id);
        if (!shippingPrice) {
            throw new Error('Shipping Country Price not found');
        }
        const update = patchEntity(shippingPrice, input);
        await this.connection.getRepository(ShippingCountry).save(update, {reload: true});
        return this.findOne(ctx, shippingPrice.id);
    }

    async delete(ctx: RequestContext, id: ID): Promise<DeletionResponse> {
        const country = await this.connection.getEntityOrThrow(ctx, ShippingCountry, id);
        await this.connection.getRepository(ctx, ShippingCountry).remove(country);
        return {
            result: DeletionResult.Deleted,
            message: '',
        };

    }
}
