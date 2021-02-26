import { useState } from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { LayoutFive } from "../components/Layout";
import { BreadcrumbOne } from "@bavaan/storefront-base/src/components/Breadcrumb";
import {
    FaRegCreditCard,
    FaPaypal,
    FaMap,
    FaShip,
    FaHome,
    FaMoneyBillAlt
} from "react-icons/fa";
const RefundAndShipping = () => {
    return (
        <LayoutFive>
            {/* breadcrumb */}
            <BreadcrumbOne
                pageTitle="Swarajshop Refund and Shipping"
                backgroundImage="/assets/images/backgrounds/breadcrumb-bg-1.png"
            >
                <ul className="breadcrumb__list">
                    <li>
                        <Link href="/" as={process.env.PUBLIC_URL + "/"}>
                            <a>Home</a>
                        </Link>
                    </li>
                    <li>Swarajshop Refund and Shipping</li>
                </ul>
            </BreadcrumbOne>
            <div className="space-mt--r130 space-mb--r130">
                <Container>
                    <Row className="justify-content-center">
                        <Col xl={5} lg={6}>
                            <div className="bg-color--grey my-account-area__content">
                                <div className="about-page-text space-mb--30 mt-0">
                                    <h3>Refund Options</h3>
                                    <p>
                                        If you are in India and wish to refund for any item purchased
                                        from Swarajshop.com, Please go through the below refund policy
                                        on Swarajshop website order purchased:
                                    </p>
                                </div>
                                <div className="icon-box icon-box--feature-icon space-mb--35">
                                    <div className="icon-box--feature-icon__icon">
                                        <FaHome />
                                    </div>
                                    <div className="icon-box--feature-icon__content">
                                        <p><strong>India Refund Policy</strong></p>
                                        <p>
                                            If the item was purchased with the
                                            payment option COD, then we take up
                                            to 15 days for make the refund payments.
                                        </p>
                                    </div>
                                </div>
                                <div className="icon-box icon-box--feature-icon space-mb--35">
                                    <div className="icon-box--feature-icon__icon">
                                        <FaMap />
                                    </div>
                                    <div className="icon-box--feature-icon__content">
                                        <p><strong>Internet Banking</strong></p>
                                        <p>
                                            If the item was purchased with the payment
                                            option internet banking, then we take up to 8 days
                                            for make the refund payments
                                        </p>
                                    </div>
                                </div>
                                <div className="icon-box icon-box--feature-icon space-mb--35">
                                    <div className="icon-box--feature-icon__icon">
                                        <FaShip />
                                    </div>
                                    <div className="icon-box--feature-icon__content">
                                        <p><strong>International Refund Policy</strong></p>
                                        <p>
                                            If you are outside India and wish to get a refund for any items purchased from Swarajshop.com,
                                            Please go through the below International customers refund policy on Swarajshop website order purchased.
                                        </p>
                                        <p>We take up to 15 days to refund our international customers with any mode of payment.</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xl={5} lg={6} className="offset-lg-1 bg-color--grey my-account-area__content">
                            <div className="about-page-text space-mb--30 mt-0">
                                <h3>Shipping Options</h3>
                                <p>
                                    Swarajshop offers various Shipping options. Here's a look at what's available:
                                </p>
                            </div>
                            <div className="space-mb--35">
                                <div className="icon-box icon-box--feature-icon">
                                    <div className="icon-box--feature-icon__icon">
                                        <FaMoneyBillAlt />
                                    </div>
                                    <div className="icon-box--feature-icon__content">
                                        <p><strong>India Shipping Details</strong></p>
                                        <p>
                                            We provide the shipping of our products all over
                                            India within time! Listed are the indian logistics partners:
                                        </p>
                                        <p>
                                            Ecom Express
                                        </p>
                                        <p>
                                            Dotzot
                                        </p>
                                        <p>
                                            Bluedart
                                        </p>
                                        <p>
                                            Fedex
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="icon-box icon-box--feature-icon space-mb--35">
                                <div className="icon-box--feature-icon__icon">
                                    <FaRegCreditCard />
                                </div>
                                <div className="icon-box--feature-icon__content">
                                    <p><strong>Credit Card</strong></p>
                                    <p>
                                        Payment will be made using credit card registered on
                                        M2themes Online. Manage your defined credit cards in "My credit cards" section.
                                    </p>
                                </div>
                            </div>
                            <div className="icon-box icon-box--feature-icon space-mb--35">
                                <div className="icon-box--feature-icon__icon">
                                    <FaPaypal />
                                </div>
                                <div className="icon-box--feature-icon__content">
                                    <p><strong>International Shipping Details</strong></p>
                                    <p>
                                        We always help our international customers to deliver our product
                                        on time! Thanks to our international logistics partners listed below
                                    </p>
                                    <p>
                                        UPS
                                    </p>
                                    <p>
                                        Fedex
                                    </p>
                                    <p>
                                        DHL
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </LayoutFive>
    );
};

export default RefundAndShipping;
