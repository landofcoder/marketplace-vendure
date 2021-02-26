import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Container, Row, Col, Form, Button, Badge } from "react-bootstrap";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import {
  addToVendor,
  decreaseQuantity,
  updateCartByAPI,
  deleteFromCart,
  deleteAllFromCart,
  applyCouponCode,
  removeCouponCode,
  assignPrevStep,
} from "../../redux/actions/cartActions";
import { formatterConvertCurrency, getDiscountPrice } from "../../lib/product";
import { LayoutFive } from "../../components/Layout";
import BreadcrumbOne from "../../components/Breadcrumb/BreadcrumbOne";
import { IoIosClose, IoMdCart } from "react-icons/io";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_ACTIVE_CUSTOMER } from "@bavaan/graphql/documents.graphql";
import {
  APPLY_COUPON_CODE,
  APPLY_COUPON_CODE_ORDER_VENDOR,
} from "@bavaan/graphql/checkout/checkout-shipping.graphql";
import {
  BsAwardFill,
  BsFillCalendarFill,
  BsFillKanbanFill,
} from "react-icons/bs";
import CouponCode from "../../components/checkout/CouponCode";
import Promotion from "../../components/checkout/Promotion";
import { GET_ACTIVE_ORDER_VENDOR } from "@bavaan/graphql/cart/cart-drawer.graphql";

