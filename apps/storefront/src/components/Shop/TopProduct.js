import Link from 'next/link'

import { IoMdFunnel } from "react-icons/io";

import { MdViewComfy, MdApps, MdList } from "react-icons/md";
import Paginator from 'react-hooks-paginator'
import {SlideDown} from 'react-slidedown'

import {getSortedProducts} from '@bavaan/storefront-base/src/lib/product'
import {Container, Row, Col, Tabs, Tab, Sonnet} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import {
    ShopFilter,
    ShopSidebar,
} from '@bavaan/storefront-base/src/components/Shop'
import ShopProducts from "../../components/Shop/ShopProducts"

import products from '../../data/top_product.json'

const TopProduct = () => {
  
    const [selected, setSelected] = useState('tab1');
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
    return (
        
      <div>
        <Container>
          <div className="shop-page-content">
            <br/>
            <br/>
            <br/>
            <Row className="align-items-center">
              <Col md={5} className="text-center text-md-left">
                7 Item(s)
              </Col>
              <Col md={7}>
                <div className="shop-header__filter-icons justify-content-center justify-content-md-end">
                  <div className="single-icon filter-dropdown">
                    <select
                      onChange={(e) =>
                      getFilterSortParams("filterSort", e.target.value)
                      }
                    >
                      <option value="default">Default</option>
                      <option value="priceHighToLow">Price - High to Low</option>
                      <option value="priceLowToHigh">Price - Low to High</option>
                    </select>
                  </div>

                  <div className="single-icon grid-icons d-none d-lg-block">
                    <button
                        onClick={(e) => {
                        getLayout("grid three-column");
                        setActiveLayout(e);
                      }}
                    >
                    <MdApps />
                    </button>
                    <button
                      className="active"
                      onClick={(e) => {
                        getLayout("grid four-column");
                        setActiveLayout(e);
                      }}
                    >
                    <MdViewComfy />
                    </button>
                  </div>

                  <div className="single-icon advance-filter-icon">
                    <button
                      onClick={() => setShopTopFilterStatus(!shopTopFilterStatus)}
                      className={shopTopFilterStatus ? "active" : ""}
                    >
                      <IoMdFunnel /> Filter
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
            
        <SlideDown closed={shopTopFilterStatus ? false : true}>
          <ShopFilter products={products} getSortParams={getSortParams} />
        </SlideDown>

        <div className="shop-page-content__body space-mt--r130 space-mb--r130">
          <Container>
            <Row>
              <Col
                lg={3}
                className="order-2 order-lg-1 space-mt-mobile-only--50"
              >
                {/* shop sidebar */}
                <ShopSidebar
                  products={products}
                  getSortParams={getSortParams}
                />
              </Col>

              <Col lg={9} className="order-1 order-lg-2">
                {
                  <ShopProducts layout={layout} products={currentData} />
                }
                

                <div className="pro-pagination-style">
                  <Paginator
                    totalRecords={sortedProducts.length}
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
          
        
        </Container>
      </div>
      
       
    );
};

export default TopProduct;
