import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import { LayoutFive } from "../components/Layout";
import { BreadcrumbOne } from "@bavaan/storefront-base/src/components/Breadcrumb";

const CustomerService = () => {
    return (
        <LayoutFive>
            {/* breadcrumb */}
            <BreadcrumbOne
                pageTitle="Customer Service"
                backgroundImage="/assets/images/backgrounds/breadcrumb-bg-1.png"
            >
                <ul className="breadcrumb__list">
                    <li>
                        <Link href="/" as={process.env.PUBLIC_URL + "/"}>
                            <a>Home</a>
                        </Link>
                    </li>

                    <li>Customer Service</li>
                </ul>
            </BreadcrumbOne>
            <div className="element-wrapper space-mt--r100 space-mb--r130">
                <Container>
                    <Row className="space-mb--20">
                        <Col>
                            <h3 className="space-mb--20 text-danger"><strong>Customer Service</strong></h3>
                            <p>Shipping & Delivery</p>
                            <p>Returns & Replacements</p>
                            <p>Shipping & Delivery</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="single-faq space-mb-mobile-only--50">
                                <Accordion defaultActiveKey="0">
                                    <Card className="single-my-account space-mb--20">
                                        <Card.Header className="panel-heading">
                                            <Accordion.Toggle variant="link" eventKey="0">
                                                <h5 className="panel-title">
                                                    DOES SWARAJSHOP DELIVER INTERNATIONALLY ?
                                                </h5>
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                <p>
                                                    Yes, we deliver worldwide. For all international orders,
                                                    we have a minimum purchase requirement of Rs. 5000. Shipping
                                                    is charged extra and is explained below.You will be able to see
                                                    shipping charges at the final checkout page for the items you
                                                    have selected. International shipping is available only for
                                                    Jewellery & Sarees. You can place the order directly on the
                                                    website.
                                                </p>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>

                                    <Card className="single-my-account space-mb--20">
                                        <Card.Header className="panel-heading">
                                            <Accordion.Toggle variant="link" eventKey="1">
                                                <h5 className="panel-title">
                                                    PAYMENT OPTIONS:
                                                </h5>
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="1">
                                            <Card.Body>
                                                <p>
                                                    Paypal
                                                </p>
                                                <p>
                                                    International Credit CardDebit Card Net Banking
                                                </p>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>

                                    <Card className="single-my-account space-mb--20">
                                        <Card.Header className="panel-heading">
                                            <Accordion.Toggle variant="link" eventKey="2">
                                                <h5 className="panel-title">
                                                    SHIPPING CHARGES:
                                                </h5>
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="2">
                                            <Card.Body>
                                                <p>
                                                    You can find the shipping charges by selecting your country
                                                    on the order page. Shipping cost = Rs. 900 for the first 500 gms
                                                    and Rs. 300 for every added 500 gms
                                                </p>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>

                                    <Card className="single-my-account space-mb--20">
                                        <Card.Header className="panel-heading">
                                            <Accordion.Toggle variant="link" eventKey="3">
                                                <h5 className="panel-title">
                                                    DELIVERY TIME: 10-12 DAYS
                                                </h5>
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="3">
                                            <Card.Body>
                                                <p>
                                                    The order will come to Mumbai for the Quality Verification
                                                    first and then we’ll Ship the order to your Address. The
                                                    whole process will take 10-12 business days. Will send you
                                                    the tracking details as soon as your order get shipped from
                                                    here.
                                                </p>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card className="single-my-account space-mb--20">
                                        <Card.Header className="panel-heading">
                                            <Accordion.Toggle variant="link" eventKey="4">
                                                <h5 className="panel-title">
                                                    WHAT ARE THE SHIPPING CHARGES ?
                                                </h5>
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="4">
                                            <Card.Body>
                                                <p>
                                                    There are NO shipping charges For India. Shipping is absolutely FREE.
                                                </p>
                                                <p>Note: This is not applicable for international orders – orders outside india. For international orders</p>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>

                                    <Card className="single-my-account space-mb--20">
                                        <Card.Header className="panel-heading">
                                            <Accordion.Toggle variant="link" eventKey="5">
                                                <h5 className="panel-title">
                                                    WHAT IS THE ESTIMATED DELIVERY TIME ?
                                                </h5>
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="5">
                                            <Card.Body>
                                                <p>
                                                    The estimated time of delivery is mentioned for every product.
                                                    Usually, it takes somewhere between 5-8 business days. However,
                                                    in exceptional cases it can take up to 10 business days.
                                                </p>
                                                <p>Returns & Replacements</p>
                                                <p>
                                                    We have a customer friendly return policy – we will refund you the full amount. However,
                                                    return shipping cost is incurred by the buyer. We accept returns within
                                                    7 days from the date of delivery.
                                                </p>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>

                                    <Card className="single-my-account space-mb--20">
                                        <Card.Header className="panel-heading">
                                            <Accordion.Toggle variant="link" eventKey="6">
                                                <h5 className="panel-title">
                                                    TO RETURN A PRODUCT YOU NEED TO FOLLOW THESE STEPS:
                                                </h5>
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="6">
                                            <Card.Body>
                                                <p className="space-mb--20">
                                                    Send an email to Vendure-marketplace.comindia@gmail.com with your order number
                                                    mentioning the product you want to return and your bank details where
                                                    you want us to refund the amount. Please ensure that bank details submitted
                                                    to us are free of any errors.
                                                </p>
                                                <p>
                                                    Once an email is sent, you will receive a mailing address to which you
                                                    can ship the product back and the date before which product needs to be dispatched.
                                                </p>
                                                <p>
                                                    Please put the product in its original packaging and seal it well.
                                                    Make sure you bubble wrap it so that product doesn’t get damaged.
                                                </p>
                                                <p>
                                                    Ship the product to the mailing address mentioned and send an email to
                                                    Vendure-marketplace.comindia@gmail.com with the tracking number. Without tracking number,
                                                    product can’t be tracked and can be lost in transit.
                                                </p>
                                                <p>
                                                    Once the product has reached and it is inspected to be free from any defect,
                                                    your money will be credited to your bank account mentioned in step a).
                                                </p>
                                                <p className="space-mb--20">
                                                    If you have made an online payment, refunds will take following number of days:
                                                </p>
                                                <p>
                                                    Netbanking: 3 working days
                                                </p>
                                                <p>
                                                    Debit Card: 7 working days
                                                </p>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </LayoutFive>
    );
};

export default CustomerService;
