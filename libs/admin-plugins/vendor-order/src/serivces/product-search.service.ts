import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { SearchInput, SearchResponse } from '@vendure/common/lib/generated-types';
import { Omit } from '@vendure/common/lib/omit';
import { Connection } from 'typeorm';
import {
    EventBus,
    FacetValueService,
    ProductVariantService,
    SearchService,
    RequestContext,
    Job,
    FacetValue,
    InternalServerError,
    Facet,
    TransactionalConnection
} from "@vendure/core";
import { SearchIndexService } from "@vendure/core/dist/plugin/default-search-plugin/indexer/search-index.service";
import { SearchStrategy } from "@vendure/core/dist/plugin/default-search-plugin/search-strategy/search-strategy";
import { MysqlSearchStrategy } from "@vendure/core/dist/plugin/default-search-plugin/search-strategy/mysql-search-strategy";
import { SqliteSearchStrategy } from "@vendure/core/dist/plugin/default-search-plugin/search-strategy/sqlite-search-strategy";
import { PostgresSearchStrategy } from "@vendure/core/dist/plugin/default-search-plugin/search-strategy/postgres-search-strategy";
import {ProductVendorSearchInput} from "../type";
import { VendorFacetService } from "./vendor-facet.service";
import {FacetResult, FacetValueResult, Scalars} from "../generated-shop-types";

/**
 * Search indexing and full-text search for supported databases. See the various
 * SearchStrategy implementations for db-specific code.
 */
@Injectable()
export class ProductSearchService {

    private searchStrategy: SearchStrategy;

    constructor(
        private connection: TransactionalConnection,
        private eventBus: EventBus,
        private facetValueService: FacetValueService,
        private productVariantService: ProductVariantService,
        private searchIndexService: SearchIndexService,
        private searchService: SearchService,
        private facetService: VendorFacetService,
    ) {
        this.searchService.adopt(this);
        this.setSearchStrategy();
    }

    /**
     * Perform a fulltext search according to the provided input arguments.
     */
    async search(
        ctx: RequestContext,
        input: ProductVendorSearchInput,
        enabledOnly: boolean = false,
    ): Promise<Omit<SearchResponse, "facetValues">> {
        const items = await this.searchStrategy.getSearchResults(ctx, input, enabledOnly);
        const totalItems = await this.searchStrategy.getTotalCount(ctx, input, enabledOnly);
        return {
            items,
            totalItems,
        };
    }

    /**
     * Return a list of all FacetValues which appear in the result set.
     */
    async facetValues(
        ctx: RequestContext,
        input: ProductVendorSearchInput,
        enabledOnly: boolean = false,
    ): Promise<Array<{ facetValue: FacetValue; count: number }>> {
        const facetValueIdsMap = await this.searchStrategy.getFacetValueIds(ctx, input, enabledOnly);
        const facetValues = await this.facetValueService.findByIds(ctx,
            Array.from(facetValueIdsMap.keys()),
        );
        return facetValues.map((facetValue, index) => {
            return {
                facetValue,
                count: facetValueIdsMap.get(facetValue.id.toString()) as number,
            };
        });
    }

    async facets(
        ctx: RequestContext,
        input: ProductVendorSearchInput,
        enabledOnly: boolean = false,
    ): Promise<FacetResult[]> {
        const facetValueIdsMap = await this.searchStrategy.getFacetValueIds(ctx, input, enabledOnly);
        let facets: any;
        if(Array.from(facetValueIdsMap.keys()).length){
            facets = await this.facetService.findByFacetValueIds(
                Array.from(facetValueIdsMap.keys()),
                ctx.languageCode,
            )
        }
        if(facets?.length){
           return facets.map((facet:any) => {
               let obj:FacetResult = {
                   id: facet.id as any,
                   name: facet.name,
                   code: facet.code,
                   isPrivate: facet.isPrivate,
                   facetValues: facet.values.map((o: any) => ({
                           facetValue: o,
                           count: facetValueIdsMap.get(o.id.toString()) as number,
                   })
                   ),
               };
               return obj;
           })
        }

        return [];
    }

    /**
     * Rebuilds the full search index.
     */
    async reindex(ctx: RequestContext): Promise<Job> {
        const job = await this.searchIndexService.reindex(ctx);
        return job as any;
    }


    /**
     * Sets the SearchStrategy appropriate to th configured database type.
     */
    private setSearchStrategy() {
        switch (this.connection.rawConnection.options.type) {
            case 'mysql':
            case 'mariadb':
                this.searchStrategy = new MysqlSearchStrategy(this.connection);
                break;
            case 'sqlite':
            case 'sqljs':
                this.searchStrategy = new SqliteSearchStrategy(this.connection);
                break;
            case 'postgres':
                this.searchStrategy = new PostgresSearchStrategy(this.connection);
                break;
            default:
                throw new InternalServerError(`error.database-not-supported-by-default-search-plugin`);
        }
    }

}
