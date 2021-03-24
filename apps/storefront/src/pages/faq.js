import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import { LayoutFive } from "../components/Layout";
import { BreadcrumbOne } from "@bavaan/storefront-base/src/components/Breadcrumb";

const Faqs = () => {
    return (
        <LayoutFive>
            {/* breadcrumb */}
            <BreadcrumbOne
                pageTitle="F.A.Qs"
                backgroundImage="/assets/images/backgrounds/breadcrumb-bg-1.png"
            >
                <ul className="breadcrumb__list">
                    <li>
                        <Link href="/" as={process.env.PUBLIC_URL + "/"}>
                            <a>Home</a>
                        </Link>
                    </li>

                    <li>F.A.Qs</li>
                </ul>
            </BreadcrumbOne>
            <div className="element-wrapper space-mt--r100 space-mb--r130">
                <Container>
                    <Row className="space-mb--20" style={{ paddingRight: "25px", paddingLeft: "25px"}}>
                        <Col>
                            <h3 className="space-mb--20 text-danger"><strong>FAQ</strong></h3>
                            <p>These terms are required to protect the
                            interest of buyers and sellers. To make these terms easy to understand,
                            we have put in some of the repeatedly asked questions by customers and the
                            answers which are interpreted as per our terms and conditions.</p>
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
                                                    1. Is cash on delivery available?
                                                </h5>
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                <p>
                                                    Cash on delivery facility is available and
                                                    Swarajshop accepts orders only against confirmed
                                                    online payment orders.
                                                </p>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>

                                    <Card className="single-my-account space-mb--20">
                                        <Card.Header className="panel-heading">
                                            <Accordion.Toggle variant="link" eventKey="1">
                                                <h5 className="panel-title">
                                                    2. You say cash on delivery is not available
                                                    and how to we believe that the goods will be delivered to us?
                                                </h5>
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="1">
                                            <Card.Body>
                                                <p className="space-mb--20">
                                                    Yes. Customers need to be alert while making an online
                                                    transaction. Its always safe to be alert since we are using
                                                    our hard earned money to buy online. We accept that there are
                                                    many websites and as seen on TV products which deal with
                                                    fake products and take money from customers and either
                                                    deliver them with fake products or empty packages. But even
                                                    these websites send products by cash on delivery. Its
                                                    understood that you are going to pay cash only after
                                                    receiving the product in case of cash on delivery. But it
                                                    doesn’t mean that COD or cash on delivery is always trusted
                                                    method. As the box is not allowed to be opened before paying
                                                    cash, you don't even know if the product is inside or they
                                                    keep any stone inside and collect money from you.. Above all,
                                                    COD services are not common and not available for every location
                                                    and it becomes difficult to keep track of service availability in
                                                    addition to very high cost of COD facility. The very purpose of
                                                    online shopping is to make products available at reasonable cost
                                                    and secure.
                                                </p>
                                                <p>
                                                    But in a case of online payment, you always have a bank acknowledgement
                                                    and proof of payment. Also, for Cash on delivery transactions, no one is
                                                    going to verify us whether we have a premises or we are doing a business in place.
                                                    Whereas to integrate an online payment gateway, bank officers will personally inspect
                                                    the premises and only after inspection, they allow the payment gateway to be integrated.
                                                    So comparatively online payment is safer and cheaper than COD transaction. As regards our
                                                    website, all orders placed before 4 PM on any working day will be shipped on the same day of
                                                    order and order status will be updated with shipping details on the next working day at 11 AM.
                                                    In a case of queries, customers are free to mail us or call us with order numbers at the numbers
                                                    provided.
                                                </p>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>

                                    <Card className="single-my-account space-mb--20">
                                        <Card.Header className="panel-heading">
                                            <Accordion.Toggle variant="link" eventKey="2">
                                                <h5 className="panel-title">
                                                    3. I have bought a product from your website and I don’t like it. I want the refund. Is it possible?
                                                </h5>
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="2">
                                            <Card.Body>
                                                <p>
                                                    IF the product sent is different from what is explained and
                                                    shown in a picture then it’s possible. In other cases, We don’t
                                                    take returns or exchange like that. All the products are
                                                    described well with dimensions and clear unedited pictures.
                                                    Photographs are not scaled to size and for this reason,
                                                    the products are explained clearly with dimensions.
                                                    Customers are requested to go through the product description
                                                    and pictures carefully before placing the order. Swarajshop
                                                    can give assurance that the products will be exactly as shown
                                                    in picture and description. But the colour accuracy may
                                                    slightly vary from the picture because of quality settings
                                                    of different monitors and displays. Customers are advised to
                                                    check the product description and pictures and if they are not
                                                    sure how these products will suit their requirements, they can
                                                    send us a mail before placing the order. Customers are also
                                                    welcome to visit our product store in Mumbai to check the
                                                    product in person.
                                                </p>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>

                                    <Card className="single-my-account space-mb--20">
                                        <Card.Header className="panel-heading">
                                            <Accordion.Toggle variant="link" eventKey="3">
                                                <h5 className="panel-title">
                                                    4. Other online websites take No Questions Asked returns till
                                                    30 days? Why you are not taking?
                                                </h5>
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="3">
                                            <Card.Body>
                                                <p>
                                                    Yes. Even we have come across such popular websites
                                                    who take returns till 30 days. We would like to ask a
                                                    simple question to you. Suppose if they take a return till
                                                    30 days, then what will they do with the product returned to
                                                    them? Will they throw it? The answer is not. The same product
                                                    will be sent to another customer. The logic is, its not feasible
                                                    for any seller to throw away returned product. They will send the
                                                    same to other customers and the chain goes on. But Swarajshop does
                                                    not take returns like that and we can always assure that brand new
                                                    products are always shipped to the customer. Incase if customers
                                                    still insist that they need such 30 days no questions asked return
                                                    facility, then they are always free to buy from the website which
                                                    gives them such facility. Each and every website has their own terms
                                                    and conditions and its better for the customers to check the terms
                                                    and conditions of the website before placing the order.
                                                </p>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </div>
                            <div className="single-faq">
                                <Accordion defaultActiveKey="0">
                                    <Card className="single-my-account space-mb--20">
                                        <Card.Header className="panel-heading">
                                            <Accordion.Toggle variant="link" eventKey="0">
                                                <h5 className="panel-title">
                                                    5. I have bought a pair of bangles. The size is not suitable for me?
                                                </h5>
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                <p>
                                                    Normally, we maintain 3 sizes of bangles. They are 2.4, 2.6
                                                    and 2.8. But this is just size number and it has no relation
                                                    with size. Many customers think that 2.6 means 2.6 Inches.
                                                    This is not true. The customer can Google Indian Bangle Size
                                                    Chart and they will be getting help about determining their size.
                                                    they can measure the bangles which they already use. 2.4 are 57 MM
                                                    inner diameter, 2.6 is 60 MM inner diameter and 2.8 is 63 MM inner
                                                    diameter. Still if customers have doubt, they can mail us for help
                                                    before placing the order.
                                                </p>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>

                                    <Card className="single-my-account space-mb--20">
                                        <Card.Header className="panel-heading">
                                            <Accordion.Toggle variant="link" eventKey="1">
                                                <h5 className="panel-title">
                                                    6. I tried to place an order. My amount is debited and I have not received any confirmation mail?
                                                </h5>
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="1">
                                            <Card.Body>
                                                <p>
                                                    This may happen in two circumstances. One is wrong email id and
                                                    other is network issues. Wrong email id issue can be fixed by
                                                    sending us a mail from correct email id about order confirmation.
                                                    In a case of amount debited without order confirmation due to network
                                                    issues or because of card issuing bank taking too much time to respond
                                                    etc, the amount will be automatically refunded. Incase if the amount
                                                    is not refunded, then customers can contact us so that we can get it
                                                    done by coordinating with our payment gateway bank. In those cases,
                                                    if the shopping cart of the customers has to be restored, they can
                                                    contact us so that we can help you in restoring the cart and customers
                                                    need not spend time in adding the products again to cart. The payments
                                                    which are debited without order confirmation will be automatically
                                                    refunded and the time taken to reflect in the account of the customer
                                                    may take 7 to 10 working days. But customers are requested to send
                                                    a mail to swarajshop@gmail.com if they have received no confirmation
                                                    mail after the payment.
                                                </p>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>

                                    <Card className="single-my-account space-mb--20">
                                        <Card.Header className="panel-heading">
                                            <Accordion.Toggle variant="link" eventKey="2">
                                                <h5 className="panel-title">
                                                    7. I am not sure about the security of your website.
                                                    How secure is your website for using my card?
                                                </h5>
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="2">
                                            <Card.Body>
                                                <p>
                                                    We can very well assure you that our site is more secure
                                                    than any other website as regards payment. This is because
                                                    Swarajshop never accepts any card details and never stores any
                                                    card information. After reviewing order, while customers click the
                                                    payment button, they are automatically taken to a secure https website.
                                                    It’s a direct bank payment page. Only after confirming the payment,
                                                    customers will be redirected again to Swarajshop.com website.
                                                    In a way, we do not know which card you are using at all.
                                                </p>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>

                                    <Card className="single-my-account space-mb--20">
                                        <Card.Header className="panel-heading">
                                            <Accordion.Toggle variant="link" eventKey="3">
                                                <h5 className="panel-title">
                                                    8. I have chosen a necklace. I don’t
                                                    want the earrings or I want to choose an earring
                                                    which are shown in some other necklace set?
                                                </h5>
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="3">
                                            <Card.Body>
                                                <p>
                                                    The products are combined with matching earrings only.
                                                    It’s not possible to mix and match between earrings shown
                                                    in one necklace set with earrings shown in another necklace set.
                                                </p>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card className="single-my-account space-mb--20">
                                        <Card.Header className="panel-heading">
                                            <Accordion.Toggle variant="link" eventKey="4">
                                                <h5 className="panel-title">
                                                    9. I don’t have a credit card, debit card or any kind
                                                    of online payment method. How do I buy?
                                                </h5>
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="4">
                                            <Card.Body>
                                                <p>
                                                    The products are combined with matching earrings only.
                                                    It’s not possible to mix and match between earrings shown
                                                    in one necklace set with earrings shown in another necklace set.
                                                </p>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card className="single-my-account space-mb--20">
                                        <Card.Header className="panel-heading">
                                            <Accordion.Toggle variant="link" eventKey="5">
                                                <h5 className="panel-title">
                                                    10. I have a picture of a jewellery design.
                                                    Can you make it for me?
                                                </h5>
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="5">
                                            <Card.Body>
                                                <p>
                                                    Customers, please note that we do make custom designs.
                                                    Minimum 12 pic. Give to the wholesale rate. Cont. On Whatsapp
                                                    no. 9867777893
                                                </p>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card className="single-my-account space-mb--20">
                                        <Card.Header className="panel-heading">
                                            <Accordion.Toggle variant="link" eventKey="6">
                                                <h5 className="panel-title">
                                                    11. I am also doing online business.
                                                    I want your pictures without watermark.
                                                    Will I let you know once I have sold the item?
                                                </h5>
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="6">
                                            <Card.Body>
                                                <p>
                                                    We sell only products and not pictures.
                                                    Pictures which are uploaded on our website are meant
                                                    for viewing the designs only.
                                                </p>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card className="single-my-account space-mb--20">
                                        <Card.Header className="panel-heading">
                                            <Accordion.Toggle variant="link" eventKey="6">
                                                <h5 className="panel-title">
                                                    12. I am checking tracking information in the courier
                                                    company website and tracking says consignee not available
                                                    or door locked. Was I inside waiting for the package?
                                                </h5>
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="6">
                                            <Card.Body>
                                                <p>
                                                    In some cases there may be genuine reasons that the
                                                    door might have been locked or security guard might
                                                    not have allowed etc... But in most cases,
                                                    we find that the courier people are loaded with a
                                                    lot of packages are not able to complete the delivery
                                                    and update wrong tracking information.
                                                    We have already raised this issue with them not
                                                    to update wrong tracking information.
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

export default Faqs;
