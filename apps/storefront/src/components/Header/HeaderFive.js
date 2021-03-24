import { useState, useEffect, Fragment, useMemo } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Container } from "react-bootstrap";
import Link from "next/link";
import { connect } from "react-redux";
import {
  IoIosSearch,
  IoMdPerson,
  IoIosHeartEmpty,
  IoIosCart,
  IoIosMenu,
  IoIosArrowDown,
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoYoutube,
} from "react-icons/io";
import {
  TextBlock,
  MediaBlock,
  TextRow,
  RectShape,
  RoundShape,
} from "react-placeholder/lib/placeholders";
import Navigation from "./elements/Navigation";
import AboutOverlay from "./elements/AboutOverlay";
import CartOverlay from "./elements/CartOverlay";
import WishlistOverlay from "./elements/WishlistOverlay";
import MobileMenu from "./elements/MobileMenu";
import { arrayToTree } from "../../lib/array-to-tree";
import { convertCollections } from "../../lib/collection";
import { GET_COLLECTIONS } from "@bavaan/graphql/documents.graphql";
import InputSearchHeader from "./Input/InputSearchHeader";

const HeaderFive = ({
  currentCustomer,
  aboutOverlay,
  cartItems,
  wishlistItems,
  totalAddedToCart,
}) => {
  /* const count = useSelector(state => state.cartData.count) */
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
    setScroll(window.scrollY > headerTop);
  };
  const queryCollections = useQuery(GET_COLLECTIONS, {});

  const stickyMemo = useMemo(() => {
    return scroll ? "is-sticky" : "";
  }, [scroll]);

  const renderCustomerLink = () => {
    if (currentCustomer) {
      return (
        <Link
          href="/customer/account/profile"
          as={process.env.PUBLIC_URL + "/customer/account/profile"}
        >
          <a>{`Welcome, ${currentCustomer.firstName} ${currentCustomer.lastName}!`}</a>
        </Link>
      );
    } else {
      return (
        <Fragment>
          <Link
            href="/customer/register"
            as={process.env.PUBLIC_URL + "/customer/register"}
          >
            <a>Signup</a>
          </Link>
          {" / "}
          <Link
            href="/customer/login"
            as={process.env.PUBLIC_URL + "/customer/login"}
          >
            <a>Login</a>
          </Link>
        </Fragment>
      );
    }
  };

  return (
    <Fragment>
      <header className={`topbar-shadow ${stickyMemo}`} style={{zIndex: 99999}}>
        <div className="header-top-area border-bottom--grey space-pt--10 space-pb--10 d-none d-lg-block backgroundSpecial colorReverse">
          <Container className="wide">
            <div className="header-top">
              <div className="header-top__left">
                {/** 
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
                */}
                <div className="order-online-text">
                  Order Online Call
                  <span className="number colorReverse">+84 0356535598</span>
                </div>
              </div>
              <div className="header-top__right">
                <div className="signup-link">{renderCustomerLink()}</div>
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
                        src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
                        className="img-fluid"
                        alt=""
                        style={{ width: "140px" }}
                      />
                    </a>
                  </Link>
                </div>

                <InputSearchHeader />

                <div className="header-content__icons">
                  <ul className="d-none d-lg-flex">
                    <li>
                      <Link
                        href={
                          currentCustomer
                            ? "/customer/account/profile"
                            : "/customer/login"
                        }
                      >
                        <a>
                          <IoMdPerson />
                        </a>
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setOffCanvasWishlistActive(true);
                          document
                            .querySelector("body")
                            .classList.add("overflow-hidden");
                        }}
                      >
                        <IoIosHeartEmpty />
                        {wishlistItems.length >= 1 ? (
                          <span className="count">
                            {wishlistItems.length ? wishlistItems.length : ""}
                          </span>
                        ) : (
                          ""
                        )}
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setOffCanvasCartActive(true);
                          document
                            .querySelector("body")
                            .classList.add("overflow-hidden");
                        }}
                      >
                        <IoIosCart />
                        <span className="count">
                            {totalAddedToCart}
                          </span>
                        
                        {/* {cartItems &&
                        cartItems.orders &&
                        cartItems.orders.length > 0 ? (
                          <span className="count">
                            {totalAddedToCart}
                          </span>
                        ) : (
                          ""
                        )} */}
                        {/* {cartItems.lines && cartItems.lines.length >= 1 ? (
                          <span className="count">
                            {cartItems.lines.length
                              ? cartItems.lines.length
                              : ""}
                          </span>
                        ) : (
                          ""
                        )} */}
                      </button>
                    </li>
                  </ul>

                  <ul className="d-flex d-lg-none">
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
                      <Link
                        href="/other/wishlist"
                        as={process.env.PUBLIC_URL + "/other/wishlist"}
                      >
                        <a>
                          <IoIosHeartEmpty />
                          {wishlistItems.length >= 1 ? (
                            <span className="count">
                              {wishlistItems.length ? wishlistItems.length : ""}
                            </span>
                          ) : (
                            ""
                          )}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/other/cart"
                        as={process.env.PUBLIC_URL + "/other/cart"}
                      >
                        <a>
                          <IoIosCart />
                          {cartItems &&
                          cartItems.orders &&
                          cartItems.orders.length > 0 ? (
                            <span className="count">
                              {/* {cartItems.orders.length} */}
                              {totalAddedToCart}
                            </span>
                          ) : (
                            ""
                          )}
                          {/* {cartItems.lines.length >= 1 ? (
                            <span className="count">
                              {cartItems.lines.length
                                ? cartItems.lines.length
                                : ""}
                            </span>
                          ) : (
                            ""
                          )} */}
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
              <div className="col-12 header-content d-flex align-items-center justify-content-center position-relative">
                {/* navigation */}
                {queryCollections.loading ||  !queryCollections.data?.collections ? (
                  <TextBlock rows={3} color="#e2e2e2" />
                ) : (
                  <Navigation
                    menu={arrayToTree(
                      convertCollections(
                        queryCollections.data.collections.items,
                        { w: 180, h: 413 }
                      )
                    )}
                  />
                )}
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
      {/* search overlay */}

      {/* cart overlay */}
      <CartOverlay
        activeStatus={offCanvasCartActive}
        getActiveStatus={setOffCanvasCartActive}
      />

      {/* wishlist overlay */}
      <WishlistOverlay
        activeStatus={offCanvasWishlistActive}
        getActiveStatus={setOffCanvasWishlistActive}
        wishlistItems = {wishlistItems}
      />
      {/* Mobile Menu */}
      {queryCollections.loading ||  !queryCollections.data?.collections ? null : (
        <MobileMenu
          menu={arrayToTree(
            convertCollections(queryCollections.data.collections.items, {
              w: 180,
              h: 413,
            })
          )}
          activeStatus={offCanvasMobileMenuActive}
          getActiveStatus={setOffCanvasMobileMenuActive}
        />
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    currentCustomer: state.customerData.customer,
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    totalAddedToCart: state.cartData.count,
  };
};

export default connect(mapStateToProps)(React.memo(HeaderFive));
