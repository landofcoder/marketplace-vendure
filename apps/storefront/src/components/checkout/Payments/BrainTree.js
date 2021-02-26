import React, { useState, useEffect } from "react";
import { GET_BRAINTREE_TOKEN } from "@bavaan/graphql/checkout/checkout-payment.graphql";
import { connect } from "react-redux";
import { client } from "../../../config/graphql";
import DropInBraintree from './DropInBraintree';
const BrainTree = ({ showingPayment, actionSendCard, addToast }) => {
  const [token, setToken] = useState(null);
  const [instance, setInstance] = useState(null);
  // const [flag, setFlag] = useState(false);
  // will need to modify if current
  // end
  const paymentAction = async () => {
    try {
      // Send the nonce to your server
      // if (flag === true) {
      //   actionSendCard("cod-payment", {authorized: "cod"})
      // }
      // else {
      //   const braintreeResult = await instance.requestPaymentMethod();
      //   actionSendCard("braintree", braintreeResult)
      // }
      const braintreeResult = await instance.requestPaymentMethod();
        actionSendCard("braintree", braintreeResult)
    } catch (err) {
      if (addToast) {
        addToast("Please choose payment method !", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  };
  client.query({
    query: GET_BRAINTREE_TOKEN,
  }).then(({loading, data, error}) => {
    setToken(data.generateBraintreeClientToken)
    
  }).catch(error => {
    console.log(error)
  });
  // let cod = document.getElementsByClassName('classNametree-option__cod')[0];
  let payment = document.getElementsByClassName('braintree-large-button')[0];
  let heading = document.getElementsByClassName('braintree-heading')[2];
  // if (payment && cod) {
    // cod.addEventListener('click', () => {
    //   if (heading) {
    //     heading.style.display = "none"
    //   }
    //   setFlag(true)
    // });
  if (payment) {
    payment.addEventListener('click', () => {
      // setFlag(false);
      heading.style.display = "block"
    })
  }
  return (
    <div className="col-12">
      {showingPayment && token ? (
        <>
          <DropInBraintree
            options={{
              authorization: token,
              // paypal: {
              //   flow: "checkout",
              //   buttonStyle: {
              //     color: "blue",
              //     shape: "rect",
              //     size: "medium",
              //   },
              // },
              vaultManager: true,
              card: {
                cardholderName: {
                  // to make cardholder name required
                  required: true,
                },
              },
            }}
            onInstance={(instance) => {
              setInstance(instance);
            }}
          />
          {instance ? (
            <React.Fragment>
              <button
              onClick={(e) => {
                e.preventDefault();
                paymentAction();
              }}
              className="lezada-button lezada-button--small m-3"
            >
              PAY NOW
            </button>

            </React.Fragment>

          ) : null}
        </>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, null)(React.memo(BrainTree));
