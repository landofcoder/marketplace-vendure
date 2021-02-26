import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { Card, Spinner } from "react-bootstrap";
import { useLazyQuery } from "@apollo/react-hooks";
import { MdClose } from "react-icons/md";
import { SEARCH_PRODUCT_WITH_NAME } from "@bavaan/graphql/product/product-list.graphql";
import { convertProductsGroupVariant } from "../../../lib/product";
import ProductWidgetWrapper from "../../ProductThumb/ProductWidgetWrapper";
const SearchOverlay = ({
  activeStatus,
  inputValue,
  goSearchPage,
  isMobile,
}) => {
  const router = useRouter();
  if (goSearchPage)
    router.push("/product/search/search-product/?name=" + inputValue);
  const [isCallQL, setISsCallQL] = useState(false);
  const [
    searchProductRequest,
    { loading, error, data, refetch },
  ] = useLazyQuery(SEARCH_PRODUCT_WITH_NAME, {
    variables: {
      options: {
        take: isMobile ? 3 : 9,
        filter: { name: { contains: inputValue ?? "" } },
      },
    },
  });
  useEffect(() => {
    searchAction();
  }, [inputValue]);
  const searchAction = () => {
    if (isCallQL) {
      refetch;
      return;
    }
    searchProductRequest();
    setISsCallQL(true);
  };

  const cardProducts = (products = []) => {
    const convertProducts = convertProductsGroupVariant(products);
    return (
      <ProductWidgetWrapper
        sliderClass={"col-md-6 col-lg-4 col-sm-12 mb-3"}
        products={convertProducts}
      />
    );
  };
  const cardLoading = () => (
    <Card.Body style={{ display: "flex", justifyContent: "center" }}>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </Card.Body>
  );
  if (!activeStatus) return null;
  if(!loading && data && !data.products.items.length) return null;
  return (
    <div className="card">
      <div className="container p-2">
        {loading
          ? cardLoading()
          : !loading && data
          ? cardProducts(data.products.items)
          : null}
      </div>
    </div>
  );
};

export default SearchOverlay;
