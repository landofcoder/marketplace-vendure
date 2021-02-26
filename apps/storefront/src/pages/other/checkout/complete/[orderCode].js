import { useEffect, useState } from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { IoMdCash } from "react-icons/io";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { LayoutFive } from "../../../../components/Layout";
import { BreadcrumbOne } from "@bavaan/storefront-base/src/components/Breadcrumb";
import StepProgressBar from "../../../../components/common/StepProgressBar/StepProgressBar";
import { stepCheckout } from "../../../../lib/checkout";
import CartTotal from "../../../../components/checkout/CartTotal";
import { GET_ORDER } from "@bavaan/graphql/customer/account-order-detail.graphql";
import { clearCartReducer } from "../../../../redux/actions/cartActions";

const CompleteStepCheckout = ({ clearCartReducer }) => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState({ lines: [] });
  if (!router.query.orderCode) router.push("/");
  const orderByCode = useQuery(GET_ORDER, {
    variables: { code: router.query.orderCode },
  });

  useEffect(() => {
    if (orderByCode.data) {
      setCartItems(orderByCode.data.orderByCode);
    }
  }, [orderByCode]);
  useEffect(() => {
    clearCartReducer();
  }, []);
  useEffect(() => {
    document.querySelector("body").classList.remove("overflow-hidden");
  });

  return (
    <LayoutFive>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle="Order Complete"
        backgroundImage="/assets/images/example/about-us/breadcrumb-example.png"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>

          <li>Order Complete</li>
        </ul>
      </BreadcrumbOne>
      <div className="checkout-area space-mt--r130 space-mb--r130">
        <Container>
          {cartItems.lines && cartItems.lines.length >= 1 ? (
            <Row>
              <Col>
                <div className="lezada-form">
                  <form className="checkout-form">
                    <div className="row row-40">
                      {/*<div className="col-lg-12 space-mb--20">*/}
                      {/*  <Row style={{ position: "relative", top: "-35px" }}>*/}
                      {/*    <Col>*/}
                      {/*      <StepProgressBar*/}
                      {/*        steps={stepCheckout()}*/}
                      {/*        activeStep={4}*/}
                      {/*      />*/}
                      {/*    </Col>*/}
                      {/*  </Row>*/}

                      {/*  /!* test *!/*/}
                      {/*</div>*/}

                      <div className="col-lg-12">
                        <div className="row">
                          {/* Cart Total */}
                          <CartTotal isComplete={true} cartItems={cartItems} />
                          {/* Payment Method */}
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
                      Thank you for just order
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
    clearCartReducer: () => {
      dispatch(clearCartReducer());
    },
  };
};
const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompleteStepCheckout);
