import React from 'react';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import { BsFillCalendarFill, BsAwardFill, BsFillKanbanFill } from 'react-icons/bs';

const Promotion = ({ order, formatter }) => {
    return (
        
        <React.Fragment>
            {order.couponCodes.length > 0 ? (
                <React.Fragment>
                <Row>
                    <BsFillCalendarFill></BsFillCalendarFill>
                    <h6>SUBTOTAL {": " + formatter.format(order.subTotal.toFixed(2))}</h6>
                </Row>
                <br/>
                <Row>
                    <BsAwardFill></BsAwardFill>
                    <del>
                        <h6>
                            DISCOUNT { ": " + formatter.format((order.subTotal - order.total + order.shipping).toFixed(2)) }
                        </h6>
                    </del>
                </Row>
                <br/>
                </React.Fragment>
            ): null}
        </React.Fragment>
    )
}

export default Promotion
