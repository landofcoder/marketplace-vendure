import React from "react";

import { connect } from "react-redux";

const CashOnDelivery = ({ actionSendCard, addToast }) => {

    const paymentAction = async () => {
        try {
            // Send the nonce to your server
            actionSendCard("cod-payment", {authorized: "cod"})
        } catch (err) {
            if (addToast) {
                addToast("Please choose payment method !", {
                    appearance: "error",
                    autoDismiss: true,
                });
            }
        }
    };

    return (
        <div>
            <React.Fragment>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        paymentAction();
                    }}
                    className="lezada-button lezada-button--small m-3"
                >
                    PAY WITH CASH ON DELIVERY
                </button>
            </React.Fragment>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};
export default connect(mapStateToProps, null)(CashOnDelivery);
