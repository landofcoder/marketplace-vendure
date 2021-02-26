import { Fragment } from "react";
import { useToasts } from "react-toast-notifications";
import ShopRating from "../Shop/ShopRating";
import Rating from "react-rating";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";

export const shops = [
  {
    name: "Allioop",
    position: "Chandigarh, India",
    image: "/assets/images/brands/brand1.png",
    rating: 5
  },
  {
    name: "Burberry",
    position: "Chandigarh, India",
    image: "/assets/images/brands/brand2.png",
    rating: 4
  },
  {
    name: "CAT MEN",
    position: "Chandigarh, India",
    image: "/assets/images/brands/brand3.png",
    rating: 4
  },
  {
    name: "HOUDINI",
    position: "Chandigarh, India",
    image: "/assets/images/brands/brand4.png",
    rating: 5
  },
  {
    name: "LOVE",
    position: "Chandigarh, India",
    image: "/assets/images/brands/brand5.png",
    rating: 4
  },
  {
    name: "MADE",
    position: "Chandigarh, India",
    image: "/assets/images/brands/brand6.png",
    rating: 5
  },
];
const ShopGridThreeWrapper = ({ sliderClass, shops }) => {
  return (
    <Fragment>
      {shops &&
        shops.map((shop, index) => {
          return (
            <div key={index} className={`card text-left ${sliderClass} shop-child h-auto`}>
              <div className="d-flex flex-column align-items-center">
                <div className="avatar">
                  <img className="card-img-top" src={shop.image} alt="" />
                </div>
                <div className="card-body title d-flex flex-column align-items-center">
                  <h3 className="product-title space-mb--10">
                    <a>{shop.name}</a>
                  </h3>
                  <p className="card-text">{shop.position}</p>
                  <div className="rating">
                    <Rating
                        initialRating={shop.rating ?? 0}
                        emptySymbol={<IoIosStarOutline />}
                        fullSymbol={<IoIosStar className="yellow"/>}
                        readonly
                    />
                  </div>
                </div>
                <div>
                  <a href="" className="btn-footer">
                    Shop now
                  </a>
                </div>
              </div>
            </div>
          );
        })}
    </Fragment>
  );
};

export default ShopGridThreeWrapper;
