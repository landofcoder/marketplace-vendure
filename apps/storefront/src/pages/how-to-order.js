import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import { LayoutFive } from "../components/Layout";
import { BreadcrumbOne } from "@bavaan/storefront-base/src/components/Breadcrumb";

const HowToOrder = () => {
    return (
        <LayoutFive>
            {/* breadcrumb */}
            <BreadcrumbOne
                pageTitle="How to Order"
                backgroundImage="/assets/images/backgrounds/breadcrumb-bg-1.png"
            >
                <ul className="breadcrumb__list">
                    <li>
                        <Link href="/" as={process.env.PUBLIC_URL + "/"}>
                            <a>Home</a>
                        </Link>
                    </li>

                    <li>How to Order</li>
                </ul>
            </BreadcrumbOne>
            <div className="element-wrapper space-mt--r100 space-mb--r130">
                <Container>
                    <Row className="space-mb--20">
                        <Col>
                            <h3 className="space-mb--20 text-danger"><strong>How to Order</strong></h3>
                            <p className="space-mb--20 ">
                                How to Order on vendure-marketplace.com
                            </p>
                            <h5 className="space-mb--20 text-danger">Storeofapp Wholesale</h5>
                            <p className="space-mb--20 ">
                                vendure-marketplace.com is an online marketplace for Indian products which
                                means you can only buy Storeofapp products on vendure-marketplace.com.
                                We have limited Cash on Delivery which means the payment method is
                                mostly via Credit/Debit card or Net-banking via Indian banks. We also
                                accept Credit/Debit Cards from other countries and other currencies
                                including USD/Canadian $/Australian $/Euro/British Pound etc
                            </p>
                            <h5 className="space-mb--20 text-danger">Step 1</h5>
                            <p className="space-mb--20 ">
                                The first step is to browse products and then Add items
                                to your shopping cart where your products will be saved as you continue
                                shopping
                            </p>
                            <p>Select the item</p>
                            <p className="space-mb--20 ">Click on "Add to Cart" button</p>
                            <h5 className="space-mb--20 text-danger">Step 2</h5>
                            <p className="space-mb--20 ">Proceed to Payment</p>
                            <p>Click on Checkout button after adding ALL items that you want to buy.</p>
                            <p>You can also apply any coupon if you have at this step by clicking "Apply Discount Code"</p>
                            <p>You can also continue shopping by Clicking "Continue Shopping" button if you still wish to add more products</p>

                            <h5 className="space-mb--20 text-danger">Step 3</h5>
                            <p className="space-mb--20 ">Email & Shipping Details</p>
                            <p>
                                You will be asked to login with your email-id if you
                                already have registered with vendure-marketplace.com before.
                            </p>
                            <p>
                                If you are buying for the first time, you can continue as
                                guest and you will be automatically registered and password will be
                                emailed to you.
                            </p>
                            <p>
                                Enter your billing address which is the address of the customer who is paying
                            </p>
                            <p>
                                Usually the billing and shipping address are same. If you want to have a
                                different shipping address, click "Ship to Different Address" and enter
                                shipping address there
                            </p>
                            <p>
                                Click the Continue button to proceed to Payment
                            </p>

                            <h5 className="space-mb--20 text-danger">Step 4</h5>
                            <p className="space-mb--20 ">Make Payment</p>
                            <p>
                                Please select either CCavenue or EBS payment gateway to pay via Credit/Debit
                                Cards or Net banking via Indian Banks. Both these payment gateways also supprt
                                international currencies.
                            </p>
                            <p>
                                If Cash on Delivery or Paypal is available, those will also be given as an option to pay.
                           </p>
                            <p>
                                Click "Place Order" and you will be directed to one of the payment gateways. If
                                the payment is COD, your order willbe complete after you click "Place Order"
                           </p>
                            <p>
                                Once you have paid via Credit/Debit Card or Net Banking, you will be redirected
                                to vendure-marketplace.com and a Transaction number will be given to you
                           </p>
                            <p>
                                You will also receive an order confirmation email from vendure-marketplace.com
                           </p>
                            <p>
                                In India, the delivery takes max 10 days and outside of India the delivery happens in 21 days
                           </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </LayoutFive>
    );
};

export default HowToOrder;
