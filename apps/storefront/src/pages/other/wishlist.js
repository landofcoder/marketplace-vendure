import { useEffect } from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import {
  addToWishlist,
  deleteFromWishlist,
  deleteAllFromWishlist
} from "../../redux/actions/wishlistActions";
import { addToVendor } from "../../redux/actions/cartActions";
import { getDiscountPrice, formatterConvertCurrency } from "../../lib/product";
import { LayoutFive } from "../../components/Layout";
import BreadcrumbOne from "../../components/Breadcrumb/BreadcrumbOne";
import { IoIosClose, IoIosHeartEmpty } from "react-icons/io";


const Wishlist = ({
  wishlistItems,
  cartItems,
  addToVendor,
  deleteFromWishlist,
  deleteAllFromWishlist
}) => {
  const { addToast } = useToasts();

  useEffect(() => {
    document.querySelector("body").classList.remove("overflow-hidden");
  });

  return (
    <LayoutFive>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle="Wishlist"
        backgroundImage="/assets/images/backgrounds/breadcrumb-bg-1.png"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>

          <li>Wishlist</li>
        </ul>
      </BreadcrumbOne>

      {/* wishlist content */}
      <div className="wishlist-content space-mt--r130 space-mb--r130">
        <Container>
          {wishlistItems && wishlistItems.length >= 1 ? (
            <Row>
              <Col lg={12}>
                {/* cart table */}
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th className="product-name" colSpan="2">
                        Product
                      </th>
                      <th className="product-price">Price</th>
                      <th className="product-subtotal">&nbsp;</th>
                      <th className="product-remove">&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlistItems.map((product, i) => {
                      const formatter = formatterConvertCurrency(product.currencyCode);
                      const discountedPrice = getDiscountPrice(
                        product.price,
                        product.discount
                      ).toFixed(2);
                      
                      const cartItem = cartItems.count !== 0 ? cartItems.orders.filter(
                        (item) => item.id === product.id
                      )[0] : {};

                      return (
                        <tr key={i}>
                          <td className="product-thumbnail">
                            <Link
                              href={`/product/[slug]?slug=${product.slug}`}
                              as={`${process.env.PUBLIC_URL}/product/${product.slug}`}
                            >
                              <a>
                                <img
                                  src={
                                    process.env.PUBLIC_URL +
                                    product.thumbImage[0]
                                  }
                                  className="img-fluid"
                                  alt=""
                                />
                              </a>
                            </Link>
                          </td>
                          <td className="product-name">
                            <Link
                              href={`/product/[slug]?slug=${product.slug}`}
                              as={`${process.env.PUBLIC_URL}/product/${product.slug}`}
                            >
                              <a>{product.name}</a>
                            </Link>
                            {product.selectedProductColor &&
                            product.selectedProductSize ? (
                              <div className="product-variation">
                                <span>
                                  Color: {product.selectedProductColor}
                                </span>
                                <span>Size: {product.selectedProductSize}</span>
                              </div>
                            ) : (
                              ""
                            )}
                          </td>

                          <td className="product-price">
                            <span className="price">{formatter.format(discountedPrice)}</span>
                          </td>
                         
                          <td>
                            {product.affiliateLink ? (
                              <a
                                href={product.affiliateLink}
                                target="_blank"
                                className="lezada-button lezada-button--medium"
                              >
                                Buy now
                              </a>
                            ) : product.variation &&
                              product.variation.length >= 1 ? (
                              <Link
                                href={`/shop/product-basic/[slug]?slug=${product.slug}`}
                                as={`${process.env.PUBLIC_URL}/shop/product-basic/${product.slug}`}
                              >
                                <a className="lezada-button lezada-button--medium">
                                  Select option
                                </a>
                              </Link>
                            ) : product.stock && product.stock > 0 ? (
                              <button
                                onClick={() => addToVendor({id: product.variants.productVariantList[0].id, channel: product.channel}, addToast, 1)}
                                className={` lezada-button lezada-button--medium ${
                                  cartItem !== undefined &&
                                  cartItem.quantity > 0
                                    ? "active"
                                    : ""
                                } `}
                                disabled={
                                  cartItem !== undefined &&
                                  cartItem.quantity > 0
                                }
                                title={
                                  product !== undefined
                                    ? "Added to cart"
                                    : "Add to cart"
                                }
                              >
                                {cartItem !== undefined && cartItem.quantity > 0
                                  ? "Added"
                                  : "Add to cart"}
                              </button>
                            ) : (
                              <button
                                disabled
                                className="active lezada-button lezada-button--medium"
                              >
                                Out of stock
                              </button>
                            )}
                          </td>

                          <td className="product-remove">
                            <button
                              onClick={() =>
                                deleteFromWishlist(product, addToast)
                              }
                            >
                              <IoIosClose />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Col>
              <Col lg={12} className="space-mb--r100">
                <div className="cart-coupon-area space-pt--30 space-pb--30">
                  <Row className="align-items-center">
                    <Col lg={5} className="text-left text-lg-right ml-auto">
                      <button
                        className="lezada-button lezada-button--medium"
                        onClick={() => deleteAllFromWishlist(addToast)}
                      >
                        clear wishlist
                      </button>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col>
                <div className="item-empty-area text-center">
                  <div className="item-empty-area__icon space-mb--30">
                    <IoIosHeartEmpty />
                  </div>
                  <div className="item-empty-area__text">
                    <p className="space-mb--30">No items found in wishlist</p>
                    <Link
                      href={"../../"}
                      as={process.env.PUBLIC_URL + "../../"}
                    >
                      <a className="lezada-button lezada-button--medium">
                        Shop Now
                      </a>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </LayoutFive>
  );
};

const mapStateToProps = (state) => {
  return {
    wishlistItems: state.wishlistData,
    cartItems: state.cartData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToVendor: (item, addToast, quantityCount) => {
      dispatch(addToVendor(item, addToast, quantityCount));
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    deleteFromWishlist: (item, addToast) => {
      dispatch(deleteFromWishlist(item, addToast));
    },
    deleteAllFromWishlist: (addToast) => {
      dispatch(deleteAllFromWishlist(addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
