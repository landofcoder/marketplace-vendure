import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaGooglePlusG, FaTwitter, FaMapMarkerAlt } from "react-icons/fa"
import Owner from "./Owner";
import { IoIosPricetags, IoIosHeartEmpty } from "react-icons/io"
import { ProductRating } from "@bavaan/storefront-base/src/components/Product";
import {useState} from "react"
import {useRouter} from 'next/router'
const ShopDetail = ({
  layoutClass,
    shopDetail
}) => {
    // console.log("test shop", shopDetail)
    const [favoriteShop, setFavoriteShop] = useState(false);
    const owner = {ownerName: shopDetail && shopDetail.ownerName? shopDetail.ownerName : "", ownerImage: shopDetail && shopDetail.ownerImage? shopDetail.ownerImage : "/assets/images/user/user-avatar-default.png", ownerEmail: shopDetail && shopDetail.ownerEmail? shopDetail.ownerEmail : ""};
    const favoriteShopClick = (event) => {
      event.preventDefault();
      setFavoriteShop(!favoriteShop)
    };
    const router =  useRouter();
    const queryString = router.query;
  return (
    <div className="shop-header shop-info">
      <Container className={layoutClass ? layoutClass : ""}>
          <Row>
              <Col lg={3} md={4} className="single-team-member text-center">
                <div className="single-team-member text-center">
                    <div className="member-image">
                        <img
                            src={shopDetail && shopDetail.image?process.env.PUBLIC_URL + shopDetail.image : "/assets/images/user/user-avatar-default.png"}
                            className="img-fluid"
                            alt=""
                        />
                        <div className="social-inside">
                            <ul className="social-list">
                                <li className="social-list__item">
                                    <a href="https://www.facebook.com" target="_blank">
                                        <FaFacebookF />
                                    </a>
                                </li>
                                <li className="social-list__item">
                                    <a href="https://plus.google.com" target="_blank">
                                        <FaGooglePlusG />
                                    </a>
                                </li>
                                <li className="social-list__item">
                                    <a href="https://www.twitter.com" target="_blank">
                                        <FaTwitter />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="member-caption">
                        <h2 className="name">{queryString.code}</h2>
                    </div>
                    <span>Shop Name: {shopDetail && shopDetail.info[0].brandName ? shopDetail.info[0].brandName : "Default Name"}</span>
                </div>
              </Col>
              <Col lg={6} md={4} className="single-team-member">
                <Col lg={8}>
                <div>
                    <FaMapMarkerAlt style={{color: "red"}}/>
                    <span style={{lineHeight: "120%"}}>  {shopDetail && shopDetail.info[0].regAddress ? shopDetail.info[0].regAddress : "Default Address"}</span>
                </div>
                <br/>
                <div className="product-content__rating-wrap d-block d-sm-flex space-mb--20">
                  <div className="product-content__rating space-mr--20">
                  <ProductRating ratingValue={shopDetail && shopDetail.rating? shopDetail.rating : 4}/>
                  </div>
                  <div className="product-content__rating-count">
                    <a href="#">( {shopDetail && shopDetail.reviewCounter? shopDetail.reviewCounter : 2} customer rating )</a>
                  </div>
                </div>

                <div>
                  <IoIosPricetags style={{color: "green"}}/>
                  <i> #{shopDetail && shopDetail.tags ? shopDetail.tags : "clothing_fashion"}</i>
                </div>
                <br/>
                <br/>
                <br/>
                <div>
                <button
                  className="lezada-button lezada-button--small product-content__cart space-mr--10"
                  onClick={favoriteShopClick}
                >
                  <IoIosHeartEmpty/>
                  <span> {favoriteShop? "REMOVE FAVORITE SHOP": "ADD FAVORITE SHOP"}</span>
                </button>
                </div>
                </Col>
              </Col>
              <Col lg={3} md={4} className="single-team-member text-center">
                  <Owner owner={owner}/>
              </Col>
            </Row>
        
      </Container>
    </div>
  );
};

export default ShopDetail;
