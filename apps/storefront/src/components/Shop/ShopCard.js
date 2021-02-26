import React from "react";
import ShopRating from "./ShopRating";
import Rating from "react-rating";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";

const ShopCard = ({ sliderClass, shop }) => {
  console.log("shop", shop);
  shop = shop ?? {
    customerInfo: {},
    channel: {
      id: 1,
      code: "_default_channel_",
      createdAt: new Date("01/01/2020"),
    },
  };
  shop.customerInfo = shop.customerInfo ?? {};
  return (
    <div className="shop-slider-container mb-3">
      <div
        className={`card text-left ${sliderClass} shop-child no-hover h-auto`}
      >
        <div className="d-flex flex-column align-items-center text-center">
          <div className="avatar">
            <img
              className="card-img-top"
              src={shop.image ?? "/assets/images/user/user-avatar-default.png"}
              alt=""
            />
          </div>
          <div className="card-body title d-flex flex-column align-items-center">
            <h3 className="product-title space-mb--10">
              <p style={{ fontSize: "1.2rem" }}>{shop.channel.code??""}</p>
              {/*<p style={{ fontSize: "1.2rem" }}>*/}
              {/* ( {shop.firstName??""} {shop.lastName??""} )*/}
              {/*</p>*/}
            </h3>
            {/*<p className="card-text">{shop.email??""}</p>*/}
            {/*<span className="text-center" style={{ fontSize: "0.7rem" }}>*/}
            {/*  Shop Opened On: {new Date(shop.channel.createdAt).toDateString()}*/}
            {/*</span>*/}
            {/*<div className="rating">*/}
            {/*  <Rating*/}
            {/*      initialRating={4.5}*/}
            {/*      emptySymbol={<IoIosStarOutline />}*/}
            {/*      fullSymbol={<IoIosStar className="yellow"/>}*/}
            {/*      readonly*/}
            {/*  />*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
