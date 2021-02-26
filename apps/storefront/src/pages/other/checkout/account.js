import { useEffect, useState } from "react";
import Link from "next/link";
import ReactPlaceholder from "react-placeholder";
import { useRouter } from "next/router";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { IoMdCash } from "react-icons/io";
import { LayoutFive } from "../../../components/Layout";
import { BreadcrumbOne } from "@bavaan/storefront-base/src/components/Breadcrumb";
import { Collapse, Button, CardBody, Card, CardHeader } from "reactstrap";
import StepProgressBar from "../../../components/common/StepProgressBar/StepProgressBar";
import { stepCheckout } from "../../../lib/checkout";
import { GET_ACTIVE_CUSTOMER } from "@bavaan/graphql/documents.graphql";
import { useQuery } from "@apollo/react-hooks";
import CartTotal from "../../../components/checkout/CartTotal";
import { assignPrevStep } from '../../../redux/actions/cartActions'

const AccountStepCheckout = ({ cartItems, assignPrevStep, prevStep }) => {
  let cartTotalPrice = 0;
  const activeCustomerRes = useQuery(GET_ACTIVE_CUSTOMER);
  const [stepOpen, setStepOpen] = useState(1);
  const router = useRouter();
  if (activeCustomerRes.data && activeCustomerRes.data.activeCustomer) {
    router.push("/other/checkout/shipping");
  }
  useEffect(() => {
    
    if (activeCustomerRes.data && activeCustomerRes.data.activeCustomer) {
      router.push("/other/checkout/shipping");
    }
  }, [activeCustomerRes]);
  const toggle = (step) => {
    if (step <= stepOpen) setStepOpen(step);
  };
  useEffect(() => {
    document.querySelector("body").classList.remove("overflow-hidden");
  });

  useEffect(() => {
   
    assignPrevStep('/other/checkout/shipping')
  }, []);
 
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
      <ReactPlaceholder ready={!activeCustomerRes.loading}>
        <div className="checkout-area space-mt--r130 space-mb--r130">
          <Container>
            {cartItems.orders && cartItems.orders.length >= 1 ? (
              <Row>
                <Col>
                  <div className="lezada-form">
                    <form className="checkout-form">
                      <div className="row row-40">
                        <div className="col-lg-7 space-mb--20">
                          <Row style={{ position: "relative", top: "-35px" }}>
                            <StepProgressBar
                              steps={stepCheckout()}
                              activeStep={1}
                            />
                          </Row>
                          {/* account */}
                          <Row>
                            <Col>
                              <div className="cart-calculation-button text-center">
                                <Link
                                  href="/customer/login"
                                  as={
                                    process.env.PUBLIC_URL + "/customer/login"
                                  }
                                >
                                  <a className="lezada-button lezada-button--medium">
                                    Login as customer
                                  </a>
                                </Link>
                              </div>
                            </Col>
                            <Col>
                              <div className="cart-calculation-button text-center">
                                <Link
                                  href="/other/checkout/shipping"
                                  as={
                                    process.env.PUBLIC_URL +
                                    "/other/checkout/shipping"
                                  }
                                >
                                  <a className="lezada-button lezada-button--medium">
                                    Continue as Guest
                                  </a>
                                </Link>
                              </div>
                            </Col>
                          </Row>
                        </div>

                        <div className="col-lg-5">
                          <div className="row">
                            {/* Cart Total */}
                            <CartTotal cartItems={cartItems} />
                          </div>
                        </div>
                      </div>
                    </form>
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
                      <Link
                        href="/shop/left-sidebar"
                        as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
                      >
                        <a className="lezada-button lezada-button--medium">
                          Shop Now
                          {activeCustomerRes.firstName}
                        </a>
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
            )}
          </Container>
        </div>
      </ReactPlaceholder>
    </LayoutFive>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    assignPrevStep: (preStep) => {
      dispatch(assignPrevStep(preStep))
    }
  }
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    prevStep: state.cartData.prevStep,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountStepCheckout);
