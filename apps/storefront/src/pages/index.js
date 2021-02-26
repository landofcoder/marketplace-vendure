import Swiper from "react-id-swiper";
import { useState, useEffect } from "react";
import HeroSliderTwo from "../components/HeroSlider/HeroSliderTwo";
import { Container, Row, Col } from "react-bootstrap";
import { SectionTitleThree } from "../components/SectionTitle";
import ProductWidgetWrapper from "../components/ProductThumb/ProductWidgetWrapper";
import ProductGridThreeWrapper from "../components/ProductThumb/ProductGridThreeWrapper";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import Countdown from "react-countdown";
import Renderer from "@bavaan/storefront-base/src/components/Countdown/Renderer";
import {
  GET_TOP_SELLERS,
  GET_PRODUCT_ARRIVALS,
  GET_PRODUCT_RECENTLY_VIEWED,
  GET_PRODUCT_DEAL_OF_THE_WEEK,
  GET_PRODUCT_FEATURED,
  GET_PRODUCT_LATEST,
  GET_PRODUCT_NEWS,
  GET_PRODUCT_ON_SALE,
} from "@bavaan/graphql/product/product-list.graphql";
import { useQuery } from "@apollo/react-hooks";
import { LayoutFive } from "../components/Layout";
import { CategorySlider } from "@bavaan/storefront-base/src/components/Category";
import { GET_COLLECTIONS } from "@bavaan/graphql/documents.graphql";
import { convertProducts, convertProductsGroupVariant } from "../lib/product";
import { convertCollections } from "../lib/collection";
import { convertBanners } from "../lib/banner";
import ShopGridThreeWrapper from "../components/ShopThumb/ShopGridThreeWrapper";
const Home = () => {
  const queryTopSellers = useQuery(GET_TOP_SELLERS, {});
  const queryGetProductDealOfTheWeek = useQuery(
    GET_PRODUCT_DEAL_OF_THE_WEEK,
    {}
  );

  const queryGetProductArrivals = useQuery(GET_PRODUCT_ARRIVALS, {});
  const queryGetProductOnSale = useQuery(GET_PRODUCT_ON_SALE, {});
  const queryGetProductLatest = useQuery(GET_PRODUCT_LATEST, {});
  const queryGetProductNews = useQuery(GET_PRODUCT_NEWS, {});
  const queryGetProductFeature = useQuery(GET_PRODUCT_FEATURED, {});
  const queryCollections = useQuery(GET_COLLECTIONS, {});
  const [collections, setCollections] = useState([]);
  useEffect(() => {
    if (queryCollections.data) {
      setCollections(queryCollections.data.collections.items);
    }
  }, [queryCollections]);
  const params = {
    loop: false,
    slidesPerView: 6,
    spaceBetween: 30,
    grabCursor: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <IoIosArrowRoundBack />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <IoIosArrowRoundForward />
      </button>
    ),
    breakpoints: {
      1281: {
        slidesPerView: 7,
      },
      1024: {
        slidesPerView: 5,
      },
      768: {
        slidesPerView: 4,
      },
      640: {
        slidesPerView: 3,
      },
      320: {
        slidesPerView: 2,
      },
    },
  };
  return (
    <LayoutFive aboutOverlay={false}>
      {/* hero slider */}
      {queryCollections.loading || !queryCollections.data ? null : (
        <HeroSliderTwo
          sliderData={convertBanners(queryCollections.data.collections.items)}
          spaceBottomClass="space-mb--50"
        />
      )}

      {/*Top Products */}
      <div className="element-wrapper space-mt--r130 space-mb--r130">
        <SectionTitleThree title="Top Products" link="/" />
        {queryTopSellers.loading || !queryTopSellers.data ? null : (
          <Container className="space-mb--r130 wide">
            <Row>
              <Col lg={12}>
                <div className="product-slider-container">
                  <Swiper {...params}>
                    <ProductGridThreeWrapper
                      products={convertProducts(
                        queryTopSellers.data.search.items,
                        undefined,
                        collections
                      )}
                      sliderClass="swiper-slide"
                    />
                  </Swiper>
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </div>

      {/* Featured Products */}
      <div className="element-wrapper space-mt--r130 space-mb--r130">
        <SectionTitleThree title="Featured Products" link="/" />
        {queryGetProductFeature.loading ||
        !queryGetProductFeature.data ? null : (
          <Container className="space-mb--r130 wide">
            <Row>
              <Col lg={12}>
                <div className="product-slider-container">
                  <Swiper {...params}>
                    <ProductGridThreeWrapper
                      products={convertProducts(
                        queryGetProductFeature.data.search.items,
                        undefined,
                        collections
                      )}
                      sliderClass="swiper-slide"
                    />
                  </Swiper>
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </div>

      {/* Deal of the week */}
      {/* <div className="element-wrapper bg-color--blue-two space-mt--r130 space-mb--r130 space-pt--r100 space-pb--r100">
        <div className="countdown-wrapper text-center">
          <h3 className="space-mb--r50 text-white">Deal of the week</h3>
          <div className="deal-countdown text-white">
            <Countdown
              date={new Date(Date.now() + 240000000)}
              renderer={Renderer}
            />
          </div>
        </div>
        {queryGetProductDealOfTheWeek.loading ||
        !queryGetProductDealOfTheWeek.data ? null : (
          <Container className="wide">
            <Row>
              <Col lg={12}>
                <div className="product-slider-container">
                  <Swiper {...params}>
                    <ProductGridThreeWrapper
                      products={convertProducts(
                        queryGetProductDealOfTheWeek.data.search.items,
                        undefined,
                        collections
                      )}
                      sliderClass="swiper-slide border-0"
                    />
                  </Swiper>
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </div> */}

      {/* New Arrivals */}
      <div className="element-wrapper space-mt--r130 space-mb--r130">
        <SectionTitleThree title="New Arrivals" link="/" />
        {queryGetProductArrivals.loading ||
        !queryGetProductArrivals.data ? null : (
          <Container className="space-mb--r130 wide">
            <Row>
              <Col lg={12}>
                <div className="product-slider-container">
                  <Swiper {...params}>
                    <ProductGridThreeWrapper
                      products={convertProducts(
                        queryGetProductArrivals.data.search.items,
                        undefined,
                        collections
                      )}
                      sliderClass="swiper-slide"
                    />
                  </Swiper>
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </div>

      {/*On sale, Latest, New*/}
      <Container className="space-mb--r130 wide">
        <Row>
          {queryGetProductOnSale.loading ||
          !queryGetProductOnSale.data ? null : (
            <Col lg={4} md={6} className="space-mb-mobile-only--50">
              <div className="single-product-widget-slider-container">
                <h3 className="widget-slider-title">On Sale</h3>
                <div className="product-widget-container container">
                  <ProductWidgetWrapper
                    products={convertProducts(
                      queryGetProductOnSale.data.search.items,
                      undefined,
                      collections
                    )}
                  />
                </div>
              </div>
            </Col>
          )}
          {queryGetProductLatest.loading ||
          !queryGetProductLatest.data ? null : (
            <Col lg={4} md={6} className="space-mb-mobile-only--50">
              <div className="single-product-widget-slider-container">
                <h3 className="widget-slider-title">Lastest</h3>
                <div className="product-widget-container container">
                  <ProductWidgetWrapper
                    products={convertProducts(
                      queryGetProductLatest.data.search.items,
                      undefined,
                      collections
                    )}
                  />
                </div>
              </div>
            </Col>
          )}
          {queryGetProductNews.loading || !queryGetProductNews.data ? null : (
            <Col lg={4} md={6}>
              <div className="single-product-widget-slider-container">
                <h3 className="widget-slider-title">News</h3>
                <div className="product-widget-container container">
                  <ProductWidgetWrapper
                    products={convertProducts(
                      queryGetProductNews.data.search.items,
                      undefined,
                      collections
                    )}
                  />
                </div>
              </div>
            </Col>
          )}
        </Row>
      </Container>

      {/* Featured Shop */}
      <div className="element-wrapper space-mt--r130 space-mb--r130">
        <SectionTitleThree title="Featured Shops" link="/" />
        {queryGetProductArrivals.loading ||
        !queryGetProductArrivals.data ? null : (
          <Container className="space-mb--r130 wide">
            <Row>
              <Col lg={12}>
                <div className="shop-slider-container">
                  <Swiper
                    {...Object.assign(params, {
                      slidesPerView: 4,
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
                          slidesPerView: 1,
                        },
                      },
                    })}
                  >
                    <ShopGridThreeWrapper
                      products={convertProducts(
                        queryGetProductArrivals.data.search.items,
                        undefined,
                        collections
                      )}
                      sliderClass="swiper-slide"
                    />
                  </Swiper>
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </div>

      {/* Top Categories */}
      <div className="element-wrapper space-mt--r100 space-mb--50">
        <SectionTitleThree title="Top Categories" link="/" />
        {queryCollections.loading || !queryCollections.data ? null : (
          <Container className="space-mb--r130 wide">
            <CategorySlider
              categoryData={convertCollections(
                queryCollections.data.collections.items
              )}
              spaceBottomClass="space-mb--r100"
            />
          </Container>
        )}
      </div>
    </LayoutFive>
  );
};

export default Home;
