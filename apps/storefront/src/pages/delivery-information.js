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
const DeliveryInformation = () => {
    return (
        <LayoutFive>
            {/* breadcrumb */}
            <BreadcrumbOne
                pageTitle="Delivery Information"
                backgroundImage="/assets/images/backgrounds/breadcrumb-bg-1.png"
            >
                <ul className="breadcrumb__list">
                    <li>
                        <Link href="/" as={process.env.PUBLIC_URL + "/"}>
                            <a>Home</a>
                        </Link>
                    </li>
                    <li>Delivery Information</li>
                </ul>
            </BreadcrumbOne>
            <div className="space-mt--r130 space-mb--r130">
                <Container>
                    <Row className="justify-content-center">
                        <Col xl={5} lg={6}>
                            <div className="bg-color--grey my-account-area__content">
                                <div className="about-page-text space-mb--30 mt-0">
                                    <h3>Delivery options</h3>
                                    <p>
                                        storeofapp offers a variety of delivery options.
                                        Optimise your costs by choosing the right one for
                                        your order size and location. Available options include:
                                    </p>
                                </div>
                                <div className="icon-box icon-box--feature-icon space-mb--35">
                                    <div className="icon-box--feature-icon__icon">
                                        <FaHome />
                                    </div>
                                    <div className="icon-box--feature-icon__content">
                                        <p><strong>India Delivery:</strong></p>
                                        <p>
                                            We take 3 to 5 days for product delivery  all over India,
                                            once the order is received.
                                        </p>
                                    </div>
                                </div>
                                <div className="icon-box icon-box--feature-icon space-mb--35">
                                    <div className="icon-box--feature-icon__icon">
                                        <FaMap />
                                    </div>
                                    <div className="icon-box--feature-icon__content">
                                        <p><strong>International Delivery:</strong></p>
                                        <p>
                                            We take 3 to 5 days for order processing, once the order
                                            is received and after the order is processed, Requested
                                            product will be delivered within 15 - 21 days.
                                        </p>
                                    </div>
                                </div>
                                <div className="icon-box icon-box--feature-icon space-mb--35">
                                    <div className="icon-box--feature-icon__icon">
                                        <FaShip />
                                    </div>
                                    <div className="icon-box--feature-icon__content">
                                        <p><strong>Internationally Order Pcoccess:</strong></p>
                                        <p>
                                            <strong>Please Note:</strong> Vendure-marketplace.com delivers product internationally on purchase of
                                        minimum 3 orders for the customer to be eligible
                                        for international order processing.
                                    </p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xl={5} lg={6} className="offset-lg-1 bg-color--grey my-account-area__content">
                            <div className="about-page-text space-mb--30 mt-0">
                                <h3>Payment options</h3>
                                <p>
                                    Vendure-marketplace.com offers various payment
                                    options. Here's a look at what's available:
                                    </p>
                            </div>
                            <div className="space-mb--35">
                                <div className="icon-box icon-box--feature-icon">
                                    <div className="icon-box--feature-icon__icon">
                                        <FaMoneyBillAlt />
                                    </div>
                                    <div className="icon-box--feature-icon__content">
                                        <p><strong>India</strong></p>
                                        <p>
                                            COD (Cash On Delivery)
                                        </p>
                                        <p>
                                            Internet Banking
                                        </p>
                                        <p>
                                            Debit Card Payment
                                        </p>
                                        <p>
                                            Credit Card Payment
                                        </p>
                                        <p>
                                            Paypal
                                        </p>
                                        <p>
                                            Payumoney
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="icon-box icon-box--feature-icon space-mb--35">
                                <div className="icon-box--feature-icon__icon">
                                    <FaRegCreditCard />
                                </div>
                                <div className="icon-box--feature-icon__content">
                                    <p><strong>Debit Card & Credit Card</strong></p>
                                    <p>
                                        Payment will be made using credit card registered on
                                        storeofapp Online. Manage your defined credit cards in
                                        "My credit cards" section.
                                    </p>
                                </div>
                            </div>
                            <div className="icon-box icon-box--feature-icon space-mb--35">
                                <div className="icon-box--feature-icon__icon">
                                    <FaPaypal />
                                </div>
                                <div className="icon-box--feature-icon__content">
                                    <p><strong>PayPal International Payment</strong></p>
                                    <p>
                                        PayPal is an online payment system that acts as
                                        an intermediary between an individual and online stores.
                                        If you already have a PayPal account, from mid-April you
                                        can use this account immediately when purchasing your storeofapp
                                        products. If you do not have a PayPal account and you wish to use
                                        this payment option, please go to www.paypal.com and create your
                                        own personal PayPal account.
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

export default DeliveryInformation;
