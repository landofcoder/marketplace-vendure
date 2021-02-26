import { useEffect, useState } from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { IoMdCash } from "react-icons/io";
//import { VscError} from "react-icons/all";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { LayoutFive } from "../../../components/Layout";
import { BreadcrumbOne } from "@bavaan/storefront-base/src/components/Breadcrumb";
import CartTotal from "../../../components/checkout/CartTotal";

const FailureStepCheckout = () => {
  const router = useRouter();

  useEffect(() => {
    document.querySelector("body").classList.remove("overflow-hidden");
  });

  return (
    <LayoutFive>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle="Order Failure"
        backgroundImage="/assets/images/example/about-us/breadcrumb-example.png"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>

          <li>Order Failure</li>
        </ul>
      </BreadcrumbOne>
      <div className="checkout-area space-mt--r130 space-mb--r130">
        <Container>
            <Row>
              <Col>
                <div className="item-empty-area text-center">
                  <div className="item-empty-area__icon space-mb--30">
                    <IoMdCash />
                  </div>
                  <div className="item-empty-area__text">
                    <p className="space-mb--30">
                      Payment Failure!!! Please payment again!!!
                    </p>
                    <Link href="/" as={process.env.PUBLIC_URL + "/other/checkout/payment"}>
                      <a className="lezada-button lezada-button--medium">
                        Payment Now
                      </a>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
        </Container>
      </div>
    </LayoutFive>
  );
};

export default FailureStepCheckout;
