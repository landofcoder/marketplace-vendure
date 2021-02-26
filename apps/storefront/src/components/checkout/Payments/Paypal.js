import React, { useState, useEffect, useRef } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import {CREATE_PAYMENT_PAYPAL_METHOD, EXECUTE_PAYMENT_PAYPAL_METHOD, PAYPAL_ENV} from "@bavaan/graphql/checkout/checkout-payment.graphql";

import { connect } from "react-redux";
import {client} from "../../../config/graphql";

const Paypal = ({ paymentAction, addToast }) => {
  const [scriptLoaded, loadScript ] = useState(false);
  const paypal = useRef();
  const paypalEnv = useQuery(PAYPAL_ENV, {});

  useEffect(() => {
    const script = document.createElement('script');
    script.id = "paypalobjects";
    script.src = "https://www.paypalobjects.com/api/checkout.js";
    if(paypalEnv.data){
      script.onload = ()=>{
        loadPaypalButton(paypalEnv.data.getPaypalEnv);
      };
      document.body.appendChild(script);
      loadScript(true);
    }
    return () => {
      if(document.getElementById('paypalobjects')){
        document.body.removeChild(script);
      }
      loadScript(false);
    }
  }, [paypalEnv.data]);

  function loadPaypalButton(env){
      // Render the PayPal button into #paypal-button-container
    window.paypal.Button.render({
      env: env, //'sandbox' Or 'production'
      // Set up the payment:
      // 1. Add a payment callback
      payment: function(data, actions) {
        // 2. Make a request to your server
          return client.mutate({
            mutation: CREATE_PAYMENT_PAYPAL_METHOD,
            variables: {
              returnURL: window.location.origin + '/other/checkout/complete/success',
              cancelURL: window.location.href
            },
          }).then((res) => {
            // 3. Return res.id from the response
            return res.data.createPaymentForPaypalMethod.id;
          });

        },

      // Execute the payment:
      // 1. Add an onAuthorize callback
      onAuthorize: function(data, actions) {
        // 2. Make a request to your server
          return client.mutate({
            mutation: EXECUTE_PAYMENT_PAYPAL_METHOD,
            variables: {
              paymentID: data.paymentID,
              payerID: data.payerID
            },
          }).then(function(res) {
            paymentAction("paypal", res.data.executePaymentForPaypalMethod.data)
          });

        }
      }, '#paypal-button')

    }


  return (
    <div className="col-12">
      <div id="paypal-button"></div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, null)(Paypal);
