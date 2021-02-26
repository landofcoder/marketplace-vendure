import Link from "next/link";
import { LayoutFive } from "../../../components/Layout";
import BreadcrumbOne from "../../../components/Breadcrumb/BreadcrumbOne";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import {
  Tab,
  Nav,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { convertProducts } from "../../../lib/product";
import SpinnerCenter from "../../../components/common/Spinner";
import { SEARCH_PRODUCTS } from "@bavaan/graphql/product/product-list.graphql";
import { GET_VENDOR_INFO } from "@bavaan/graphql/shop/shop-vendor.graphql";
import ShopDetail from "../../../components/Shop/ShopDetail";
const Shop = () => {
  const router = useRouter();
  const [layout, setLayout] = useState("grid four-column");
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [vendorInfo, setVendorInfo] = useState(null);
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
  const queryVendorInfo = useQuery(GET_VENDOR_INFO, {
    variables: {
      channelCode: router.query.channelCode,
    },
  });

  useEffect(() => {
    if (!queryVendorInfo.data) return;
    setVendorInfo(queryVendorInfo.data.getVendorByBrand);
  }, [queryVendorInfo]);

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
      />
      <div className="shop-style">
        <Tab.Container defaultActiveKey="shop_details">
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
            <Tab.Pane eventKey="shop_details">
              <ShopDetail shopDetail={vendorInfo}/>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </LayoutFive>
  );
};

export default Shop;
