import { LayoutFive } from "../components/Layout";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";

const NotFound = () => {
    return (
        <LayoutFive>
            <div className="element-wrapper space-mt--r100 space-mb--r130">
                <Container>
                    <Row className="space-mb--20">
                        <Col>
                            <h2 className="space-mb--50 text-danger"><strong>Whoops, our bad...</strong></h2>
                            <h5 className="space-mb--10"><strong>The page you requested was not found, and we have a fine guess why.</strong></h5>
                            <p>
                                If you typed the URL directly, please make sure the spelling is correct.
                            </p>
                            <p>
                                If you clicked on a link to get here, the link is outdated.
                            </p>
                            <h5 className="space-mb--10"><strong>What can you do?</strong></h5>
                            <p>
                                Have no fear, help is near! There are many ways you can get back on track with Store.
                            </p>
                            <p>
                                Go back to the previous page.
                            </p>
                            <p>
                                Use the search bar at the top of the page to search for your products.
                            </p>
                            <p>
                                Follow these links to get you back on track!
                            </p>
                            <p className="direction-page">
                                <Link href="/" as={process.env.PUBLIC_URL + "/"}>
                                    <a>Store Home</a>
                                </Link>
                                {" | "}
                                <Link href="/customer/account/profile" as={process.env.PUBLIC_URL + "/customer/account/profile"}>
                                    <a>My Account</a>
                                </Link>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </LayoutFive>
    );
};

export default NotFound;
