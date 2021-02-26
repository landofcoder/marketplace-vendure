import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import {
    Facet,
    LanguageCode,
    TransactionalConnection,
    translateDeep,
} from "@vendure/core";
import { ID, PaginatedList } from '@vendure/common/lib/shared-types';
import { Connection } from 'typeorm';
import {Translated} from "@vendure/core/dist/common/types/locale-types";

@Injectable()
export class VendorFacetService {
    constructor(
        private connection: TransactionalConnection,
    ) {
    }

    async findByFacetValueIds(ids: ID[], lang: LanguageCode): Promise<Translated<Facet>[] | undefined> {
        return await this.connection
            .getRepository(Facet)
            .createQueryBuilder('facet')
            .leftJoinAndSelect('facet.translations', 'translations')
            .leftJoinAndSelect('facet.values', 'facetValue')
            .where('facetValue.id IN (:...ids)', { ids })
            .getMany()
            .then(facets => {
                if(facets.length){
                    return facets.map(facet => {
                        facet.values = facet.values.map(o => translateDeep(o, lang))
                        return translateDeep(facet, lang)
                    })
                }
            })

    }

}
