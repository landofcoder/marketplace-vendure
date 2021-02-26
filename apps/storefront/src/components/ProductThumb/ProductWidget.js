import React, { Fragment } from "react";
import Link from "next/link";
import { ProductRating } from "@bavaan/storefront-base/src/components/Product";
import { filterShowUpMaxMinProductPrice } from "../../lib/product";
import Rating from "react-rating";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
const ProductWidget = ({
  product,
  discountedPrice,
  productPrice,
  cartItem,
  addToCart,
  addToast,
  sliderClass,
}) => {
  return (
    <Fragment>
      <div
        className={`single-widget-product-wrapper col-sm-12 ${
          sliderClass ? sliderClass : ""
        }`}
        style={{ padding: "10px" }}
      >
        <div className="single-widget-product">
          <div className="single-widget-product__image">
            <Link
              href={`/product/[slug]?slug=${product.slug}`}
              as={process.env.PUBLIC_URL + "/product/" + product.slug}
            >
              <a className="image-wrap">
                <img
                  src={process.env.PUBLIC_URL + product.thumbImage[0]}
                  className="img-fluid"
                  alt={product.name}
                />
              </a>
            </Link>
          </div>
          <div className="single-widget-product__content">
            <div className="single-widget-product__content__top">
              <div className="collection">
                {product.collection
                  ? product.collection.map((item, index) => (
                      <span key={index}>
                        <a
                          href={"/collection/" + item?.id + "/" + item?.slug}
                        >
                          {item?.name}
                        </a>
                      </span>
                    ))
                  : null}
              </div>
              <h3 className="product-title space-mb--10">
                <Link
                  href={`/product/[slug]?slug=${product.slug}`}
                  as={process.env.PUBLIC_URL + "/product/" + product.slug}
                >
                  <a>{product.name}</a>
                </Link>
              </h3>
              <div className="price space-mb--10">
                {product.discount > 0 ? (
                  <Fragment>
                    <span className="main-price discounted">
                      {formatter.format(productPrice)}
                    </span>
                    <span className="discounted-price text-danger">
                      {formatter.format(discountedPrice)}
                    </span>
                  </Fragment>
                ) : (
                  <span className="main-price text-danger">
                    {filterShowUpMaxMinProductPrice(product)}
                  </span>
                )}
              </div>
              {/*<div className="rating">*/}
              {/*  {console.log("test", product)}*/}
              {/*  <Rating*/}
              {/*      initialRating={product.customFields && product.customFields.rating ? product.customFields.rating : 0}*/}
              {/*      emptySymbol={<IoIosStarOutline />}*/}
              {/*      fullSymbol={<IoIosStar className="yellow"/>}*/}
              {/*      readonly*/}
              {/*  />*/}
              {/*</div>*/}
            </div>
            {/*<div className="single-widget-product__content__bottom">*/}
            {/*  /!* add to cart *!/*/}
            {/*  {product.affiliateLink ? (*/}
            {/*    <a*/}
            {/*      href={product.affiliateLink}*/}
            {/*      target="_blank"*/}
            {/*      className="cart-btn"*/}
            {/*    >*/}
            {/*      Buy now*/}
            {/*    </a>*/}
            {/*  ) : product.variation && product.variation.length > 1 ? (*/}
            {/*    <Link*/}
            {/*      href={`/product/[slug]?slug=${product.slug}`}*/}
            {/*      as={process.env.PUBLIC_URL + "/product/" + product.slug}*/}
            {/*    >*/}
            {/*      <a className="cart-btn">Select Option</a>*/}
            {/*    </Link>*/}
            {/*  ) : product.stock && product.stock > 0 ? (*/}
            {/*    <button*/}
            {/*      onClick={() => addToCart(product, addToast)}*/}
            {/*      disabled={*/}
            {/*        cartItem !== undefined &&*/}
            {/*        cartItem.quantity >= cartItem.stock*/}
            {/*      }*/}
            {/*      className="cart-btn"*/}
            {/*    >*/}
            {/*      {cartItem !== undefined ? "Added to cart" : "Add to cart"}*/}
            {/*    </button>*/}
            {/*  ) : null}*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductWidget;
