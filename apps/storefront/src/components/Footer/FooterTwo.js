import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { connect } from "react-redux";
import { IoIosArrowRoundUp } from "react-icons/io";
import { animateScroll } from "react-scroll";
import { SubscribeEmailTwo } from "@bavaan/storefront-base/src/components/Newsletter";
const FooterTwo = ({ currentCustomer }) => {
  const [scroll, setScroll] = useState(0);
  const [top, setTop] = useState(0);

  useEffect(() => {
    setTop(100);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    animateScroll.scrollToTop();
  };

  const handleScroll = () => {
    setScroll(window.scrollY);
  };
  return (
    <footer className="bg-color--grey space-pt--100 space-pb--50">
      <Container className="wide">
        <Row>
          <Col className="footer-single-widget space-mb--50">
            {/* logo */}
            <div className="logo space-mb--35">
              <img
                src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
                className="img-fluid"
                alt=""
                style={{ width: "140px" }}
              />
            </div>

            {/*=======  copyright text  =======*/}
            <div className="footer-single-widget__copyright">
              &copy; {new Date().getFullYear() + " "}
              <a href="https://www.hasthemes.com" target="_blank">
                Swarajshop
              </a>
              <span> Email us: cs@swarjshop.com </span>
            </div>
            <div className="payment-icon space-mb--30">
              <img
                src={process.env.PUBLIC_URL + "/assets/images/icon/pay.png"}
                className="img-fluid"
                alt=""
              />
            </div>
          </Col>

          <Col className="footer-single-widget space-mb--50">
            <h5 className="footer-single-widget__title">INFORMATION</h5>
            <nav className="footer-single-widget__nav">
              <ul>
                <li>
                  <a href="/about-us">About us</a>
                </li>
                <li>
                  <a href="/faq">FAQ</a>
                </li>
                <li>
                  <a href="/delivery-information">Delivery Information</a>
                </li>
                <li>
                  <a href="/contact-us">Contact us</a>
                </li>
                <li>
                  <a href={
                      currentCustomer
                        ? "/customer/account/orders"
                        : "/customer/login"
                    }>Refund Request</a>
                </li>
              </ul>
            </nav>
          </Col>

          <Col className="footer-single-widget space-mb--50">
            <h5 className="footer-single-widget__title">ACCOUNT</h5>
            <nav className="footer-single-widget__nav">
              <ul>
                <li>
                  <a href="/customer/account/profile">My Account</a>
                </li>
                <li>
                  <a href="/customer/account/orders">Order History</a>
                </li>
                <li>
                  <a href="/refund-policy">Refund Policy</a>
                </li>
                <li>
                  <a href="/wholesales">Wholesales</a>
                </li>
                <li>
                  <a
                    href={
                      currentCustomer
                        ? "/seller/create-seller"
                        : "/seller/create-seller"
                    }
                  >
                    Become a Seller
                  </a>
                </li>
              </ul>
            </nav>
          </Col>

          <Col className="footer-single-widget space-mb--50">
            <h5 className="footer-single-widget__title">SERVICES</h5>
            <nav className="footer-single-widget__nav">
              <ul>
                <li>
                  <a href="/offer">Discount</a>
                </li>
                <li>
                  <a href="/policy-for-buyers">Policy For Buyers</a>
                </li>
                <li>
                  <a href="/customer-service">Customer Service</a>
                </li>
                <li>
                  <a href="/terms-and-conditions">Term & condition</a>
                </li>
                <li>
                  <a href="/blog">Blog</a>
                </li>
              </ul>
            </nav>
          </Col>

          <Col className="footer-single-widget space-mb--50">
            <h5 className="footer-single-widget__title">HOW TO BUY</h5>
            <nav className="footer-single-widget__nav">
              <ul>
                <li>
                  <a href="/customer/register">Create an Account</a>
                </li>
                <li>
                  <a href="/refund-and-shipping">Shipping & Refund</a>
                </li>
                <li>
                  <a href="/how-to-order">How To Order</a>
                </li>
                <li>
                  <a href={process.env.ADMIN_URL + "/admin"}>Seller Account</a>
                </li>
                <li>
                  <a href={process.env.ADMIN_URL + "/admin/login"}>Seller Signup</a>
                </li>
              </ul>
            </nav>
          </Col>
        </Row>
      </Container>
      <button
        className={`scroll-top ${scroll > top ? "show" : ""}`}
        onClick={() => scrollToTop()}
      >
        <IoIosArrowRoundUp />
      </button>
    </footer>
  );
};

const mapStateToProps = (state) => {
  return {
    currentCustomer: state.customerData.customer,
  };
};
export default connect(mapStateToProps, null)(FooterTwo);
