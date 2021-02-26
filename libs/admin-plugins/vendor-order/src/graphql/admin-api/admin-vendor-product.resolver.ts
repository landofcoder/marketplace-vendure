import {Args, Mutation, Resolver} from "@nestjs/graphql";
import {
    Allow, ChannelService,
    Ctx,
    FacetValueService,
    Permission,
    Product,
    ProductService, ProductVariant,
    ProductVariantService,
    RequestContext
} from "@vendure/core";
import { MutationCreateProductVariantsArgs } from "@vendure/common/lib/generated-types";
import { Translated } from "@vendure/core/dist/common/types/locale-types";
import {VendorProductService} from "../../serivces/vendor-product.service";
import { DEFAULT_CHANNEL_CODE } from '@vendure/common/lib/shared-constants';

@Resolver('Product')
export class AdminVendorProductResolver{

    constructor(
        private productService: ProductService,
        private productVariantService: ProductVariantService,
        private vendorProductService: VendorProductService,
        private channelService: ChannelService,
    ) {
    }

    @Mutation()
    @Allow(Permission.UpdateCatalog)
    async createProductVariants(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationCreateProductVariantsArgs,
    ): Promise<Array<Translated<ProductVariant>>> {
        const { input } = args;
        let productId = input[0].productId;
        let productVariants = await this.productVariantService.create(ctx, input);
        let defaultChannel = this.channelService.getDefaultChannel();
        if(ctx.channel.code !== DEFAULT_CHANNEL_CODE){//DEFAULT_CHANNEL_CODE
            await this.vendorProductService.assignProductsToChannel(ctx,{ channelId: defaultChannel.id as any , productIds: [ productId as any ] });
        }
        return productVariants
    }

}
