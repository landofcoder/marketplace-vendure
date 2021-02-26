import { ELIGIBLE_VENDOR_SHIPPING_METHODS } from '@bavaan/graphql/checkout/checkout-shipping.graphql';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import { client } from '../../config/graphql';
import { applyShippingMethodByOrder } from '../../redux/actions/cartActions';
import { Form } from 'react-bootstrap';
import { formatterConvertCurrency } from '../../lib/product';
import { useToasts } from "react-toast-notifications";
const ShippingMethod = ({ applyShippingMethodByOrder, order}) => {
    
    const [shippingMethodByOrder, setShippingMethodByOrder] = useState([])
    const {addToast} = useToasts();
    let formatter = { format: () => null };
    if (order) {
        formatter = formatterConvertCurrency(order.currencyCode);
    }

    useEffect(() => {
        if(!shippingMethodByOrder.length){
            client.query({
                query: ELIGIBLE_VENDOR_SHIPPING_METHODS,
                variables: {
                    id: order.id
                }
            }).then(response => {
                if(response?.data?.eligibleVendorShippingMethods.length){
                    applyShippingMethodByOrder(response.data.eligibleVendorShippingMethods[0].id, order.id, addToast)
                    setShippingMethodByOrder(response.data.eligibleVendorShippingMethods)
                }
            }).catch(e=> console.log(e))

        }

    },[shippingMethodByOrder])

    return (
        <Form.Control as="select"
                                        
            style={{
                display: 'inline', paddingRight: '10px',
                border: 'none',
                boxShadow: "none",
                backgroundColor: "transparent",
                borderBottom: "1px solid grey",
                borderRadius: '0'
                
                }}
                value={order?.shippingMethod?.id}
                onChange={(event) => applyShippingMethodByOrder(event.target.value, order.id, addToast)}
            >
                {shippingMethodByOrder != null ? shippingMethodByOrder.map((method, k) => {
                    return (
                        <option key={k} value={method.id}>{method.description + ' ' + formatter.format(method.price) }</option>
                    )
                }): null}
        </Form.Control>
    )
}
const mapStateToProps = (state) => {
    return {
        
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        applyShippingMethodByOrder: (methodId, orderId, addToast) => {
            dispatch(applyShippingMethodByOrder(methodId, orderId, addToast))
        },
    }
}
export default React.memo(connect(mapStateToProps, mapDispatchToProps)(ShippingMethod));