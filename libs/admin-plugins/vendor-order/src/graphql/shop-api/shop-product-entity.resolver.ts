import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import {
    Ctx,
    Product,
    Channel,
    ProductService,
    RequestContext,
    Allow,
    FacetValue,
    SearchResolver,
    Permission,
    ChannelService,
    Facet
} from '@vendure/core';
import { ProductSearchService } from "../../serivces/product-search.service";
import { QuerySearchArgs, SearchResponse, SearchInput } from '@vendure/common/lib/generated-types';
import {ProductVendorSearchInput, QueryVendorSearchArgs} from "../../type";
import {FacetResult} from "../../generated-shop-types";
import {VendorService} from "../../serivces/vendor.service";

@Resolver('Product')
export class ShopProductEntityResolver {
    constructor(private productService: ProductService) {}

    @ResolveField()
    async channel(@Ctx() ctx: RequestContext, @Parent() product: Product): Promise<Channel> {
        let channels
        if (product.channels) {
            channels = product.channels;
        } else {
            channels = await this.productService.getProductChannels(ctx, product.id);
        }
        if (channels.length > 1){
            return channels[1];
        } else {
            return channels[0]
        }
    }
}


@Resolver('SearchResponse')
export class ShopSearchProductResolver implements Omit<SearchResolver, 'reindex'>{

    constructor(
        private productSearchService: ProductSearchService,
        private channelService: ChannelService,
        private vendorService: VendorService
                ) {}

    @Query()
    @Allow(Permission.Public)
    async search(
        @Ctx() ctx: RequestContext,
        @Args() args: QueryVendorSearchArgs,
    ): Promise<Omit<SearchResponse, 'facetValues'>> {
        let channelCode = args.input?.channelCode;
        let req = ctx;
        if(channelCode){
            let newChannel = await this.vendorService.findChannelByCode(channelCode);
            req = RequestContext.deserialize({...ctx, _channel: newChannel} as any)  //  RequestContext.deserialize({ ...ctx, _languageCode: LanguageCode.de } as any);
        }
        const result = await this.productSearchService.search(req, args.input, true);
        // ensure the facetValues property resolver has access to the input args
        (result as any).input = args.input;
        return result;
    }

    @ResolveField()
    async facetValues(
        @Ctx() ctx: RequestContext,
        @Parent() parent: { input: ProductVendorSearchInput },
    ): Promise<Array<{ facetValue: FacetValue; count: number }>> {
        let channelCode = parent.input?.channelCode;
        let req = ctx;
        if(channelCode){
            let newChannel = await this.vendorService.findChannelByCode(channelCode);
            req = RequestContext.deserialize({...ctx, _channel: newChannel} as any)  //  RequestContext.deserialize({ ...ctx, _languageCode: LanguageCode.de } as any);
        }
        const facetValues = await this.productSearchService.facetValues(req, parent.input, true);
        return facetValues.filter((i) => !i.facetValue.facet.isPrivate);
    }

    @ResolveField()
    async facets(
        @Ctx() ctx: RequestContext,
        @Parent() parent: { input: ProductVendorSearchInput },
    ): Promise<FacetResult[]> {
        let channelCode = parent.input?.channelCode;
        let req = ctx;
        if(channelCode){
            let newChannel = await this.vendorService.findChannelByCode(channelCode);
            req = RequestContext.deserialize({...ctx, _channel: newChannel} as any)  //  RequestContext.deserialize({ ...ctx, _languageCode: LanguageCode.de } as any);
        }
        const facets = await this.productSearchService.facets(req, parent.input, true);
        //return facets.filter((i) => !i.isPrivate);
        return facets
    }

}

