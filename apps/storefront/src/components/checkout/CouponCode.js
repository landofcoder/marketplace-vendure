import React, { useRef } from 'react'
import { Row, Col, Button, Badge } from 'react-bootstrap';
import { applyCouponCode, removeCouponCode } from '../../redux/actions/cartActions';
import { connect } from 'react-redux';
import { useToasts } from "react-toast-notifications";

const CouponCode = ({ order, applyCouponCode, removeCouponCode }) => {
    
    const couponCodeEl = useRef('');
    const { addToast } = useToasts();

    
    return (
        <React.Fragment>
            {order.couponCodes.length > 0 ?
            (
                <Button
                    type="button"
                    variant="outline-success"
                    size="sm"
                >
                    <b>{order.couponCodes[0]}</b>
                    <Badge
                        variant="danger"
                        onClick={() => removeCouponCode(order.id, order.couponCodes[0], addToast)}
                    >
                        X
                    </Badge>
                </Button>
            ):
            (
                <div className="lezada-form coupon-form">
                    <form
                        onSubmit={(e) => {
                        e.preventDefault();
                        applyCouponCode(order.id, couponCodeEl.current.value, addToast);
                        }}
                    >
                        <Row>
                        <Col md={7}>
                            <input
                            type="text"
                            ref = {el => couponCodeEl.current = el}
                            placeholder="Enter your coupon code"
                            />
                        </Col>
                        <Col md={5}>
                            <button
                            type="submit"
                            className="lezada-button lezada-button--medium"
                            >
                            apply coupon
                            </button>
                        </Col>
                        </Row>
                    </form>
                </div>
            )
        }
        </React.Fragment>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        applyCouponCode: (orderId, couponCode, addToast) => {
            dispatch(applyCouponCode(orderId, couponCode, addToast))
        },
        removeCouponCode: (orderId, couponCode, addToast) => {
            dispatch(removeCouponCode(orderId, couponCode, addToast))
        }
    }
}

export default connect(null, mapDispatchToProps)(CouponCode);
