import Link from "next/link";
import { LayoutFive } from "../../../components/Layout";
import { IoMdFunnel } from "react-icons/io";
import { MdViewComfy, MdApps, MdList } from "react-icons/md";
import Paginator from "react-hooks-paginator";
import { SlideDown } from "react-slidedown";
import BreadcrumbOne from "../../../components/Breadcrumb/BreadcrumbOne";
import { getSortedProducts } from "@bavaan/storefront-base/src/lib/product";
import { useRouter } from "next/router";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import {
  Container,
  Row,
  Col,
  Tab,
  TabContainer,
  Nav,
  TabPane,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import ShopFilter from "../../../components/Shop/ShopFilter";
import ShopSidebar from "../../../components/Shop/ShopSidebar";
import ShopProducts from "../../../components/Shop/ShopProducts";

import { convertProducts } from "../../../lib/product";
import { convertCollection } from "../../../lib/collection";
import SpinnerCenter from "../../../components/common/Spinner";

import ShopCard from "../../../components/Shop/ShopCard";
import { GET_VENDOR_INFO } from "@bavaan/graphql/shop/shop-vendor.graphql";
import { SEARCH_SHOP_PRODUCTS } from "@bavaan/graphql/shop/shop-product.graphql";
import ShopHeader from "../../../components/Shop/ShopHeader";
const Shop = () => {
  const router = useRouter();
  const [selected, setSelected] = useState("tab1");
  const [layout, setLayout] = useState("grid four-column");
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [shopTopFilterStatus, setShopTopFilterStatus] = useState(false);
  const [vendorInfo, setVendorInfo] = useState(null);
  const [totalRecords, setTotalRecords] = useState(1);

  const [products, setProduct] = useState([]);
  const [facets, setFacets] = useState([]);
  const pageLimit = 20;
  const [queryVariables, setQueryVariables] = useState({
    channelCode: router.query.channelCode,
    facetValueIds: [],
    groupByProduct: true,
    skip: 0,
    take: pageLimit,
    term: "",
  });

  const getLayout = (layout) => {
    setLayout(layout);
  };
  const [channelCode, setChannelCode] = useState(router.query.channelCode);

  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    switch (sortType) {
      case "filterSort":
        if (sortValue === "priceHighToLow") {
          setQueryVariables({ ...queryVariables, sort: { price: "DESC" } });
          break;
        } else if (sortValue === "priceLowToHigh") {
          setQueryVariables({ ...queryVariables, sort: { price: "ASC" } });
          break;
        } else if (sortValue === "default") {
          setQueryVariables({ ...queryVariables, sort: {} });
          break;
        }
      case "searchName":
        setQueryVariables({ ...queryVariables, term: sortValue });
    }
  };

  const queryVendorInfo = useQuery(GET_VENDOR_INFO, {
    variables: {
      channelCode: router.query.channelCode,
    },
  });

  const [queryProducts, { loading, data }] = useLazyQuery(
    SEARCH_SHOP_PRODUCTS,
    { fetchPolicy: "network-only" }
  );

  useEffect(() => {
    let sortedProducts = getSortedProducts(products, sortType, sortValue);
    const filterSortedProducts = getSortedProducts(
        sortedProducts,
        filterSortType,
        filterSortValue
    );
    sortedProducts = filterSortedProducts;
    setSortedProducts(sortedProducts);
    setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
  }, [offset, products, sortType, sortValue, filterSortType, filterSortValue]);

  useEffect(() => {
    setQueryVariables({
      ...queryVariables,
      skip: pageLimit * (currentPage - 1),
    });
  }, [currentPage]);
  useEffect(() => {
    
    
    queryProducts({ variables: { input: queryVariables } });
  }, [queryVariables]);

  useEffect(() => {
    if (!data) return;
    setProduct(convertProducts(data.search.items));
    setFacets(data.search.facets);
    setTotalRecords(data.search.totalItems);
  }, [data]);

  useEffect(() => {
    if (!queryVendorInfo.data) return;
    setVendorInfo(queryVendorInfo.data.getVendorByBrand);
  }, [queryVendorInfo]);

  if (queryVendorInfo.loading || !queryVendorInfo.data) {
    return <SpinnerCenter />;
  }
  return (
    <LayoutFive aboutOverlay={false}>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle=""
        backgroundImage="/assets/images/backgrounds/banner.jpg"
      />
      <div className="shop-style">
        <Tab.Container defaultActiveKey="store_home">
          <Nav
            variant="pills"
            className="my-account-area__navigation space-mb--r60"
          >
            <Nav.Item>
              <Link href={`/shop/${channelCode}/shop_store_home`} passHref>
                <Nav.Link eventKey="store_home">Shop Store Home</Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href={`/shop/${channelCode}/shop_top_products`} passHref>
                <Nav.Link eventKey="top_products">Shop Top Products</Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href={`/shop/${channelCode}/shop_review`} passHref>
                <Nav.Link eventKey="shop_review">Shop Review</Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href={`/shop/${channelCode}/shop_contact`} passHref>
                <Nav.Link eventKey="shop_contact">Shop Contact</Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href={`/shop/${channelCode}/shop_details`} passHref>
                <Nav.Link eventKey="shop_details">Shop Details</Nav.Link>
              </Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="store_home">
              <div className="shop-page-content">
                <br />
                <br />
                <ShopHeader
                  getLayout={getLayout}
                  getFilterSortParams={getFilterSortParams}
                  productCount={data?.search.totalItems}
                  sortedProductCount={products.length}
                  shopTopFilterStatus={shopTopFilterStatus}
                  setShopTopFilterStatus={setShopTopFilterStatus}
                />
                {/* shop page header */}

                {/* shop header filter */}
                <SlideDown closed={shopTopFilterStatus ? false : true}>
                  <ShopFilter
                    facets={facets}
                    queryVariables={queryVariables}
                    setQueryVariables={(param) => {
                      setQueryVariables({ ...param });
                    }}
                    getSortParams={getSortParams}
                  />
                </SlideDown>

                {/* shop page body */}
                <div className="shop-page-content__body space-mt--r130 space-mb--r130">
                  <Container>
                    <Row>
                      <Col
                        lg={3}
                        className="order-2 order-lg-1 space-mt-mobile-only--50"
                      >
                        <ShopCard shop={vendorInfo} />
                        {/* shop sidebar */}
                        <ShopSidebar
                            facets={facets}
                            queryVariables={queryVariables}
                            setQueryVariables={(param) => {
                              setQueryVariables({ ...param });
                            }}
                            getSortParams={getSortParams}
                            getFilterSortParams={getFilterSortParams}
                        />
                      </Col>

                      <Col lg={9} className="order-1 order-lg-2">
                        {/* shop products */}
                        <ShopProducts layout={layout} products={products} />

                        {/* shop product pagination */}
                        <div className="pro-pagination-style">
                          <Paginator
                            totalRecords={totalRecords}
                            pageLimit={pageLimit}
                            pageNeighbours={2}
                            setOffset={setOffset}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            pageContainerClass="mb-0 mt-0"
                            pagePrevText="«"
                            pageNextText="»"
                          />
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </LayoutFive>
  );
};

export default Shop;
