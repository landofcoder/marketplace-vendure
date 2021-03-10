import React, { useState, Fragment, useRef } from "react";
import { IoIosHeartEmpty, IoIosShuffle, IoMdChatboxes, IoIosPin } from "react-icons/io";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { Dropdown } from "react-bootstrap";
import { ProductRating } from "@bavaan/storefront-base/src/components/Product";
import RenderOptionSelect from "./RenderOptionSelect";
import { getProductCartQuantity } from "../../lib/product";
import { useRouter } from "next/router";
import Seller from "../Shop/Seller/seller";
import Rating from "react-rating";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { CHECK_PINCODE } from "@bavaan/graphql/product/product-detail.graphql";
import { useLazyQuery } from "@apollo/react-hooks";


const ProductDescription = ({
  product,
  discountedPrice,
  cartItems,
  wishlistItem,
  compareItem,
  addToast,
  addToCart,
  addToWishlist,
  deleteFromWishlist,
  addToCompare,
  deleteFromCompare,
  addToVendor,
  selectedProduct,
  setSelectedProduct
}) => {
  const router = useRouter();
  // const [quantityCount, setQuantityCount] = useState(1);
  // const [selectedProduct, setSelectedProduct] = useState(
  //   product.variants.productVariantList[0]
  // );
  const productCartQty = getProductCartQuantity(cartItems, product);
  const [checkPinCode, setInputCheckPincode] = useState(null);
  const [checkPincode, { called, loading, data }] = useLazyQuery(
    CHECK_PINCODE,
    { variables: {
      input : {
        pincode: checkPinCode,
        productWeight: 200
      }
    }
  }
  );

  return (
    <div className="product-content">
      <p className="product-content__title space-mb--20">{product.name}</p>

      <div className="product-content__rating-wrap d-block d-sm-flex space-mb--20" style={{ alignItems: "center" }}>
        <div className="product-content__rating space-mr--20" style={{ backgroundColor: "#26a541", padding: "4px 8px", borderRadius: "20px", color: "#fff" }}>
          {product.customFields.rating} <IoIosStar className="white"/>
        </div>
        <div className="product-content__rating-count">
          <a href="#">{product.customFields.ratingCount || 0} reviews & rating </a>
        </div>
      </div>

      <div className="product-content__price space-mb--20">
        {product.discount > 0 ? (
          <Fragment>
            <span className="main-price discounted">
              {selectedProduct.formatter.format(selectedProduct.priceWithTax)}
            </span>
            <span className="main-price">{discountedPrice}</span>
          </Fragment>
        ) : (
          <span className="main-price text-danger">
            {selectedProduct.formatter.format(selectedProduct.priceWithTax)}
          </span>
        )}
      </div>
      <div className="product-content__description space-mb--30">
        {
          product.shortDescription && <div dangerouslySetInnerHTML={{ __html: product.shortDescription}} />
        }
      </div>
      <RenderOptionSelect
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        productVariantList={product.variants.productVariantList}
      />
        <Fragment>
          {/* <div className="product-content__quantity space-mb--40">
            <div className="product-content__quantity__title">Quantity</div>
            <div className="cart-plus-minus">
              <button
                onClick={() =>
                  setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
                }
                className="qtybutton"
              >
                -
              </button>
              <input
                className="cart-plus-minus-box"
                type="text"
                value={quantityCount}
                readOnly
              />
              <button
                onClick={() => setQuantityCount(quantityCount + 1)}
                className="qtybutton"
              >
                +
              </button>
            </div>
          </div> */}

          {/*<div className="product-content__button-wrapper d-flex align-items-center">
            <button
              onClick={() => {
                addToVendor(
                  { ...product, ...selectedProduct},
                  addToast,
                  quantityCount,
                )
              }}
              className="lezada-button lezada-button--medium product-content__cart space-mr--10"
            >
              Add To Cart
            </button>

            <button
              className={`product-content__wishlist space-mr--10 ${
                wishlistItem !== undefined ? "active" : ""
              }`}
              title={
                wishlistItem !== undefined
                  ? "Added to wishlist"
                  : "Add to wishlist"
              }
              onClick={
                wishlistItem !== undefined
                  ? () => deleteFromWishlist(product, addToast)
                  : () => addToWishlist(product, addToast)
              }
            >
              <IoIosHeartEmpty />
            </button>

            <button
              className={`product-content__compare space-mr--10 ${
                compareItem !== undefined ? "active" : ""
              }`}
              title={
                compareItem !== undefined
                  ? "Added to compare"
                  : "Add to compare"
              }
              onClick={
                compareItem !== undefined
                  ? () => deleteFromCompare(product, addToast)
                  : () => addToCompare(product, addToast)
              }
            >
              <IoIosShuffle />
            </button>
          </div>*/}

          <div className="product-content__other-info">
            <div className="d-block d-sm-flex">
              <IoIosPin /> Delivery to
            </div>
            <div style={{ borderBottom: "2px solid #ccc", width: "fit-content", padding: "10px 0"}}>
              <input
                  type="number"
                  placeholder="Enter delivery code"
                  style={{border: 'none'}}
                  onChange={event => setInputCheckPincode(event.target.value)}
              />
              <button
                  style={{border: 'none', backgroundColor: '#fff', fontWeight: 'bold'}}
                  onClick={() => checkPincode()}
              >
                check
              </button>
            </div>
            {
              data && data.checkPincode && data.checkPincode.status === 'success' ? 
                <div className="space-mt--10">
                  <span>{data.checkPincode.data.pincode.district} ( {data.checkPincode.data.pincode.pincode} ) | {data.checkPincode.data.price / 100} </span>
                  <p><strong>{data.checkPincode.data.label}</strong></p>
                </div> 
                : <div>
                  {data && data.checkPincode && data.checkPincode.status === 'error' && <p style={{color: 'red'}}>{data.checkPincode.data.message}</p>}
                </div>
            }
          </div>

          <div className="product-content__other-info space-mt--30" key={1}>
            <table>
              <tbody>
                <tr className="single-info">
                  <td className="title">SKU:</td>
                  <td className="value">
                    <a>{selectedProduct.sku}</a>
                  </td>
                </tr>
                <tr className="single-info">
                  <td className="title">Categories:</td>
                  <td className="value">
                    {product.collections &&
                      product.collections.map((item, index) => {
                        return (
                          <Link
                            href={"/collections/" + item.id + item.slug}
                            as={process.env.PUBLIC_URL + "/collection/" + item.id + "/" + item.slug}
                            key={index}
                          >
                            <a>{index === 0 ? item.name : ", " + item.name}</a>
                          </Link>
                        );
                      })}
                  </td>
                </tr>
                <tr className="single-info">
                  <td className="title">Tags:</td>
                  <td className="value">
                    {product.tag &&
                      product.tag.map((item, index, arr) => {
                        return (
                          <p key={index}>{item + (index !== arr.length - 1 ? ", " : "")}</p>
                          // <Link
                          //   href="/shop/left-sidebar"
                          //   as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
                          //   key={index}
                          // >
                          //   <a>
                          //     {item + (index !== arr.length - 1 ? ", " : "")}
                          //   </a>
                          // </Link>
                        );
                      })}
                  </td>
                </tr>
                <tr className="single-info">
                  <td className="title">Share on:</td>
                  <td className="value">
                    <ul className="social-icons">
                      <li>
                        <a href="https://www.twitter.com">
                          <FaTwitter />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.facebook.com">
                          <FaFacebookF />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.instagram.com">
                          <FaInstagram />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.youtube.com">
                          <FaYoutube />
                        </a>
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
            {product.channel && product.channel.code && product.channel.code !== "__default_channel__" ? <Seller channel={product.channel}/> : null}
        </Fragment>
    </div>
  );
};

export default ProductDescription;
