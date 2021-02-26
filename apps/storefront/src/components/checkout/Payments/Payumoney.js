import React, { useState, useEffect, useRef } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { PAY_UMONEY_TOKEN } from "@bavaan/graphql/checkout/checkout-payment.graphql";

import { connect } from "react-redux";

const Payumoney = ({ paymentAction, addToast }) => {
  const [scriptLoaded, loadScript ] = useState(false)
  const formEl = useRef(null);
  const  { loading, error, data } = useQuery(PAY_UMONEY_TOKEN, {});

  useEffect(() => {
    const script = document.createElement('script');
    script.id = "bolt";
    if(data && data.generatePayumoneyMethod){
      let url = data.generatePayumoneyMethod.isProduction == "false" ? "https://sboxcheckout-static.citruspay.com/bolt/run/bolt.min.js" : "https://checkout-static.citruspay.com/bolt/run/bolt.min.js";
      script.src = url; //
      script["bolt-logo"] = "http://boltiswatching.com/wp-content/uploads/2015/09/Bolt-Logo-e14421724859591.png";
      script.async = true;
      script.onload = ()=>{
        formEl.current.click();
      }
      document.body.appendChild(script);
      loadScript(true);

    }
    return () => {
      if(document.getElementById('bolt')){
        document.body.removeChild(script);
      }
      loadScript(false);
    }
  }, [data]);

  const launchBOLT = (event) => {
    event.preventDefault();
    bolt.launch({
      key: data.generatePayumoneyMethod.key,
      txnid: data.generatePayumoneyMethod.txnid,
      hash: data.generatePayumoneyMethod.hash,
      amount: data.generatePayumoneyMethod.amount,
      firstname: data.generatePayumoneyMethod.firstname,
      email: data.generatePayumoneyMethod.email,
      phone: data.generatePayumoneyMethod.phone,
      productinfo: data.generatePayumoneyMethod.productinfo,
      surl: window.location.origin + '/other/checkout/complete/success',
      furl: window.location.origin + '/other/checkout/checkoutFailure'
    },{ responseHandler: function(BOLT) {
        console.log('BOLT response-----------', BOLT.response);

        if(BOLT.response.txnStatus != 'CANCEL') {
          paymentAction("payumoney", BOLT.response)
        }
      },catchException: function(BOLT){
        console.log( BOLT.message );
        addToast(BOLT.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });

  }

  return (
    <div className="col-12">
    {
      data && data.generatePayumoneyMethod && scriptLoaded && (
        <form action="#" onSubmit={launchBOLT} >
          <input type="hidden" name="key" defaultValue={data.generatePayumoneyMethod.key}/>
          <input type="hidden" name="hash" defaultValue={data.generatePayumoneyMethod.hash}/>
          <input type="hidden" name="txnid" defaultValue={data.generatePayumoneyMethod.txnid}/>
          <input type="hidden" name="firstname" defaultValue={data.generatePayumoneyMethod.firstname}/>
          <input type="hidden" name="amount" defaultValue={data.generatePayumoneyMethod.amount}/>
          <input type="hidden" name="email" defaultValue={data.generatePayumoneyMethod.email} />
          <input type="hidden" name="phone" defaultValue={data.generatePayumoneyMethod.phone}/>
          <input type="hidden" name="productinfo" defaultValue={data.generatePayumoneyMethod.productinfo}/>
          <button type="submit" ref={formEl} style={{display: 'none'}}>submit form</button>
        </form>
      )
    }

    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, null)(Payumoney);
