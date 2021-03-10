import React, { useEffect, useState, useRef } from "react";
import { formatterConvertCurrency } from "../../lib/product";
import { connect } from "react-redux";
import { Form, Button, Badge, Row, Col } from "react-bootstrap";

import { useToasts } from "react-toast-notifications";
import { applyShippingMethodByOrder, removeCouponCode, applyCouponCode } from "../../redux/actions/cartActions";
import CouponCode from './CouponCode';
import Promotion from './Promotion';
import { Collapse, CardBody, Card, CardHeader } from "reactstrap";
import ShippingAddress from '../OrderWorkFlow/ShippingAddress';
function CartTotal({
  cartItems, isComplete, total,
  hasShippingAddress, applyShippingMethodByOrder,
  removeCouponCode,
  applyCouponCode
 }) {

  const { addToast } = useToasts();
  const couponCodeRef = useRef([]);
  const [valueCoupon, setValueCoupon] = useState({'orderId': '', 'couponCode': ''});
  let formatter = { format: () => null };
  if (cartItems && cartItems.orders && cartItems.orders.length > 0) {
    formatter = formatterConvertCurrency(cartItems.orders[0].currencyCode);
  }
  
  return (
      <Card style={{margin: "auto"}}>
          <CardHeader className='border-bottom-0'>
              <div id="billing-form" className="space-mb--40">
                  <h3>
                      Shipping Info
                  </h3>
                  <ShippingAddress/>
              </div>
          </CardHeader>
          <Collapse
              className='card-body'
              isOpen={true}
          >
              <form>
                <div className="col-12 space-mb--50">
                  {isComplete ? (
                    <>
                      <h1 className="text-center">Thank you for your order !</h1>
                      <h4 className="checkout-title text-center mb-0 mt-2">
                        Order : {cartItems.code}
                      </h4>
                      <h4 className="checkout-title text-center">
                        Placed : {new Date(cartItems.updatedAt).toTimeString()}
                      </h4>
                    </>
                  ) : (
                      <div id="billing-form" className="space-mb--40">
                          <h3 className="checkout-title">
                              Cart Total
                          </h3>
                      </div>
                  )}

                  <div className="checkout-cart-total">
                    <h4>
                      Product <span>Total</span>
                    </h4>
                    
                    {cartItems != undefined && cartItems.orders != undefined && cartItems.orders.length > 0 ?
                          (

                            <React.Fragment>
                              {cartItems.orders.map((order, i) => {

                                return (
                                  <React.Fragment key={i}>
                                      {order && order.channel && order.channel.code && order.channel.code !== "__default_channel__" ? <span>{order.channel.code}</span> : null}
                                    <ul>
                                      {order.lines.map((product, j) => {
                                        return (
                                          <li key={j}>
                                            { product.productVariant.name } X { " " }
                                            { product.quantity } { " " }
                                            <span>{formatter.format(product.totalPrice)}</span>
                                          </li>
                                        )
                                      })}
                                    </ul>

                                    {hasShippingAddress &&  hasShippingAddress == true ? (
                                      <React.Fragment>
                                        <p>
                                        Select Shipping Method{" "}
                                        <Form.Control as='select' onChange={(event) => applyShippingMethodByOrder(event.target.value, order.id, addToast)} defaultValue={order.shippingMethod != null ? order.shippingMethod.id : 0}>
                                          <option value={0} >Choose shipping method</option>
                                          {

                                            order.channel.shippingMethod.map((method, k) => {
                                              return (
                                                <option key={k} value={method.id}>{method.code + ' - ' + formatter.format(method.calculator.args[0].value) + ' $'}</option>
                                              )
                                            })
                                          }
                                        </Form.Control>

                                      </p>
                                      <br/>
                                      <CouponCode order={order}></CouponCode>
                                      <br/>
                                      <hr/>
                                      <br/>
                                      <Promotion order={order} formatter={formatter}></Promotion>
                                      <hr/>
                                    </React.Fragment>
                                    ): null}
                                    {order.shippingMethod != null ?
                                    (
                                      <p>
                                      Shipping method{" "}
                                      <span>{formatter.format(order.shipping.toFixed(2))}</span>
                                    </p>
                                    ):
                                    null
                                  }
                                  {order.couponCodes.length > 0 ?
                                    (
                                      <p>
                                      Coupon Code{" "}
                                      <span>{order.couponCodes[0]}</span>
                                    </p>
                                    ):
                                    null
                                  }
                                    <p>
                                      Sub Total{" "}
                                      <span>{formatter.format(order.total.toFixed(2))}</span>
                                    </p>
                                  </React.Fragment>
                                )
                              })}
                              <br/>

                              <h5>TOTAL {formatter.format(total.toFixed(2))}</h5>


                            {/* <ul>
                              {cartItems.orders.map(order => {
                            return (
                              order.lines.map((line, j) => {
                                console.log('PRD', line)
                                return (

                                  <li key={j}>
                                    { line.productVariant.name } X { " " }
                                    { line.quantity } { " " }
                                    <span>{formatter.format(line.totalPrice)}</span>
                                  </li>
                                )
                              })

                            )
                          })}
                            </ul> */}

                            {/* <p>
                              Sub Total{" "}
                              <span>{formatter.format(cartItems.subTotal)}</span>
                            </p>
                            <p>
                              Shipping Fee{" "}
                              <span>{formatter.format(cartItems.shipping)}</span>
                            </p>
                            <h4>
                              Grand Total{" "}
                              <span>{formatter.format(cartItems.total)}</span>
                            </h4> */}
                            </React.Fragment>
                      ): null
                    }
                  </div>
                </div>
              </form>
          </Collapse>
      </Card>
  )
}
const mapStateToProps = (state) => {
  return {
    total: state.cartData.totalCartPrice,
  };
};

const mapDispatchTopProps = (dispatch) => {
  return {
    applyShippingMethodByOrder: (methodId, orderId, addToast) => {
      dispatch(applyShippingMethodByOrder(methodId, orderId, addToast));
    },
    removeCouponCode: (orderId, couponCode, addToast) => {
      dispatch(removeCouponCode(orderId, couponCode, addToast));
    },
    applyCouponCode: (orderId, couponCode, addToast) => {
      dispatch(applyCouponCode(orderId, couponCode, addToast));
    },
  };
}
export default connect(mapStateToProps, mapDispatchTopProps)(CartTotal);
