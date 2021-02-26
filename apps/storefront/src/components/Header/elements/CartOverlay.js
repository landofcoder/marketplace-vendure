import React from 'react';
import Link from "next/link";
import { IoIosClose } from "react-icons/io";
import CustomScroll from "react-custom-scroll";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import {
  getDiscountPrice,
  formatterConvertCurrency,
} from "../../../lib/product";
import { deleteFromCart } from "../../../redux/actions/cartActions";

const CartOverlay = ({
  activeStatus,
  getActiveStatus,
  cartItems,
  deleteFromCart,
}) => {
  let cartTotalPrice = 0;
  const { addToast } = useToasts();
  let formatter = { format: () => null };
  if (cartItems && cartItems.orders && cartItems.orders.length > 0) {
    formatter = formatterConvertCurrency(cartItems.orders[0].currencyCode);
  }
  return (
    <div className={`cart-overlay ${activeStatus ? "active" : ""}`}>
      <div
        className="cart-overlay__close"
        onClick={() => {
          getActiveStatus(false);
          document.querySelector("body").classList.remove("overflow-hidden");
        }}
      />
      <div className="cart-overlay__content">
        <button
          className="cart-overlay__close-icon"
          onClick={() => {
            getActiveStatus(false);
            document.querySelector("body").classList.remove("overflow-hidden");
          }}
        >
          <IoIosClose />
        </button>
        <div className="cart-overlay__content-container">
          <h3 className="cart-title">Cart</h3>
          {cartItems && cartItems.orders && cartItems.orders.length > 0 ? (
            <div className="cart-product-wrapper">
              <div className="cart-product-container">
                <CustomScroll allowOuterScroll={true}>
                  {cartItems.orders.map((order, i) => {

                    const products_by_order = order.lines;
                    return (
                      <React.Fragment key={i}>
                          {order && order.channel && order.channel.code && order.channel.code !== "__default_channel__" ? <div
                              className="channel-code"
                              style={{paddingBottom: "20px"}}
                          >
                              <Link href={process.env.PUBLIC_URL + "/shop/" + order?.channel?.code + "/shop_store_home"}>
                                  <a title='View Shop'>{' ' + order?.channel?.code}</a>
                              </Link>
                          </div> : null}
                        {products_by_order && products_by_order.map((product, j) => {
                        const discountedPrice = product.unitPriceWithTax;
                        cartTotalPrice += product.totalPrice;

                        return (
                          
                          <div className="container single-cart-product" key={j}>
                            
                            <span className="cart-close-icon">
                              <button
                                onClick={() => deleteFromCart(product, addToast)}
                              >
                                <IoIosClose></IoIosClose>
                              </button>
                            </span>
                            
                            <div className="image">
                                <Link href={process.env.PUBLIC_URL + "/product/" + product.productVariant.product.slug}>
                                    <a>
                                        <img
                                            src={product.featuredAsset?.preview}
                                            className="img-fluid"
                                            alt={product.productVariant.name}
                                        />
                                    </a>
                                </Link>
                            </div>
                            <div className="content">
                              <h5>
                                  <Link href={process.env.PUBLIC_URL + "/product/" + product.productVariant.product.slug}>
                                      <a>
                                          {product.productVariant.name}
                                      </a>
                                  </Link>
                              </h5>
                              {product.selectedProductColor && product.selectedProductSize ?
                                (
                                  <div className="cart-item-variation">
                                    <span>Color: {product.selectedProductColor}</span>
                                    <span>Size: {product.selectedProductSize}</span>
                                  </div>
                                )
                                :
                                null
                              }
                              <p>
                                <span className="cart-count">
                                  {product.quantity} x {" "}
                                </span>
                                {' '}
                                <span className="discounted-price">
                                  {formatter.format(discountedPrice)}
                                </span>
                                <br/>
                                <span className='discounted-price'>
                                  ({` Include ${product.productVariant.taxRateApplied.value} % TAX `})
                                </span>
                              </p>
                            </div>
                          </div>
                        )
                      })}
                      </React.Fragment>
                    )
                  })}
                </CustomScroll>
              </div>
              <p className='cart-subtotal'>
                <span className='subtotal-title'>
                  Subtotal:
                </span>
                <span className='subtotal-amount'>
                  {formatter.format(cartTotalPrice.toFixed(2))}
                </span>
              </p>
              <div className='cart-buttons'>
                <Link href='/other/cart' as={process.env.PUBLIC_URL + "/other/cart"}>
                  <a>View Cart</a>
                </Link>
                <Link href="/other/checkout/shipping" as={process.env.PUBLIC_URL + "/other/checkout/shipping"}>
                  <a>Checkout</a>
                </Link>
              </div>
              <p className='free-shipping-text'></p>
            </div>
          ): ("No items found in cart")}
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
