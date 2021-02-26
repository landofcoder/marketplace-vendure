import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { LayoutFive } from "../../../components/Layout";
import { BreadcrumbOne } from "@bavaan/storefront-base/src/components/Breadcrumb";
import { GET_ORDER_DETAIL } from "@bavaan/graphql/order/order-detail.graphql";
import ReactPlaceholder from "react-placeholder";
import { formatterConvertCurrency } from "../../../lib/product";
import {
    TextBlock,
    MediaBlock,
    TextRow,
    RectShape,
    RoundShape,
} from "react-placeholder/lib/placeholders";

const OrderDetailPlaceHolder = (
    <div>
        <TextBlock rows={10} color="#e2e2e2" />
        <div className="product-details">
            <Container>
                <Row>
                    <Col lg={6} className="space-mb-mobile-only--50">
                        {/* image gallery bottom thumb */}
                        <MediaBlock rows={40} color="#e2e2e2" />
                    </Col>

                    <Col lg={6}>
                        {/* product description */}
                        <TextBlock rows={30} color="#e2e2e2" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {/* product description tab */}
                        <TextBlock rows={15} color="#e2e2e2" />
                    </Col>
                </Row>
            </Container>
        </div>
    </div>
);

const OrderDetail = () => {
    const router = useRouter();
    const queryOrderDetail = useQuery(GET_ORDER_DETAIL, {
        variables: { id: router.query.id },
    });
    if (queryOrderDetail.loading || !queryOrderDetail.data) {
        return OrderDetailPlaceHolder;
    }
    const resOrderDetail = queryOrderDetail.data.order;
    
    const formatter = formatterConvertCurrency(
        resOrderDetail.currencyCode
    );
    return (
        <LayoutFive>
            <ReactPlaceholder
                customPlaceholder={OrderDetailPlaceHolder}
                ready={!(queryOrderDetail.loading || !queryOrderDetail.data)}
            >
                <div className="space-mt--50 space-mb--r130">
                    <Container>
                        <Row className="space-mb--20">
                            <Col className="d-flex align-items-center justify-content-between">
                                <Link
                                    href="/customer/account/orders"
                                    as="/customer/account/orders"
                                >
                                    <button className="lezada-button lezada-button--medium" type="submit">
                                        Back To Order
                                    </button>
                                </Link>
                                {/*<button className="lezada-button lezada-button--medium" type="submit">*/}
                                {/*    Print*/}
                                {/*</button>*/}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="my-account-area__content text-dark space-mb--r100 bg-color--grey-two">
                                    <h3>Order Detail</h3>
                                    <Row className="space-mb--r50">
                                        <Col lg={6}>
                                            <p>
                                                <strong>Customer:</strong> {resOrderDetail.customer.firstName} {resOrderDetail.customer.lastName}
                                            </p>
                                            <p>
                                                <strong>Email:</strong> {resOrderDetail.customer.emailAddress}
                                            </p>
                                            <p>
                                                <strong>Phone number:</strong> {resOrderDetail.customer.phoneNumber}
                                            </p>
                                            {resOrderDetail.state === "PartiallyShipped" || resOrderDetail.state === "Shipped" || resOrderDetail.state === "PartiallyDelivered" ? <p><strong>Delivery: </strong>In Transit</p> : resOrderDetail.state === "Delivered" ? <p><strong>Delivery: </strong>Delivered</p> : resOrderDetail.state === "Cancelled" ? <p><strong>Delivery: </strong>Cancelled</p> : <p><strong>Delivery: </strong>Pending</p>}
                                            <p>
                                                <strong>Invoice #:</strong> {resOrderDetail.code}
                                            </p>
                                            {/*<p>*/}
                                            {/*    <strong>Order total: </strong>{formatter.format(resOrderDetail.total)}*/}
                                            {/*</p>*/}
                                        </Col>
                                        {resOrderDetail.payments && resOrderDetail.payments.map((item, index) => {
                                            const date = new Date(item.createdAt);
                                            console.log("date", date);
                                            return (
                                                <Col lg={6} key={index}>
                                                    <p>
                                                        <strong>Payment Method:</strong> {item.method}
                                                    </p>
                                                    <p>
                                                        <strong>Status:</strong> {item.state}
                                                    </p>
                                                    <p>
                                                        <strong>Transaction ID:</strong> {item.transactionId}
                                                    </p>
                                                    <p>
                                                        <strong>Date:</strong> {item.createdAt ? date.toDateString() : null}
                                                    </p>
                                                </Col>
                                            );
                                        })}
                                    </Row>
                                    <Row className="bg-color--white space-mb--r50">
                                        <table className="cart-table">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Product Name</th>
                                                    <th>SKU</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                </tr>
                                            </thead>
                                            {resOrderDetail.lines && resOrderDetail.lines.map((item, index) => {
                                                return (
                                                    <tbody key={index}>
                                                        <tr>
                                                            <td className='product-thumbnail'>
                                                                <a>
                                                                    <img
                                                                        src={item.featuredAsset?.preview}
                                                                        className="img-fluid"
                                                                        alt={item.productVariant.name}
                                                                    />
                                                                </a>
                                                            </td>
                                                            <td>
                                                                <div className="product-variation text-dark">
                                                                    <p>{item.productVariant.name}</p>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <p>{item.productVariant.sku}</p>
                                                            </td>
                                                            <td>
                                                                <p>{item.quantity}</p>
                                                            </td>
                                                            <td>
                                                                {formatter.format(item.unitPriceWithTax)}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                );
                                            })}
                                            <tbody>
                                                <tr>
                                                    <td className='product-thumbnail'>
                                                        <p>
                                                            <strong>Sub total: </strong>
                                                        </p>
                                                        <p>
                                                            <strong>Shipping: </strong>
                                                        </p>
                                                        <p>
                                                            <strong>Total: </strong>
                                                        </p>
                                                    </td>
                                                    <td>
                                                    </td>

                                                    <td>
                                                        {resOrderDetail.shippingMethod.description}
                                                    </td>

                                                    <td>
                                                    </td>

                                                    <td>
                                                        <p>{formatter.format(resOrderDetail.subTotal)}</p>
                                                        <p>{formatter.format(resOrderDetail.shipping)}</p>
                                                        <p>{formatter.format(resOrderDetail.total)}</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Row>
                                    <Row className="space-mb--r50">
                                        <Col lg={6}>
                                            <h3>Billing Details</h3>
                                            <p>
                                                Full Name: {resOrderDetail.billingAddress.fullName}
                                            </p>
                                            <p>
                                                Company: {resOrderDetail.billingAddress.company}
                                            </p>
                                            <p>
                                                StreetLine1: {resOrderDetail.billingAddress.streetLine1}
                                            </p>
                                            <p>
                                                StreetLine2: {resOrderDetail.billingAddress.streetLine2}
                                            </p>
                                            <p>
                                                City: {resOrderDetail.billingAddress.city}
                                            </p>
                                            <p>
                                                Province {resOrderDetail.billingAddress.province}
                                            </p>
                                            <p>
                                                Postal Code: {resOrderDetail.billingAddress.postalCode}
                                            </p>
                                            <p>
                                                Country:  {resOrderDetail.billingAddress.country}
                                            </p>
                                            <p>
                                                Country Code:  {resOrderDetail.billingAddress.countryCode}
                                            </p>
                                            <p>
                                                Phone Number:  {resOrderDetail.billingAddress.phoneNumber}
                                            </p>
                                        </Col>
                                        <Col lg={6}>
                                            <h3>Shipping Details</h3>
                                            <p>
                                                Full Name: {resOrderDetail.shippingAddress.fullName}
                                            </p>
                                            <p>
                                                Company: {resOrderDetail.shippingAddress.company}
                                            </p>
                                            <p>
                                                StreetLine1: {resOrderDetail.shippingAddress.streetLine1}
                                            </p>
                                            <p>
                                                StreetLine2: {resOrderDetail.shippingAddress.streetLine2}
                                            </p>
                                            <p>
                                                City: {resOrderDetail.shippingAddress.city}
                                            </p>
                                            <p>
                                                Province {resOrderDetail.shippingAddress.province}
                                            </p>
                                            <p>
                                                Postal Code: {resOrderDetail.shippingAddress.postalCode}
                                            </p>
                                            <p>
                                                Country:  {resOrderDetail.shippingAddress.country}
                                            </p>
                                            <p>
                                                Country Code:  {resOrderDetail.shippingAddress.countryCode}
                                            </p>
                                            <p>
                                                Phone Number:  {resOrderDetail.shippingAddress.phoneNumber}
                                            </p>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </ReactPlaceholder>
        </LayoutFive >
    );
};

export default OrderDetail;
