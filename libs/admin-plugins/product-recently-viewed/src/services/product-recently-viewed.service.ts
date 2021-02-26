import { Translated } from "@vendure/core/dist/common/types/locale-types";
import { PaginatedList } from "@vendure/common/lib/shared-types";
import { ListQueryOptions } from "@vendure/core/dist/common/types/common-types";
import { Injectable, Session } from "@nestjs/common";
import {
  Product,
  RequestContext,
  ListQueryBuilder,
  translateDeep,
  TransactionalConnection,
} from "@vendure/core";
import { InjectConnection } from "@nestjs/typeorm";
import { Connection, In } from "typeorm";
import { ProductRecentlyViewed } from "../entities/index";
@Injectable()
export class ProductRecentlyViewedService {
  private readonly relations = [
    "featuredAsset",
    "assets",
    "channels",
    "facetValues",
    "facetValues.facet",
  ];
  constructor(
    private connection: TransactionalConnection,
    private listQueryBuilder: ListQueryBuilder
  ) {}

  async checkExistRelateProduct(
    session: string,
    productID: string,
    channelID: string
  ) {
    return await this.connection
      .getRepository(ProductRecentlyViewed)
      .createQueryBuilder("ProductRecentlyViewed")
      .where("sessionID = :sessionID", { sessionID: session })
      .andWhere("productId = :productID ", {
        productID: productID,
      })
      .andWhere("channelId = :channelID ", {
        channelID: channelID,
      })
      .getOne();
  }

  async setProductRecentlyViewed(
    session: string,
    productID: string,
    channelID: string
  ): Promise<boolean> {
    try {
      const productsRelated = await this.checkExistRelateProduct(
        session,
        productID,
        channelID
      );

      if (productsRelated) {
        const lastProductRecentlyViewed = new ProductRecentlyViewed(productsRelated);
        // console.log("update");
        await this.connection.getRepository(ProductRecentlyViewed).save(lastProductRecentlyViewed, { reload: false });
        return true;
      } else {
        // console.log("create");
        let newProductRecentlyViewed = new ProductRecentlyViewed({
          sessionID: session,
          product: { id: productID },
          channel: { id: channelID },
        });
        await this.connection.getRepository(ProductRecentlyViewed).save(newProductRecentlyViewed, { reload: false });
        return true;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async findAll(
    ctx: RequestContext,
    options: ListQueryOptions<Product>,
    ProductRecentlyViewedQuery: { sessionID: string }
  ): Promise<PaginatedList<Translated<Product>>> {
    return this.listQueryBuilder
      .build(Product, options, {
        relations: this.relations,
        where: { deletedAt: null},
      })
      .innerJoinAndSelect(ProductRecentlyViewed, "ProductRecentlyViewed", "ProductRecentlyViewed.product = product.id")
      .where("ProductRecentlyViewed.sessionID = :sessionID", { sessionID: ProductRecentlyViewedQuery.sessionID })
      .addOrderBy("ProductRecentlyViewed.updatedAt", "DESC")
      .getManyAndCount()
      .then(async ([products, totalItems]) => {
        const items = products.map((product) =>
          translateDeep(product, ctx.languageCode, [
            "facetValues",
            ["facetValues", "facet"],
          ])
        );
        return {
          items,
          totalItems,
        };
      });
  }
}
