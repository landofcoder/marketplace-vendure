import React, {useRef, useEffect} from 'react';
import {Col, Container, Row, Form, Button,} from 'react-bootstrap';
import {connect} from 'react-redux'
import { formatterConvertCurrency } from '../../lib/product';
import { applyShippingMethodByOrder, applyCouponCode, processToPayment, removeCouponCode } from '../../redux/actions/cartActions';
import { useToasts } from "react-toast-notifications";
import { ELIGIBLE_VENDOR_SHIPPING_METHODS } from '@bavaan/graphql/checkout/checkout-shipping.graphql';
import { useRouter } from "next/router";
import { client } from '../../config/graphql';
import ShippingMethod from './ShippingMethod';
const ProductReview = ({cartItems, applyShippingMethodByOrder, applyCouponCode, totalCartPrice, processToPayment, removeCouponCode}) => {
    const router = useRouter();
    const couponCodeRef = useRef('');
    const {addToast} = useToasts();
    let formatter = { format: () => null };
    if (cartItems && cartItems.orders && cartItems.orders.length > 0) {
        formatter = formatterConvertCurrency(cartItems.orders[0].currencyCode);
    }
    // let shippingMethodByOrder = [];
    // if (cartItems.orders && cartItems.orders.length > 0) {
    //     cartItems.orders.map((order, index) => {
    //         // const response = await client.query({
    //         //     query: ELIGIBLE_VENDOR_SHIPPING_METHODS,
    //         //     variables: {
    //         //         id: order.id
    //         //     }
    //         // })
    //         client.query({
    //             query: ELIGIBLE_VENDOR_SHIPPING_METHODS,
    //             variables: {
    //                 id: order.id
    //             }
    //         }).then(response => {
    //             if (response != null && response.data && response.data.eligibleVendorShippingMethods != null) {
    //                 shippingMethodByOrder.push(response.data.eligibleVendorShippingMethods)
    //             }
    //             console.log("ID", order.id);
    //             console.log("RES",response);
    //             console.log("ARR", shippingMethodByOrder)
    //         }).catch(error => {
    //             console.log(error)
    //         })
    //         // if (response != null && response.data && response.data.eligibleVendorShippingMethods != null) {
    //         //     shippingMethodByOrder.push(response.data.eligibleVendorShippingMethods)
    //         // }
    //     })
    // }
    // if (cartItems && cartItems?.orders?.length > 0 ) {
    //     if (cartItems.orders[0].state === 'ArrangingPayment') {
    //         router.push('/other/checkout/payment')
    //     }
    // }
    // useEffect(() => {
    //     if (cartItems && cartItems?.orders?.length > 0 ) {
    //         if (cartItems.orders[0].state === 'ArrangingPayment') {
    //             router.push('/other/checkout/payment')
    //         }
    //     }
    // }, [])
    return(
        <>
            <Container style={{border: '1px solid #aba6a6'}}>
                <Row className="ordered-list-header" style={{borderBottom: '1px solid #aba6a6'}}>
                    <Col md={4} className="order-field">Product</Col>
                    <Col md={2} className="order-field"></Col>
                    <Col md={2} className="order-field">Price Each</Col>
                    <Col md={1} className="order-field">Quantity</Col>
                    <Col md={2} className="order-field">Total</Col>
                </Row>
                {cartItems && cartItems.orders && cartItems.orders.length > 0 ? (
                    cartItems.orders.map((order, i) => {
                        if (order != null) {
                            return (
                                <React.Fragment key={i}>
                                <div className="ordered-list-by-channel">
                                {order && order.channel && order.channel.code && order.channel.code !== "__default_channel__" ? <h6 style={{backgroundColor: '#FBFBFB', padding: '15px'}}>{order.channel.code}</h6> : null}
                                {order.lines.map((product, j) => {
                                    if (product != null) {
                                        return (
                                            <Row className="ordered-item" key={j}>
                                        <Col md={4} style={{display: 'flex'}}>
                                            
                                            <img className="img-fluid" src={product.featuredAsset?.preview} alt="img" style={{width: '80px', height: '80px'}}/>
                                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                                <span className="product-name">
                                                    {product.productVariant.name}
                                                </span>
                                            </div>
                                        </Col>
                                        <Col md={2} className="order-detail"></Col>
                                        <Col md={2} className="order-detail">{formatter.format(product.unitPriceWithTax)}</Col>
                                        <Col md={1} className="order-detail">{product.quantity}</Col>
                                        <Col md={2} className="order-detail">{formatter.format(product.totalPrice)}</Col>
                                    </Row>
                                        )
                                    }
                                })}
                            </div>
                            <div style={{borderBottom: '1px solid #aba6a6'}}>
                                <div className="responsive-item">
                                    <h4 style={{backgroundColor: '#FBFBFB', padding: '20px'}}>{order.channel.code}</h4>
                                    {order.lines.map((product, j) => {
                                        if (product) {
                                            return (
                                            <Row key={j}>
                                                <Col>
                                                    <img className="img-fluid" src={product.featuredAsset?.preview} alt="img" style={{width: '80px', height: '80px'}}/>
                                                </Col>
                                                <Col style={{margin: 'auto'}}>
                                                    <div>
                                                        {product.productVariant.name + ' x ' + product.quantity}
                                                    </div>
                                                    <div>
                                                        {formatter.format(product.unitPriceWithTax)}
                                                    </div>
                                                </Col>
                                            </Row>
                                            )
                                        }
                                    })}
                                </div>
                                <Row className="ordered-item-responsive">
                                        <Col lg={4}></Col>
                                        <Col lg={4}>
                                        <ShippingMethod order={order} />
                                        </Col>
                                        <Col lg={4}>
                                            <Form.Control
                                            style={{
                                                display: 'inline', paddingRight: '10px',
                                                border: 'none',
                                                boxShadow: "none",
                                                backgroundColor: "transparent",
                                                borderBottom: "1px solid grey",
                                                borderRadius: '0'
                                                }}
                                                ref={el => couponCodeRef.current=el}
                                                defaultValue={order && order.couponCodes && order.couponCodes.length > 0 ? order.couponCodes[0]: null}
                                                disabled={order && order.couponCodes && order.couponCodes.length > 0 ? true: false}
                                                placeholder="Coupon Code..."/>
                                            {
                                                order && order.couponCodes && order.couponCodes.length > 0 ?
                                                (
                                                    <Button variant="danger" size="sm" className="apply-coupon"
                                                        onClick={() => removeCouponCode(order.id, couponCodeRef.current.value, addToast)}
                                                    >
                                                        REMOVE
                                                    </Button>
                                                )
                                                :
                                                (
                                                    <Button variant="danger" size="sm" className="apply-coupon"
                                                        onClick={() => applyCouponCode(order.id, couponCodeRef.current.value, addToast)}
                                                    >
                                                        APPLY
                                                    </Button>
                                                )
                                            }
                                        </Col>
                                    
                                </Row>
                                {order && order.couponCodes && order.couponCodes.length > 0 ? (
                                    <Row className="order-subtotal-responsive">
                                        <Col lg={8}></Col>
                                        <Col>PROMOTION</Col>
                                        <Col>
                                            <del>{formatter.format(order.total - order.shipping - order.subTotal)}</del>
                                        </Col>
                                    </Row>
                                ): null}
                                <Row className="order-subtotal-responsive">
                                    <Col lg={8}></Col>
                                    <Col>TOTAL</Col>
                                    <Col>{formatter.format(order.total)}</Col>
                                </Row>
                            </div>
                        </React.Fragment>
                            )
                        }
                    })
                    
                ): null}
                <Row>
                <Col className="float-right">
                    <div style={{paddingBottom: '20px', textAlign: 'center', fontWeight: 'bold'}}>TOTAL CART PRICE {formatter.format(totalCartPrice)}</div>
                </Col>
            </Row>
            <Row>
            <Col xs={6}>
                <div className="col-md-12 col-12 space-mb--20">
                    <Button
                        type="button"
                        className="lezada-button lezada-button--small button-text"
                        onClick={() => router.replace('/other/checkout/shipping')}
                        style={{backgroundColor: 'transparent', color: 'red'}}
                    >
                        Back
                    </Button>
                </div>
                </Col>
                <Col xs={6}>
                    <div className="col-md-12 col-12 space-mb--20" style={{textAlign: 'right'}}>
                        <Button
                            type="button"
                            className="lezada-button lezada-button--small button-text"
                            onClick={() => processToPayment(addToast)}
                        >
                            Continue
                        </Button>
                    </div>
                </Col>
            </Row>
            </Container>
            
        </>
    )
};
const mapStateToProps = (state) => {
    return {
        cartItems: state.cartData,
        totalCartPrice: state.cartData.totalCartPrice
    }
};
const mapDispatchToProps = dispatch => {
    return {
        applyShippingMethodByOrder: (methodId, orderId, addToast) => {
            dispatch(applyShippingMethodByOrder(methodId, orderId, addToast))
        },
        applyCouponCode: (orderId, couponCode, addToast) => {
            dispatch(applyCouponCode(orderId, couponCode, addToast))
        },
        processToPayment: (addToast) => {
            dispatch(processToPayment(addToast))
        },
        removeCouponCode: (orderId, couponCode, addToast) => {
            dispatch(removeCouponCode(orderId, couponCode, addToast))
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ProductReview));