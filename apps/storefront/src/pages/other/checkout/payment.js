import { useEffect, useState } from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { IoMdCash } from "react-icons/io";
import { LayoutFive } from "../../../components/Layout";
import { BreadcrumbOne } from "@bavaan/storefront-base/src/components/Breadcrumb";
import StepProgressBar from "../../../components/common/StepProgressBar/StepProgressBar";
import { stepCheckout } from "../../../lib/checkout";
import { useRouter } from "next/router";
import CartTotal from "../../../components/checkout/CartTotal";
import {useMutation, useQuery} from "@apollo/react-hooks";
import { ADD_PAYMENT_TO_ORDER_VENDOR } from "@bavaan/graphql/checkout/checkout-payment.graphql";
import { GET_LIST_PAYMENT_METHOD } from "@bavaan/graphql/checkout/checkout-payment.graphql";
import { updateCartByAPI, addPaymentToOrderVendor, addToCart } from "../../../redux/actions/cartActions";
import { useToasts } from "react-toast-notifications";
import CashOnDelivery from "../../../components/checkout/Payments/CashOnDelivery";
import Payumoney from "../../../components/checkout/Payments/Payumoney";
import BrainTree from "../../../components/checkout/Payments/BrainTree";
import Paypal from "../../../components/checkout/Payments/Paypal";
const PaymentStepCheckout = ({ cartItems, updateCartByAPI }) => {
  const router = useRouter();
  const [listPaymentMethod, setListPaymentMethod] = useState([]);
  const [checkboxValue, setCheckboxValue] = useState(null);
  const [checkboxCode, setCheckboxCode] = useState(null);
  const [addPaymentMethodRes] = useMutation(ADD_PAYMENT_TO_ORDER_VENDOR, {});
  const getPaymentMethod = useQuery(GET_LIST_PAYMENT_METHOD, {});
  useEffect(() => {
    if (getPaymentMethod.data && getPaymentMethod.data.paymentMethods && getPaymentMethod.data.paymentMethods.items) {
      setListPaymentMethod(getPaymentMethod.data.paymentMethods.items);
    }
  }, [getPaymentMethod]);
  const { addToast } = useToasts();

  const paymentAction = async (type, requestResult) => {
    try {
      const paymentRes = await addPaymentMethodRes({
        variables: {
          input: {
            method: type,
            metadata: requestResult,
          },
        },
      });
      if (addToast) {
        addToast("Payment Success, Thank you !", {
          appearance: "success",
          autoDismiss: true,
        });
      }
      router.push(
        "/other/checkout/complete/success"
      );
    } catch (e) {
      if (addToast)
            addToast(e.message || e, {
              appearance: "error",
              autoDismiss: true,
            });
      updateCartByAPI();
    }
  };
  useEffect(() => {
    document.querySelector("body").classList.remove("overflow-hidden");
  });
  // useEffect(() => {
  //   if ( cartItems.orders == null || cartItems.orders.length == 0 ) {
      
  //   }
  // }, [cartItems])

  const checkboxChange = function (value, code) {
    setCheckboxValue(value);
    setCheckboxCode(code);
  };

  return (
    <LayoutFive>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle="Checkout"
        backgroundImage="/assets/images/example/about-us/breadcrumb-example.png"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>

          <li>Checkout</li>
        </ul>
      </BreadcrumbOne>
      <div className="checkout-area space-mt--r130 space-mb--r130">
        <Container>
          {cartItems.orders && cartItems.orders.length >= 1 ? (
            <Row>
              <Col>
                <div className="lezada-form">
                  <div className="container" style={{position: 'relative', top: '-50px'}}>
                    <StepProgressBar
                      steps={stepCheckout()}
                      activeStep={3}
                    />
                  </div>
                  <div className="checkout-form">
                    <Row>
                      <Col lg={6}>
                        <CartTotal cartItems={cartItems} />
                      </Col>
                      <Col lg={6} style={{marginTop: "20px"}}>
                        <div>
                          <p>Choose one Payment method</p>
                          {
                            listPaymentMethod.map((payment, i) => {
                              if (payment && payment.enabled === true){
                                return (<div key={i}>
                                  <label style={{textAlign: 'center'}} key={i}>
                                    <input style={{margin: '10px'}} key={i} onChange={(e) => {checkboxChange(e.target.checked, payment.code)}} id={i} name={payment.code} checked={checkboxCode === payment.code && checkboxValue === true} type="checkbox"/>
                                    {payment.definition.description}
                                  </label>
                                  {checkboxValue === true && checkboxCode === "cod-payment" && checkboxCode === payment.code ? <CashOnDelivery actionSendCard={paymentAction} addToast={addToast}/> : null}
                                  {checkboxValue === true && checkboxCode === "braintree" && checkboxCode === payment.code ? <BrainTree showingPayment actionSendCard={paymentAction} addToast={addToast}/> : null}
                                  {checkboxValue === true && checkboxCode === "payumoney" && checkboxCode === payment.code ? <Payumoney paymentAction={paymentAction} addToast={addToast}/> : null}
                                  {checkboxValue === true && checkboxCode === "paypal" && checkboxCode === payment.code ? <Paypal paymentAction={paymentAction} addToast={addToast}/> : null}
                                </div>)
                              } else {
                                return null
                              }
                            })
                          }
                        </div>
                      </Col>
                    </Row>
                    {/* </div> */}
                  </div>
                </div>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col>
                <div className="item-empty-area text-center">
                  <div className="item-empty-area__icon space-mb--30">
                    <IoMdCash />
                  </div>
                  <div className="item-empty-area__text">
                    <p className="space-mb--30">
                      No items found in cart to checkout
                    </p>
                    <Link href="/" as={process.env.PUBLIC_URL + "/"}>
                      <a className="lezada-button lezada-button--medium">
                        Shop Now
                      </a>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </LayoutFive>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCartByAPI: () => {
      dispatch(updateCartByAPI());
    },
    addPaymentToOrderVendor: (input, addToast) => {
      dispatch(addPaymentToOrderVendor(input, addToast))
    },
  };
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(PaymentStepCheckout));
