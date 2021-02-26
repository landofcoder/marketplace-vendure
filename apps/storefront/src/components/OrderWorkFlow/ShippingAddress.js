import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import {IoIosCheckmarkCircle} from "react-icons/io";
const ShippingAddress = ({cartItems}) => {
    return (
        <React.Fragment>
          <Container className="shipping-address-container">
            <Row className="shipping-address-header">
              <IoIosCheckmarkCircle className="shipping-address-icon-check"/>
              <h6>Shipping Address</h6>
            </Row>
            <Row style={{opacity: '0.8'}}>
              <Col lg={4}>
                {cartItems && cartItems.orders && cartItems.orders.length > 0 ? (
                  <>
                    <p>{cartItems?.orders[0]?.customer?.firstName + ' ' + cartItems?.orders[0]?.customer?.lastName}</p>
                    <p>{cartItems?.orders[0]?.customer?.phoneNumber}</p>
                  </>
                ): ''}
              </Col>
              <Col lg={8}>
                {cartItems && cartItems.orders && cartItems.orders.length > 0 && cartItems.orders[0].shippingAddress != null ?
                (<p>{cartItems.orders[0].shippingAddress.streetLine1}</p>):
                null
              }
              </Col>
            </Row>
          </Container>
        </React.Fragment>
        
    )
};
const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData
  }
};
export default connect(mapStateToProps, null)(React.memo(ShippingAddress))
