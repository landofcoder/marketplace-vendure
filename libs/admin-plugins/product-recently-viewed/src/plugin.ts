import {
  ProductRecentlyViewedResolver,
  ProductGetResolver,
} from "./graphql/index";
import { ProductRecentlyViewed } from "./entities/product-recently-viewed.entity";
import {
  VendurePlugin,
  PluginCommonModule,
} from "@vendure/core";
import {
  shopApiExtensions,
} from "./graphql/api-extensions";

import { ProductRecentlyViewedService } from "./services/product-recently-viewed.service";


@VendurePlugin({
  imports: [PluginCommonModule],
  entities: [ProductRecentlyViewed],
  providers: [ProductRecentlyViewedService],

  shopApiExtensions: {
    schema: shopApiExtensions,
    resolvers: [ProductRecentlyViewedResolver, ProductGetResolver],
  },
})
export class ProductRecentlyViewedPlugin {}
