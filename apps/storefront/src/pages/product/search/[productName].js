import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import Paginator from "react-hooks-paginator";
import { SlideDown } from "react-slidedown";
import { LayoutFive } from "../../../components/Layout";
import BreadcrumbOne from "../../../components/Breadcrumb/BreadcrumbOne";
import { getSortedProducts } from "@bavaan/storefront-base/src/lib/product";
import { ShopFilter } from "@bavaan/storefront-base/src/components/Shop";
import ShopHeader from "../../../components/Shop/ShopHeader";
import ShopProducts from "../../../components/Shop/ShopProducts";
import ShopSidebar from "../../../components/Shop/ShopSidebar";
import {
  GET_COLLECTION,
  SEARCH_PRODUCTS,
} from "@bavaan/graphql/product/product-list.graphql";
import { convertProducts } from "../../../lib/product";
import { convertCollection } from "../../../lib/collection";
import SpinnerCenter from "../../../components/common/Spinner";

const FullwidthLeftSidebar = () => {
  const router = useRouter();
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
  const [products, setProducts] = useState([]);
  const [totalRecords, setTotalRecords] = useState(1);
  const [facets, setFacets] = useState([]);
  const pageLimit = 20;
  const [queryVariables, setQueryVariables] = useState({
    term: router.query.name ?? null,
    facetValueIds: [],
    groupByProduct: true,
    take: pageLimit,
    skip: pageLimit * (currentPage - 1),
  });
  // const queryCollection = useQuery(GET_COLLECTION, { variables: { id: router.query.id, slug: router.query.slug } });

  const [queryProducts, { loading, data }] = useLazyQuery(SEARCH_PRODUCTS, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    setQueryVariables({
      ...queryVariables,
      skip: pageLimit * (currentPage - 1),
    });
  }, [currentPage]);

  useEffect(() => {
    queryProducts({ variables: { input: queryVariables } });
  }, [queryVariables]);

  const getLayout = (layout) => {
    setLayout(layout);
  };

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
    if (!data) return;
    setProducts(convertProducts(data.search.items));
    setFacets(data.search.facets);
    setTotalRecords(data.search.totalItems);
  }, [data]);

  if (queryProducts.loading) {
    return <SpinnerCenter />;
  }

  return (
    <LayoutFive>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle={"Search result page"}
        backgroundImage="/assets/images/backgrounds/breadcrumb-bg-1.png"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>
          <li>Search result for "{router.query.name}"</li>
        </ul>
      </BreadcrumbOne>
      <div className="shop-page-content">
        {/* shop page header */}
        <ShopHeader
          getLayout={getLayout}
          getFilterSortParams={getFilterSortParams}
          productCount={data?.search.totalItems}
          sortedProductCount={products.length}
          shopTopFilterStatus={shopTopFilterStatus}
          setShopTopFilterStatus={setShopTopFilterStatus}
        />

        {/* shop header filter */}
        <SlideDown closed={shopTopFilterStatus ? false : true}>
          <ShopFilter products={products} getSortParams={getSortParams} />
        </SlideDown>

        {/* shop page body */}
        <div className="shop-page-content__body space-mt--r130 space-mb--r130">
          <Container>
            <Row>
              <Col
                lg={3}
                className="order-2 order-lg-1 space-mt-mobile-only--50"
              >
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
    </LayoutFive>
  );
};

export default FullwidthLeftSidebar;
