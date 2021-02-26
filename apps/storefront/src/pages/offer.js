import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { LayoutFive } from "../components/Layout";
import { BreadcrumbOne } from "@bavaan/storefront-base/src/components/Breadcrumb";



const Discount = () => {
    return (
        <LayoutFive>
            {/* breadcrumb */}
            <BreadcrumbOne
                pageTitle="Discount"
                backgroundImage="/assets/images/example/about-us/breadcrumb-example.png"
            >
                <ul className="breadcrumb__list">
                    <li>
                        <Link href="/" as={process.env.PUBLIC_URL + "/"}>
                            <a>Home</a>
                        </Link>
                    </li>

                    <li>Discount</li>
                </ul>
            </BreadcrumbOne>
            {/* about content */}
            <div className="element-wrapper space-mt--r100 space-mb--r130">
                <Container className="wide ">
                    <Row>
                        <Col lg={6}>
                            <div className="single-category single-category--three space-mb--30">
                                <div className="single-category__image single-category__image--three single-category__image--three--creativehome">
                                    <img
                                        src="/assets/images/banners/discount-banner-1.jpg"
                                        className="img-fluid"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="single-category single-category--three space-mb--30">
                                <div className="single-category__image single-category__image--three single-category__image--three--creativehome">
                                    <img
                                        src="/assets/images/banners/discount-banner-2.jpg"
                                        className="img-fluid"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </LayoutFive>
    );
};

export default Discount;
