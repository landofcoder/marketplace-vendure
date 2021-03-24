import { useState, useEffect, Fragment } from "react";
import { useQuery } from '@apollo/react-hooks';
import { Container } from "react-bootstrap";
import Link from "next/link";
import { connect } from "react-redux";
import {
  IoIosSearch,
  IoMdPerson,
  IoIosMenu,
  IoIosArrowDown,
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoYoutube
} from "react-icons/io";
import AboutOverlay from "./elements/AboutOverlay";
import InputSearchBlog from "./Input/InputSearchBlog";

const HeaderOne = ({ aboutOverlay, cartItems, wishlistItems }) => {
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [offCanvasAboutActive, setOffCanvasAboutActive] = useState(false);
  const [offCanvasCartActive, setOffCanvasCartActive] = useState(false);
  const [offCanvasWishlistActive, setOffCanvasWishlistActive] = useState(false);
  const [offCanvasMobileMenuActive, setOffCanvasMobileMenuActive] = useState(
    false
  );


  useEffect(() => {
    const header = document.querySelector("header");
    setHeaderTop(header.offsetTop);
    setHeaderHeight(header.offsetHeight);
    window.addEventListener("scroll", handleScroll);
    scroll > headerTop
      ? (document.body.style.paddingTop = `${headerHeight}px`)
      : (document.body.style.paddingTop = 0);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <Fragment>
      <header
        className={`topbar-shadow ${scroll > headerTop ? " is-sticky" : ""}`}
      >
        <div className="header-top-area border-bottom--grey space-pt--10 space-pb--10 d-none d-lg-block backgroundSpecial colorReverse">
          <Container className="wide">
            <div className="header-top">
              <div className="header-top__left">
                <div className="language-change change-dropdown">
                  <span className="colorReverse">English</span>{" "}
                  <IoIosArrowDown />
                  <ul>
                    <li>
                      <button>English</button>
                    </li>
                    <li>
                      <button>Deustch</button>
                    </li>
                  </ul>
                </div>
                <span className="header-separator">|</span>
                <div className="currency-change change-dropdown">
                  <span className="colorReverse">USD</span>
                  <IoIosArrowDown />
                  <ul>
                    <li>
                      <button>USD</button>
                    </li>
                    <li>
                      <button>EUR</button>
                    </li>
                  </ul>
                </div>
                <span className="header-separator">|</span>
                <div className="order-online-text">
                  Order Online Call
                  <span className="number colorReverse">+84 0356535598</span>
                </div>
              </div>
              <div className="header-top__right">
                <div className="signup-link">
                  <Link
                    href="/other/login-register"
                    as={process.env.PUBLIC_URL + "/other/login-register"}
                  >
                    <a>Signup / Login</a>
                  </Link>
                </div>
                <span className="header-separator">|</span>
                <div className="top-social-icons">
                  <ul>
                    <li>
                      <a href="https://www.twitter.com" target="_blank">
                        <IoLogoTwitter />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.facebook.com" target="_blank">
                        <IoLogoFacebook />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com" target="_blank">
                        <IoLogoInstagram />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.youtube.com" target="_blank">
                        <IoLogoYoutube />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div className="header-bottom-area">
          <Container className="wide">
            <div className="flex-column">
              <div className="col-12 header-content d-flex align-items-center justify-content-between pt-3 pb-3 pl-0 pr-0 space-py-mobile-only--15 position-relative">
                {/* logo */}
                <div className="header-content__logo space-pr--15">
                  <Link href="/" as={process.env.PUBLIC_URL + "/"}>
                    <a>
                      <img
                        src={process.env.PUBLIC_URL + "/assets/images/brand1.png"}
                        className="img-fluid"
                        alt=""
                        style={{ width: "140px" }}
                      />
                    </a>
                  </Link>
                </div>

                <InputSearchBlog />

                <div className="header-content__icons">
                  <ul className="d-none d-lg-block">
                    <li>
                      <Link
                        href="/customer/account/profile"
                        as={
                          process.env.PUBLIC_URL + "/customer/account/profile"
                        }
                      >
                        <a>
                          <IoMdPerson />
                        </a>
                      </Link>
                    </li>
                  </ul>

                  <ul className="d-block d-lg-none">
                    <li>
                      <Link
                        href="/customer/account/profile"
                        as={
                          process.env.PUBLIC_URL + "/customer/account/profile"
                        }
                      >
                        <a>
                          <IoMdPerson />
                        </a>
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => setOffCanvasMobileMenuActive(true)}
                      >
                        <IoIosMenu />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>

      {/* about overlay */}
      {aboutOverlay === false ? (
        ""
      ) : (
          <AboutOverlay
            activeStatus={offCanvasAboutActive}
            getActiveStatus={setOffCanvasAboutActive}
          />
        )}
    </Fragment>
  );
};

export default HeaderOne;
