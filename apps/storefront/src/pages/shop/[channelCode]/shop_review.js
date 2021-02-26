import Link from "next/link";
import { LayoutFive } from "../../../components/Layout";
import { IoMdFunnel } from "react-icons/io";
import { MdViewComfy, MdApps, MdList } from "react-icons/md";
import Paginator from "react-hooks-paginator";
import { SlideDown } from "react-slidedown";
import BreadcrumbOne from "../../../components/Breadcrumb/BreadcrumbOne";
import { getSortedProducts } from "@bavaan/storefront-base/src/lib/product";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
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
import ShopHeader from "../../../components/Shop/ShopHeader";
import {
  ProductWidgetWrapper,
  ProductGridThreeWrapper,
} from "@bavaan/storefront-base/src/components/ProductThumb";
import ShopSidebar from "../../../components/Shop/ShopSidebar";
import ShopProducts from "../../../components/Shop/ShopProducts";

import { convertProducts } from "../../../lib/product";
import { convertCollection } from "../../../lib/collection";
import SpinnerCenter from "../../../components/common/Spinner";

import { SEARCH_PRODUCTS } from "@bavaan/graphql/product/product-list.graphql";
import ShopReview from "../../../components/Shop/ShopReview";
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
  const pageLimit = 20;
  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };
  const queryProducts = useQuery(SEARCH_PRODUCTS, {
    variables: {
      input: {
        collectionId: router.query.id,
        facetValueIds: [],
        groupByProduct: true,
        skip: 0,
        take: pageLimit,
        term: "",
      },
    },
  });

  // useEffect(() => {
  //   let sortedProducts = getSortedProducts(products, sortType, sortValue);
  //   const filterSortedProducts = getSortedProducts(
  //     sortedProducts,
  //     filterSortType,
  //     filterSortValue
  //   );
  //   sortedProducts = filterSortedProducts;
  //   setSortedProducts(sortedProducts);
  //   setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
  // }, [offset, products, sortType, sortValue, filterSortType, filterSortValue]);

  if (queryProducts.loading || !queryProducts.data) {
    return <SpinnerCenter />;
  }
  let channelCode = router.query.channelCode;

  const products = convertProducts(queryProducts.data.search.items);

  return (
    <LayoutFive aboutOverlay={false}>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle=""
        backgroundImage="/assets/images/backgrounds/banner.jpg"
      ></BreadcrumbOne>
      <div className="shop-style">
        <Tab.Container defaultActiveKey="shop_review">
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
            <Tab.Pane eventKey="shop_review">
              <ShopReview/>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </LayoutFive>
  );
};

export default Shop;
