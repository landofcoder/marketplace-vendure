import { DeepPartial, VendureEntity, Session, Product, Channel } from "@vendure/core";
import { Entity, ManyToOne, Column } from "typeorm";

@Entity()
export class ProductRecentlyViewed extends VendureEntity {
  constructor(input?: DeepPartial<ProductRecentlyViewed>) {
    super(input);
  }

  @Column()
  sessionID: string;

  @ManyToOne(
    () => Product,
    (product) => product.id
  )
  product: Product;

  @ManyToOne(
    () => Channel,
    (channel) => channel.id
  )
  channel: Channel;
}
