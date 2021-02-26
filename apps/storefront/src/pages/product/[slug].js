import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { LayoutFive } from "../../components/Layout";
import ReactPlaceholder from "react-placeholder";
import {
  ImageGalleryLeftThumb,
  ProductDescriptionTab,
} from "../../components/ProductDetails";
import { addToCart, addToVendor, buyNowAction } from "../../redux/actions/cartActions";
import ProductDescription from "../../components/ProductDetails/ProductDescription";

import {
  addToWishlist,
  deleteFromWishlist,
} from "@bavaan/storefront-base/src/redux/actions/wishlistActions";
import {
  addToCompare,
  deleteFromCompare,
} from "@bavaan/storefront-base/src/redux/actions/compareActions";

import { GET_PRODUCT_DETAIL } from "@bavaan/graphql/product/product-detail.graphql";
import {convertProductDetail, productSkeleton, getDiscountPrice, convertProductsGroupVariant} from "../../lib/product";
import { convertCollection } from "../../lib/collection";
import StickyBox from "react-sticky-box";
import {
  TextBlock,
  MediaBlock,
  TextRow,
  RectShape,
  RoundShape,
} from "react-placeholder/lib/placeholders";
import {GET_PRODUCT_RECENTLY_VIEWED} from "@bavaan/graphql/product/product-list.graphql";
import ProductGridThreeWrapper from "../../components/ProductThumb/ProductGridThreeWrapper";
import Swiper from "react-id-swiper";

