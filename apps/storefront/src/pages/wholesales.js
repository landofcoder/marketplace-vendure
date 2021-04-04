import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import { LayoutFive } from "../components/Layout";
import { BreadcrumbOne } from "@bavaan/storefront-base/src/components/Breadcrumb";

const Wholesales = () => {
    return (
        <LayoutFive>
            {/* breadcrumb */}
            <BreadcrumbOne
                pageTitle="Wholesales"
                backgroundImage="/assets/images/backgrounds/breadcrumb-bg-1.png"
            >
                <ul className="breadcrumb__list">
                    <li>
                        <Link href="/" as={process.env.PUBLIC_URL + "/"}>
                            <a>Home</a>
                        </Link>
                    </li>

                    <li>Wholesales</li>
                </ul>
            </BreadcrumbOne>
            <div className="element-wrapper space-mt--r100 space-mb--r130">
                <Container>
                    <Row className="space-mb--20">
                        <Col>
                            <h3 className="space-mb--20 text-danger"><strong>Wholesales</strong></h3>
                            <p className="space-mb--20 ">
                                Buy Wholesale on Vendure-marketplace.com |
                                Indian Jewelry, Sarees, Home Decor, Handicrafts
                            </p>
                            <h5 className="space-mb--20 text-danger">Vendure-marketplace.com Wholesale</h5>
                            <p className="space-mb--20 ">
                                Thank you for your interest in our products.
                                We are India's largest marketplace for Indian
                                Lifestyle products across categories which include Jewelry,
                                Home Decor, Home Furninshing, Apparel including Sarees
                                and Bath & Beauty products. We give you access to 50,000+ products
                                instantly most of which are suitable for wholesale.
                            </p>
                            <p className="space-mb--20 ">
                                The following outlines our wholesale policy and terms.
                                Please read this carefully and if there is any question or concern,
                                feel free to call and discuss it with us. We are in business because of
                                happy customers and look forward to having you as one of them.
                            </p>
                            <p className="space-mb--20 ">
                                <strong>IMPORTANT NOTE:</strong> Wholesale pricing is confidential in nature.
                                By requesting access to our wholesale pricing, you understand and agree
                                to keep this information confidential. Sharing this information with anyone
                                not directly responsible for purchasing or decisions on purchasing for your
                                company is grounds for withdrawing your access to our site.
                            </p>
                            <h5 className="space-mb--20 text-danger">Minimums</h5>
                            <p className="space-mb--20 ">
                                The minimum opening order for wholesale pricing is $200.00
                                (Indian Rs. 10,000). Re-order minimums are $100.00 (Indian Rs. 5,000).
                                Prices and products are based on availability. You will always be notified of
                                any price increase prior to any order being processed.
                            </p>
                            <h5 className="space-mb--20 text-danger">Selections and Availability</h5>
                            <p className="space-mb--20 ">
                                We constantly add new products in our wholesale
                                selection which has more than 50,000+products.
                                Most of them are available for wholesale globally.
                                We will soon be putting a dedicated section for wholesale
                                products on Vendure-marketplace.com
                            </p>
                            <h5 className="space-mb--20 text-danger">Shipping</h5>
                            <p className="space-mb--20 ">
                                Most orders ship within 30 business days. You will be notified
                                of a planned ship date within 5 business days of placing your
                                order. Shipping charges are estimated and unless otherwise requested
                                will be based on best method/best price. Actual shipping charges will
                                be applied to the invoice accordingly and will be informed to you prior
                                to shipping. Requests for pickup or special delivery are at the our discretion.
                            </p>
                            <h5 className="space-mb--20 text-danger">Payment</h5>
                            <p className="space-mb--20 ">
                                Payment is required at the time of shipment. For your convenience,
                                we can accept checks, MasterCard and Visa. Payment by check must be
                                received and processed prior orders being shipped. No COD orders are
                                accepted.
                            </p>
                            <h5 className="space-mb--20 text-danger">Discounts</h5>
                            <p className="space-mb--20 ">
                                We give discounts on retail price to our wholesale
                                buyers in form of one time coupon which can be requested
                                from us anytime. This ranges from 5-50% depending on the
                                order size and category of product.
                            </p>
                            <h5 className="space-mb--20 text-danger">Returns & Refused Shipments</h5>
                            <p className="space-mb--20 ">
                                Products can not be returned until you receive a confirmation
                                on whether products can be returned or not from us. Please send
                                email to storeofappindia@gmail.com immediately within 24 hours
                                of receiving the shipment if you wish to return them. A 20% restocking
                                fee and shipping charges will apply if the return is accepted by us.
                            </p>
                            <p className="space-mb--20 ">
                                All of our products are carefully inspected, securely packed
                                and sealed before leaving the shop. Damage in transit can happen
                                and must be reported to the carrier immediately. All packages are
                                automatically insured.
                            </p>
                            <p className="space-mb--20 ">
                                Opened products, Bath, Beauty, Food Products or Fragrance
                                Oils are NON returnable because of the volatility of the product.
                            </p>
                            <p className="space-mb--20 ">
                                We also provide samplers (at no cost) in some cases and
                                is purely discretionary at our end. Please send us an email
                                at Mangesh@Vendure-marketplace.com if you need samples of products.
                            </p>
                            <h5 className="space-mb--20 text-danger">Placing an Order</h5>
                            <p className="space-mb--20 ">
                                Phone or email may be used to place wholesale orders.
                                You can also order online from www.Vendure-marketplace.com by
                                selecting the products which are available for wholesale
                                and then clicking the checkout button. The wholesale coupon
                                can be applied to give you the desired discounts on wholesale purchase.
                            </p>
                            <h5 className="space-mb--20 text-danger">Contact us</h5>
                            <p>
                                Name : Mangesh Shinde
                            </p>
                            <p>
                                Mobile : Whatssapp no. +91-8655076261
                            </p>
                            <p>
                                Email : Vendure-marketplace.comindia@gmail.com
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </LayoutFive>
    );
};

export default Wholesales;
