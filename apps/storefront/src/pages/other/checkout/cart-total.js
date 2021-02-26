import React, { useMemo, useEffect } from "react";
import { formatterConvertCurrency } from "../../../lib/product";
import { connect } from "react-redux";
import { Row, Container, Col } from "react-bootstrap";
import LayoutFive from "../../../components/Layout/LayoutFive";
import BreadcrumbOne from "../../../components/Breadcrumb/BreadcrumbOne";
import Link from "next/link";
import ShippingAddress from "../../../components/OrderWorkFlow/ShippingAddress";
import ProductReview from "../../../components/OrderWorkFlow/ProductReview";
import StepProgressBar from "../../../components/common/StepProgressBar/StepProgressBar";
import { stepCheckout } from "../../../lib/checkout";
import { IoMdCart } from "react-icons/io";
import { useRouter } from "next/router";
const CartTotal = ({
   cartItems
}) => {

    let formatter = { format: () => null };
    const router = useRouter();
    if (cartItems && cartItems.orders && cartItems.orders.length > 0) {
        formatter = formatterConvertCurrency(cartItems.orders[0].currencyCode);
    }
    useEffect(() => {
        if (cartItems && cartItems?.orders?.length > 0 ) {
            if (cartItems.orders[0].state === 'ArrangingPayment') {
                router.push('/other/checkout/payment')
            }
        }
    }, [cartItems]);
    // const shippingAddress = useMemo(() => <ShippingAddress cartItems={cartItems}/>, [cartItems])
    // const productReview = useMemo(() => <ProductReview cartItems={cartItems}/>, [cartItems])
    return (
        <LayoutFive>
            {/* breadcrumb */}
            <BreadcrumbOne
                pageTitle="Checkout"
                backgroundImage="/assets/images/example/about-us/breadcrumb-example.png"
            >
                <ul className="breadcrumb__list">
                    <li>
                        <Link href="/" as={process.env.PUBLIC_URL + "/"}>
                            <a>Home</a>
                        </Link>
                    </li>
                    <li>Checkout</li>
                </ul>
            </BreadcrumbOne>
            {cartItems && cartItems.orders && cartItems.orders.length > 0 ? (
                <React.Fragment>
                    <div style={{ position: "relative", top: "35px"}}>
                        <StepProgressBar
                        steps={stepCheckout()}
                        activeStep={2}
                        />
                    </div>
                    <div className="wishlist-content space-mt--r130 space-mb--r130">
                        <Container>
                            <ShippingAddress/>
                            <ProductReview/>
                        </Container>
                    </div>
                </React.Fragment>
            ): (
                <Container>
                    <Row>
                        <Col>
                            <div className="item-empty-area text-center">
                            <div className="item-empty-area__icon space-mb--30">
                                <IoMdCart />
                            </div>
                            <div className="item-empty-area__text">
                                <p className="space-mb--30">No items found in cart</p>
                                <Link href="/" as={process.env.PUBLIC_URL + "/"}>
                                <a className="lezada-button lezada-button--medium">
                                    Shop Now
                                </a>
                                </Link>
                            </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            )}
        </LayoutFive>
    )
};
const mapStateToProps = (state) => {
    return {
        cartItems: state.cartData,
    };
};

export default connect(mapStateToProps, null)(React.memo(CartTotal));
