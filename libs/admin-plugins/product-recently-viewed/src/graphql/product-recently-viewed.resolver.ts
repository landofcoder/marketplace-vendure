import { ListQueryOptions } from "@vendure/core/dist/common/types/common-types";
import { PaginatedList } from "@vendure/common/lib/shared-types";
import {
  QueryProductArgs,
  QueryProductsArgs,
} from "../generated-shop-types";
import { Args, Resolver, Query } from "@nestjs/graphql";
import {
  Ctx,
  ProductService,
  RequestContext,
  Product,
  Allow,
  UserInputError,
} from "@vendure/core";
import { Translated } from "@vendure/core/dist/common/types/locale-types";
import { ProductRecentlyViewedService } from "../services/product-recently-viewed.service";
@Resolver()
export class ProductGetResolver {
  constructor(
    private productService: ProductService,
    private ProductRecentlyViewedService: ProductRecentlyViewedService
  ) {}
  @Query()
  async product(
    @Ctx() ctx: RequestContext,
    @Args() args: QueryProductArgs
  ): Promise<Translated<Product> | undefined> {
    let product: Translated<Product> | undefined;
    if (args.id) {
      product = await this.productService.findOne(ctx, args.id);
      if (args.slug && product && product.slug !== args.slug) {
        throw new UserInputError(`error.product-id-slug-mismatch`);
      }
    } else if (args.slug) {
      product = await this.productService.findOneBySlug(ctx, args.slug);
    } else {
      throw new UserInputError(`error.product-id-or-slug-must-be-provided`);
    }

    const getProductChannel = (channels: any) => {
      if (!channels.length) return "-1";
      if (channels.length > 1) {
        return channels[1].id.toString();
      }
      return channels[0].id.toString();
    };
    // inject ProductRecentlyViewed view
    const sessionID = ctx.session?.id.toString();
    // console.log(ctx);
    if (sessionID) {
      const productID = product?.id;
      this.ProductRecentlyViewedService.setProductRecentlyViewed(
        sessionID || "-1",
        productID?.toString() || "-1",
        getProductChannel(product?.channels)
      );
    } else {
      // console.log("no session found");
    }
    return product;
  }
}
@Resolver()
export class ProductRecentlyViewedResolver {
  constructor(
    private ProductRecentlyViewedService: ProductRecentlyViewedService
  ) {}

  @Query()
  async getProductRecentlyViewed(
    @Ctx() ctx: RequestContext,
    @Args() args: QueryProductsArgs
  ): Promise<PaginatedList<Translated<Product>>> {
    const options: ListQueryOptions<Product> = {
      ...args.options,
      filter: {
        ...(args.options && args.options.filter),
        enabled: { eq: true },
      },
    };
    const sessionID = ctx.session?.id.toString() || "-1";
    return this.ProductRecentlyViewedService.findAll(ctx, options, {
      sessionID: sessionID,
    });
  }
}
