import { useState, useEffect } from "react";
import BrainTree from "./Payments/BrainTree";
import Payumoney from "./Payments/Payumoney";
const PaymentMethod = ({ actionSendCard }) => {
  const [card, setCard] = useState({});
  const [paymentMethod, setpaymentMethod] = useState(null);
  return (
    <div className="col-lg-7 row justify-content-center">
      <div className="col-lg-10">
        <div className="card p-3">
          <div className="row justify-content-center">
            <div className="col-12">
              <h2 className="heading text-center checkout-title">
                Payment Method
              </h2>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              actionSendCard(card);
            }}
            className="form-card"
          >
            <div className="row justify-content-center form-group">
              <div className="col-12 d-flex justify-content-center">
                <button
                  className="lezada-button lezada-button--small m-3"
                  onClick={(e) => {
                    e.preventDefault();
                    setpaymentMethod("cod");
                    actionSendCard("cod-payment", { foo: "bar" });
                  }}
                >
                  Cash on Delivery
                </button>
                <button
                  className="lezada-button lezada-button--small m-3"
                  onClick={(e) => {
                    e.preventDefault();
                    setpaymentMethod("braintree");
                  }}
                >
                  BrainTree payment
                </button>
                <button
                  className="lezada-button lezada-button--small m-3"
                  onClick={(e) => {
                    e.preventDefault();
                    setpaymentMethod("payumoney");
                  }}
                >
                  Payumoney payment
                </button>
              </div>
              <BrainTree
                actionSendCard={actionSendCard}
                showingPayment={paymentMethod === "braintree"}
              />
              <Payumoney
                actionSendCard={actionSendCard}
                showingPayment={paymentMethod === "payumoney"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