const Cart = ({
  decreaseQuantity,
  addToVendor,
  deleteFromCart,
  updateCartByAPI,
  deleteAllFromCart,
  applyCouponCode,
  removeCouponCode,
  assignPrevStep,
  total,
}) => {
  const [quantityCount] = useState(1);
  const [valueCoupon, setValueCoupon] = useState({
    orderId: "",
    couponCode: "",
  });
  const { addToast } = useToasts();
  const [isCustomerActive, setCustomerActive] = useState(false);
  const [applyCouponCodeRes] = useMutation(APPLY_COUPON_CODE_ORDER_VENDOR, {});

  const couponCodeRef = useRef([]);

  var formatter = null;
  //DEFINE FORMAT IF ORDER EXISTS

  const activeCustomerRes = useQuery(GET_ACTIVE_CUSTOMER);
  useEffect(() => {
    if (activeCustomerRes.data && activeCustomerRes.data.activeCustomer) {
      setCustomerActive(true);
    }
  }, [activeCustomerRes]);
  useEffect(() => {
    document.querySelector("body").classList.remove("overflow-hidden");
  });
  let cartItems = useQuery(GET_ACTIVE_ORDER_VENDOR, {
    fetchPolicy: "network-only",
  });
  cartItems = cartItems.data?.activeOrderVendors;

  useEffect(() => {
    assignPrevStep("/other/cart");
  }, []);

  if (cartItems != null && cartItems.length > 0) {
    formatter = formatterConvertCurrency(cartItems[0].currencyCode);
  }

  return (
    <LayoutFive>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle="Cart"
        backgroundImage="/assets/images/example/about-us/breadcrumb-example.png"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>

          <li>Cart</li>
        </ul>
      </BreadcrumbOne>

      {/* cart content */}
      <div className="cart-content space-mt--r130 space-mb--r130">
        <Container>
          {cartItems && cartItems.length >= 1 ? (
            <>
              <Row>
                <Col lg={12}>
                  {/* cart table */}
                  <table className="cart-table">
                    <thead>
                      <tr>
                        <th className="product-name" colSpan="2">
                          Product
                        </th>
                        <th className="product-price">Price</th>
                        <th className="product-quantity">Quantity</th>
                        <th className="product-subtotal">Total</th>
                        <th className="product-remove">&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((order, i) => (
                        <React.Fragment key={i}>
                          <tr>
                            {order && order.channel && order.channel.code && order.channel.code !== "__default_channel__" ? <td colSpan="6">{order.channel.code}</td> : null}
                          </tr>
                          {order.lines.map((product, j) => {
                            const discountedPrice = product.unitPriceWithTax;
                            return (
                              <tr key={j}>
                                <td className="product-thumbnail">
                                  <a>
                                    <img
                                      src={product.featuredAsset?.preview}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </a>
                                </td>
                                <td className="product-name">
                                  <a>{product.productVariant.name}</a>
                                  {product.selectedProductColor &&
                                  product.selectedProductSize ? (
                                    <div className="product-variation">
                                      <span>
                                        Color: {product.selectedProductColor}
                                      </span>
                                      <span>
                                        Size: {product.selectedProductSize}
                                      </span>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </td>
                                <td className="product-price">
                                  <span className="price">
                                    {formatter.format(discountedPrice)}
                                  </span>
                                </td>
                                <td className="product-quantity">
                                  <div className="cart-plus-minus">
                                    <button
                                      className="dec qtybutton"
                                      onClick={() =>
                                        decreaseQuantity(product, addToast)
                                      }
                                    >
                                      -
                                    </button>
                                    <input
                                      className="cart-plus-minus-box"
                                      type="text"
                                      value={product.quantity}
                                      readOnly
                                    />
                                    <button
                                      className="inc qtybutton"
                                      onClick={() => {
                                        addToVendor(
                                          {
                                            id: product.productVariant.id,
                                            channel: { id: order.channel.id },
                                          },
                                          addToast,
                                          quantityCount
                                        );
                                      }}
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td className="total-price">
                                  <span className="price">
                                    {formatter.format(
                                      product.totalPrice.toFixed(2)
                                    )}
                                  </span>
                                </td>

                                <td className="product-remove">
                                  <button
                                    onClick={() =>
                                      deleteFromCart(product, addToast)
                                    }
                                  >
                                    <IoIosClose />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                          <tr>
                            <td colSpan="6">
                              <CouponCode order={order}></CouponCode>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="6">
                              <Promotion
                                order={order}
                                formatter={formatter}
                              ></Promotion>
                              {order.shipping != null ? (
                                <React.Fragment>
                                  <Row>
                                    {/* <BsFillCalendarFill></BsFillCalendarFill> */}
                                    <Col md={5}>
                                      <h6>
                                        SHIPPING{" "}
                                        {": " +
                                          formatter.format(
                                            order.shipping.toFixed(2)
                                          )}
                                      </h6>
                                    </Col>
                                  </Row>
                                  <br />
                                </React.Fragment>
                              ) : null}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="6">
                              <Row>
                                {/* <BsFillCalendarFill></BsFillCalendarFill> */}
                                <Col md={5}>
                                  <h6>
                                    SUBTOTAL{" "}
                                    {": " +
                                      formatter.format(order.total.toFixed(2))}
                                  </h6>
                                </Col>
                              </Row>
                            </td>
                          </tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </Col>
              </Row>
              <br />
              <Row className="view-cart-footer">
                <Col lg={4} className="text-align-center">
                  <h4>CART TOTAL: {formatter.format(total.toFixed(2))}</h4>
                </Col>
                <Col lg={2} className="mg-20"></Col>
                <Col lg={5}>
                  <div className="cart-calculation-button text-center">
                    <Link
                      href="/other/checkout/shipping"
                      as={process.env.PUBLIC_URL + "/other/checkout/shipping"}
                    >
                      <a className="lezada-button lezada-button--medium">
                        proceed to checkout
                      </a>
                    </Link>
                  </div>
                </Col>
              </Row>
            </>
          ) : (
            <Row>
              <Col>
                <div className="item-empty-area text-center">
                  <div className="item-empty-area__icon space-mb--30">
                    <IoMdCart />
                  </div>
                  <div className="item-empty-area__text">
                    <p className="space-mb--30">No items found in cart</p>
                    <Link href="/" as={process.env.PUBLIC_URL + "/"}>
                      <a className="lezada-button lezada-button--medium">
                        Shop Now
                      </a>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </LayoutFive>
  );
};

const mapStateToProps = (state) => {
  return {
    // cartItems: state.cartData,
    total: state.cartData.totalCartPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToVendor: (item, addToast, quantityCount) => {
      dispatch(addToVendor(item, addToast, quantityCount));
    },
    updateCartByAPI: () => {
      dispatch(updateCartByAPI());
    },
    decreaseQuantity: (item, addToast) => {
      dispatch(decreaseQuantity(item, addToast));
    },
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
    deleteAllFromCart: (addToast) => {
      dispatch(deleteAllFromCart(addToast));
    },
    applyCouponCode: (orderId, couponCode, addToast) => {
      dispatch(applyCouponCode(orderId, couponCode, addToast));
    },
    removeCouponCode: (orderId, couponCode, addToast) => {
      dispatch(removeCouponCode(orderId, couponCode, addToast));
    },
    assignPrevStep: (prevStep) => {
      dispatch(assignPrevStep(prevStep));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
