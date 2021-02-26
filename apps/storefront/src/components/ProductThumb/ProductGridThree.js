import { Fragment, useState } from "react";
import Link from "next/link";
import { IoIosHeartEmpty, IoIosShuffle, IoIosSearch } from "react-icons/io";
import { Tooltip } from "react-tippy";
import ProductModal from "../../components/ProductThumb/ProductModal";
import { PRODUCT_QUICK_VIEW } from "@bavaan/graphql/product/product-detail.graphql";
import { client } from "../../config/graphql";
import * as _ from 'lodash';
const ProductGridThree = ({
  product,
  discountedPrice,
  productPrice,
  cartItem,
  wishlistItem,
  compareItem,
  bottomSpace,
  addToCart,
  addToWishlist,
  deleteFromWishlist,
  addToCompare,
  deleteFromCompare,
  addToast,
  cartItems,
  sliderClass,
  addToVendor
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [productQuickView, setProductQuickView] = useState(null);
  const getProductQuickView = async (id, slug) => {
    client.query({
      query: PRODUCT_QUICK_VIEW,
      variables: {
        id: id,
        slug: slug
      }
    })
    .then(response => {
      if (response && response.data && response.data.product) {
        if (!_.isEqual(response.data.product, productQuickView)) {
          setProductQuickView(response.data.product)
        }
        console.log("QUICK VIEW", response.data.product)
      }
    })
    .catch(e => {
      console.log(e)
    })
    
  }
  return (
    <Fragment>
      <div
        className={`product-grid ${sliderClass ? sliderClass : ""} ${
          bottomSpace ? bottomSpace : ""
        }`}
      >
        {/*=======  single product image  =======*/}
        <div className="product-grid__image">
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
              {product.thumbImage.length > 1 ? (
                <img
                  src={process.env.PUBLIC_URL + product.thumbImage[1]}
                  className="img-fluid"
                  alt={product.name}
                />
              ) : (
                ""
              )}
            </a>
          </Link>
          <div className="product-grid__floating-badges">
            {product.discount && product.discount > 0 ? (
              <span className="onsale">-{product.discount}%</span>
            ) : (
              ""
            )}
            {product.new ? <span className="hot">New</span> : ""}
          </div>
          <div className="product-grid__floating-icons">
            {/* add to wishlist */}
            <Tooltip
              title={
                wishlistItem !== undefined
                  ? "Added to wishlist"
                  : "Add to wishlist"
              }
              position="left"
              trigger="mouseenter"
              animation="shift"
              arrow={true}
              duration={200}
            >
              <button
                onClick={
                  wishlistItem !== undefined
                    ? () => deleteFromWishlist(product, addToast)
                    : () => addToWishlist(product, addToast)
                }
                className={wishlistItem !== undefined ? "active" : ""}
              >
                <IoIosHeartEmpty />
              </button>
            </Tooltip>

            {/* add to compare */}
            <Tooltip
              title={
                compareItem !== undefined
                  ? "Added to compare"
                  : "Add to compare"
              }
              position="left"
              trigger="mouseenter"
              animation="shift"
              arrow={true}
              duration={200}
            >
              <button
                onClick={
                  compareItem !== undefined
                    ? () => deleteFromCompare(product, addToast)
                    : () => addToCompare(product, addToast)
                }
                className={compareItem !== undefined ? "active" : ""}
              >
                <IoIosShuffle />
              </button>
            </Tooltip>

            {/* quick view */}
            <Tooltip
              title="Quick view"
              position="left"
              trigger="mouseenter"
              animation="shift"
              arrow={true}
              duration={200}
            >
              <button
                onClick={() => {setModalShow(true); getProductQuickView(product.id, product.slug)}}
                className="d-none d-lg-block"
              >
                <IoIosSearch />
              </button>
            </Tooltip>
          </div>
        </div>

        {/*=======  single product content  =======*/}
        <div className="product-grid__content">
          <div className="collection">
            {product.collections
              ? product.collections.map((item, index) => (
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
          <div className="title">
            <h3>
              <Link
                href={`/product/[slug]?slug=${product.slug}`}
                as={process.env.PUBLIC_URL + "/product/" + product.slug}
              >
                <a>{product.name}</a>
              </Link>
            </h3>
            {/* add to cart */}
            {/* {product.affiliateLink ? (
              <a href={product.affiliateLink}>
                Buy now
              </a>
            ) : product.variation && product.variation.length > 1 ? (
              <Link
                href={`/product/[slug]?slug=${product.slug}`}
                as={process.env.PUBLIC_URL + "/product/" + product.slug}
              >
                <a className="text-center">Select Option</a>
              </Link>
            ) : product.stock && product.stock > 0 ? (
              <button
                onClick={() => addToCart(product, addToast)}
                disabled={
                  cartItem !== undefined && cartItem.quantity >= cartItem.stock
                }
              >
                {cartItem !== undefined ? "Added to cart" : "Add to cart"}
              </button>
            ) : (
              <button disabled>Out of Stock</button>
            )} */}
          </div>
          <div className="price">
            {product.discount > 0 ? (
              <Fragment>
                <span className="main-price discounted">{productPrice}</span>
                <span className="discounted-price text-danger">
                  {discountedPrice}
                </span>
              </Fragment>
            ) : (
              <span className="main-price text-danger">{productPrice}</span>
            )}
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        discountedprice={discountedPrice}
        productprice={productPrice}
        cartitems={cartItems}
        cartitem={cartItem}
        wishlistitem={wishlistItem}
        compareitem={compareItem}
        addtocart={addToCart}
        addtowishlist={addToWishlist}
        deletefromwishlist={deleteFromWishlist}
        addtocompare={addToCompare}
        deletefromcompare={deleteFromCompare}
        addtoast={addToast}
        productQuickView={productQuickView}
        addToVendor={addToVendor}
      />
    </Fragment>
  );
};

export default ProductGridThree;