const ProductDetailPlaceHolder = (
  <div>
    <TextBlock rows={10} color="#e2e2e2" />
    <div className="product-details">
      <Container className="wide">
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

const ProductDetail = ({
  cartItems,
  wishlistItems,
  compareItems,
  addToCart,
  addToWishlist,
  deleteFromWishlist,
  addToCompare,
  deleteFromCompare,
  addToVendor,
  buyNowAction
}) => {

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    document.querySelector("body").classList.remove("overflow-hidden");
  });
  const router = useRouter();
  const queryProductDetail = useQuery(GET_PRODUCT_DETAIL, {
    variables: { slug: router.query.slug },
  });

  const queryGetProductRecentlyViewed = useQuery(GET_PRODUCT_RECENTLY_VIEWED, {
    variables: { options: { take: 10 } },
  });

  const product = queryProductDetail.data
    ? convertProductDetail(queryProductDetail.data.product)
    : productSkeleton();

  const { addToast } = useToasts();
  if (product.price[0] !== undefined) {
    product.price = product.price[0]
  }
  if (product.currencyCode !== undefined) {
    product.currencyCode.map((currencyCode) => {
      product.currencyCode = currencyCode
    });
  }
  const discountedPrice = getDiscountPrice(
    product.price,
    product.discount
  ).toFixed(2);

  const productPrice = product.price.toFixed(2);
  product.slug = router.query.slug;
  let cartItem = [];
  if (cartItem.lines)
    cartItem = cartItems.lines.filter(
      (cartItem) => cartItem.id === product.id
    )[0];
  const wishlistItem = wishlistItems.filter(
    (wishlistItem) => wishlistItem.id === product.id
  )[0];
  const compareItem = compareItems.filter(
    (compareItem) => compareItem.id === product.id
  )[0];
  const currentCollection = product.collections.length
    ? convertCollection(product.collections.slice(-1).pop(), {
      w: 1920,
      h: 380,
    })
    : null;

  const optionSwiper = {
    slidesPerView: 6,
    spaceBetween: 30,
    grabCursor: true,
    breakpoints: {
      1281: {
        slidesPerView: 5,
      },
      768: {
        slidesPerView: 3,
      },
      640: {
        slidesPerView: 2,
      },
      320: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
    },
  }
  
  useEffect(()=>{
    if(product.variants){
      setSelectedProduct(product.variants.productVariantList[0])
    }
  },[queryProductDetail.data]);

  return (
    <LayoutFive>
      {/* breadcrumb */}
      <ReactPlaceholder
        customPlaceholder={ProductDetailPlaceHolder}
        ready={!(queryProductDetail.loading || !queryProductDetail.data)}
      >
        {/* product details */}
        <div className="product-details pt-3 space-mb--50">
            <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
              <div className="space-mb-mobile-only--50 media-50" style={{ padding: 15, position: "relative", zIndex: 999}}>
                {/* image gallery bottom thumb */}
                <StickyBox offsetTop={90} offsetBottom={20}>
                  <ImageGalleryLeftThumb
                      product={product}
                      wishlistItem={wishlistItem}
                      addToast={addToast}
                      addToWishlist={addToWishlist}
                      deleteFromWishlist={deleteFromWishlist}
                      addToCompare={addToCompare}
                      deleteFromCompare={deleteFromCompare}
                      addToVendor={addToVendor}
                      compareItem={compareItem}
                      selectedProduct={selectedProduct}
                      buyNowAction={buyNowAction}
                  />
                </StickyBox>
              </div>
              <div className="media-50" style={{ padding: 15}}>
                <div className="product-content">
                  <ul className="breadcrumb__list mb-4 text-left">
                    <li>
                      <Link href="/" as={process.env.PUBLIC_URL + "/"}>
                        <a>Home</a>
                      </Link>
                    </li>
                    {product.collections.map((collection, index) => {
                      collection = convertCollection(collection);
                      return (
                          <li key={index}>
                            <Link
                                href={collection.url}
                                as={process.env.PUBLIC_URL + collection.url}
                            >
                              <a>{collection.name}</a>
                            </Link>
                          </li>
                      );
                    })}
                    <li><a>{product.name}</a></li>
                  </ul>
                </div>

                {/* product description */}
                <ProductDescription
                    product={product}
                    productPrice={productPrice}
                    discountedPrice={discountedPrice}
                    cartItems={cartItems.lines}
                    cartItem={cartItem}
                    wishlistItem={wishlistItem}
                    compareItem={compareItem}
                    addToast={addToast}
                    addToCart={addToCart}
                    addToWishlist={addToWishlist}
                    deleteFromWishlist={deleteFromWishlist}
                    addToCompare={addToCompare}
                    deleteFromCompare={deleteFromCompare}
                    addToVendor={addToVendor}
                    selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                />
                <ProductDescriptionTab product={product} />
              </div>
            </div>



        {/* related product */}
        {queryProductDetail?.data?.product?.recommendations.length > 0 ? (
            <div className="element-wrapper space-mt--r100">
              <Container className="wide">
                <div className="text-uppercase font-weight-bold"
                     style={{fontSize: "18px", margin: "0px 0px 20px 0px"}}> Recommended Products </div>
                <Row>
                  <Col lg={12}>
                    <div className="product-slider-container">
                      <Swiper {...optionSwiper} >
                        <ProductGridThreeWrapper
                            products={convertProductsRecommend(queryProductDetail?.data?.product?.recommendations)}
                            sliderClass="swiper-slide"
                        />
                      </Swiper>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
        ) : null}


        {/* Recent View */}
        {queryGetProductRecentlyViewed?.data?.getProductRecentlyViewed?.items.length > 0 ? (
            <div className="element-wrapper space-mt--r100">
              <Container className="space-mb--r130 wide">
                <div className="text-uppercase font-weight-bold" style={{fontSize: "18px", margin: "0px 0px 20px 0px"}}> Recently Viewed </div>
                <Row>
                  <Col lg={12}>
                    <div className="product-slider-container">
                      <Swiper {...optionSwiper} >
                        <ProductGridThreeWrapper
                            products={convertProductsGroupVariant(
                                queryGetProductRecentlyViewed.data
                                    .getProductRecentlyViewed.items
                            )}
                            sliderClass="swiper-slide"
                        />
                      </Swiper>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
        ) : null}

        </div>
      </ReactPlaceholder>
    </LayoutFive>
  );
};

const convertProductsRecommend = (products) => {
  return products.map((product) => {
    return convertProductDetail(product.recommendation);
  });
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
        )
      );
    },
    addToVendor: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToVendor(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
        )
      )
    },
    buyNowAction: (
      item,
      addToast,
      quantityCount
    ) => {
      dispatch(
        buyNowAction(
          item,
          addToast,
          quantityCount
        )
      )
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    deleteFromWishlist: (item, addToast) => {
      dispatch(deleteFromWishlist(item, addToast));
    },
    addToCompare: (item, addToast) => {
      dispatch(addToCompare(item, addToast));
    },
    deleteFromCompare: (item, addToast) => {
      dispatch(deleteFromCompare(item, addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
