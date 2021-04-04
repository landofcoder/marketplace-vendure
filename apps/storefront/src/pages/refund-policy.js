import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import { LayoutFive } from "../components/Layout";
import { BreadcrumbOne } from "@bavaan/storefront-base/src/components/Breadcrumb";

const RefundPolicy = () => {
    return (
        <LayoutFive>
            {/* breadcrumb */}
            <BreadcrumbOne
                pageTitle="Refund Policy"
                backgroundImage="/assets/images/backgrounds/breadcrumb-bg-1.png"
            >
                <ul className="breadcrumb__list">
                    <li>
                        <Link href="/" as={process.env.PUBLIC_URL + "/"}>
                            <a>Home</a>
                        </Link>
                    </li>

                    <li>Refund Policy</li>
                </ul>
            </BreadcrumbOne>
            <div className="element-wrapper space-mt--r100 space-mb--r130">
                <Container>
                    <Row className="space-mb--20">
                        <Col>
                            <h3 className="space-mb--20 text-danger"><strong>Refund Policy</strong></h3>
                            <p className="space-mb--50 ">
                                SHIPPING & REFUND POLICIES
                            </p>
                            <h5 className="space-mb--20 text-danger">Vendure-marketplace.com 100% Buyer Protection Program Details:</h5>
                            <p className="space-mb--20">
                                Vendure-marketplace.com has a friendly return and refund policy to
                                ensure your online purchase is free of stress. We offer "100%
                                Buyer Protection Program" for our valued customers. We do not
                                release your payment to the seller till the products are received
                                by you and you are happy with it. We are always with you, before your
                                purchase and after your purchase. We are not perfect but we have ensured
                                hard that our refund/return policies do not bring any ugly surprises to you
                                post your purchase.
                            </p>
                            <h5 className="space-mb--20 text-danger">What is Vendure-marketplace.com’s Return Policy?</h5>
                            <p className="space-mb--20">
                                Our "100% Buyer Protection Program" allows for easy returns and refunds for:
                            </p>
                            <p>
                                1. Products which you received in "Damaged/Defective/Broken" condition.
                            </p>
                            <p>
                                2. Products not as per description/photo on the website.
                            </p>
                            <p className="space-mb--20">
                                3. Products which you may not like for quality, color and design related issues.
                            </p>
                            <p className="space-mb--20">
                                All the products must be returned in the original condition
                                they were received in along with any bills and labels. Please
                                follow the below given steps to register your dispute within 3 days
                                of receipt of the product. Disputes registered after 3 days of delivery
                                may not be entertained by sellers. Consumable products like food and beverages,
                                bath and beauty products and bulky items like furniture/statues/paintings/temples
                                (mandir) cannot be returned. Custom stitched products cannot be returned.
                            </p>
                            <h5 className="space-mb--20 text-danger">How to raise dispute for an order?</h5>
                            <p className="space-mb--20">
                                You need to register your dispute in either of the two ways:
                            </p>
                            <p>
                                1. By sending email to storeofappindia@gmail.com with images
                                of broken/defective/damaged products within 3 days of delivery.
                                We need photos of the damaged/defective/different products received
                                so that we can defend your dispute with relevant seller. Please mention
                                your order number in the email.
                            </p>
                            <p className="space-mb--20">
                                2. Register dispute directly with seller by following
                                below procedure for direct resolution which usually is faster.
                            </p>
                            <p>
                                <strong>To register dispute directly with seller, please follow below mentioned easy process:</strong>
                            </p>
                            <p>
                                1. Go to your customer account here at http://storeofapp.com/customer/account/login/ and sign in when prompted.
                            </p>
                            <p>
                                2. Or Click the "My Account link" at the top of the site and sign in when prompted.
                            </p>
                            <p>
                                3. Click on the "Confirmed Orders" Tab on the left side and Select the Order you wish to return.
                            </p>
                            <p>
                                4. On the order detail page you will see "Raise Dispute with Seller" section.
                            </p>
                            <p>
                                5. Enter the details of your dispute and attach relevant images there.
                            </p>
                            <p>
                                6. Click "Raise Dispute to Seller" button once ready.
                            </p>
                            <p className="space-mb--20">
                                7. If you are not registered on Vendure-marketplace.com, you can register by clicking the "Register" link
                                on the top of website and then file the dispute or you can send email to storeofappindia@gmail.com
                            </p>
                            <p className="space-mb--20">
                                After the seller reviews your return request, you will receive an e-mail with instructions
                                on resolution or return of your item. Please allow the seller three days to respond to your
                                return request and provide instructions on returning your item. We recommend using an online
                                traceable courier service for returning your items.
                            </p>
                            <h5 className="space-mb--20 text-danger">What to do if Seller is not responding to the dispute?</h5>
                            <p className="space-mb--20 ">
                                Please allow 3 business days for your seller to address the
                                issue and provide instructions for your return/ resolution.
                                If the seller does not respond even after 3 business days,
                                or if your issue is not addressed to your satisfaction, you
                                can submit the dispute by sending email to storeofappindia@gmail.com
                                and we will ensure you get timely resolution to your dispute.
                            </p>
                            <h5 className="space-mb--20 text-danger">Who pays for the delivery charges for returning of products?</h5>
                            <p className="space-mb--20 ">
                                When you're returning an item that was damaged/ defective or due
                                to an error on the seller's part, you will be compensated for return courier
                                charges. You will be paid flat Rs. 100 voucher which can be used to buy any of
                                the Vendure-marketplace.com products for next 3 months. If the product has been picked from you
                                by Vendure-marketplace.com arranged courier partner, the return delivery voucher will not be issued
                                since no return cost was incurred by you. Please pack well when you are returning the product.
                            </p>
                            <p className="space-mb--20 ">
                                The amount you paid for the product plus any shipping paid
                                at the time of order will be directly refunded back to your
                                bank account/credit card/debit card within 15 working days of refund.
                            </p>
                            <h5 className="space-mb--20 text-danger">When will I be refunded?</h5>
                            <p className="space-mb--20 ">
                                We can refund you when the seller notifies
                                us of the receipt of the item back from you or the
                                online tracking shows as delivered to the seller address.
                                Remember that items have to be returned to sellers directly
                                by you unless a return pickup has been authorized by Vendure-marketplace.com
                                team. Once the seller notifies us of the receipt of the return item,
                                we will credit the amount back to you within 15 working days
                                (does not include Saturdays, Sundays and Bank Holidays).
                            </p>
                            <h5 className="space-mb--20 text-danger">How are items packaged?</h5>
                            <p className="space-mb--20 ">
                                All items are carefully packaged as to avoid any form of damage.
                                We ensure the package is water proof with plastic wrap.
                            </p>
                            <h5 className="space-mb--20 text-danger">What are the shipping charges?</h5>
                            <p className="space-mb--20 ">
                                Sellers provide FREE delivery on most items in India.
                                Some items may have shipping depending on the nature of
                                the product. For International orders, the shipping charges are
                                different for different items and is mentioned clearly on the product
                                page. Also Prices may be different for different countries to account
                                for shipping costs as sellers are free to set their prices and prices
                                listed in INR are only for India.
                            </p>
                            <h5 className="space-mb--20 text-danger">What is the estimated delivery time?</h5>
                            <p className="space-mb--20">
                                The estimated time of delivery is within 10 working
                                days for domestic orders and 21 working days for international
                                orders. All orders get shipped within 5 days from the Seller’s warehouse.
                            </p>
                            <h5 className="space-mb--20 text-danger">How will the delivery be done?</h5>
                            <p>
                                We try to process all deliveries through reputed courier
                                companies like Bluedart, Aramex, AFL, DTDC, DHL and Fedex.
                                In some cases where the pincode/zipcode is not servicable by
                                these courier companies, we use Indian Speed Post for those
                                deliveries.
                            </p>
                            <p className="space-mb--20">
                                If there is no courier service available in your area,
                                we will get in touch with you and try to work out a convenient
                                alternate delivery location that is serviced by our courier partners.
                            </p>
                            <h5 className="space-mb--20 text-danger">Do you deliver internationally?</h5>
                            <p className="space-mb--20">
                                Vendure-marketplace.com does deliver items internationally. You are more
                                than welcome to make your purchases on our site from anywhere in the world.
                                We use DHL, DTDC, India Post or FEDEX to deliver your shipments safely and timely to you.
                            </p>
                            <h5 className="space-mb--20 text-danger">How can I track the delivery of my order?</h5>
                            <p className="space-mb--20">
                                All Vendure-marketplace.com items are delivered through reputed courier partners
                                who will provide you with a Tracking ID for your order by which you
                                can track your delivery on the respective websites of our courier partners.
                                We email you the tracking number after we dispatch your order. You can also
                                see the tracking number in your order history panel in your account when you login.
                            </p>
                            <h5 className="space-mb--20 text-danger">Who bears the Octroi for certain locations in India?</h5>
                            <p className="space-mb--20">
                                Nagpur , Sangli , Dombivili , Nasik , Mumbai , Pimpri & Chinchwardi , Kothrud (Pune) ,
                                Ahmednagar , Pune , Akola are Octroiable cities. Any applicable octroi will be payable
                                by the customer. Please pay Octroi to the courier company if
                                requested by them in these cities. Vendure-marketplace.com is not responsible for any octroi payments.
                            </p>
                            <p className="space-mb--20">
                                Who would be responsible for paying local taxes in countries outside of India?
                            </p >
                            <p className="space-mb--20">
                                Customs Duty & other international taxes etc. if
                                applicable will have to be borne by the customer according to the laws of the land.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </LayoutFive>
    );
};

export default RefundPolicy;
