import ProductGridListWrapper from "../../components/ProductThumb/ProductGridListWrapper";
import { Row } from "react-bootstrap";
const ShopProducts = ({ products, layout, addToVendor }) => {
  return (
    <div className="shop-products">
      <Row className={layout}>
        <ProductGridListWrapper
          products={products}
          bottomSpace="space-mb--50"
          addToVendor={addToVendor}
        />
      </Row>
    </div>
  );
};

export default ShopProducts;
