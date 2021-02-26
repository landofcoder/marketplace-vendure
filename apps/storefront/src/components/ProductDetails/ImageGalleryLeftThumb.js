import React, { Fragment, useEffect, useState, useRef } from "react";
import Swiper from "react-id-swiper";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdExpand,
  IoIosHeartEmpty, IoIosShuffle,
} from "react-icons/io";
import { Tooltip } from "react-tippy";
import ReactImageMagnify from 'react-image-magnify';

const ImageGalleryLeftThumb = ({
  product,
  wishlistItem,
  addToast,
  addToWishlist,
  deleteFromWishlist,
  addToCompare,
  deleteFromCompare,
  addToVendor,
  compareItem,
  selectedProduct,
  buyNowAction
}) => {
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);
  const [currentImage, setCurrentImage] = useState(product.image[0] || null);

  const [thumbnailSwiperParams, getThumbnailSwiperParams] = useState({
    direction: "vertical",
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: "auto",
    grabCursor: true,
    autoHeight: true,
    clickable: true,
    freeMode: true,
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <IoIosArrowBack />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <IoIosArrowForward />
      </button>
    ),
  });
  const [gallerySwiperParams, setGallerySwiperParams] = useState({
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
    effect: "fade",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  // effect for swiper slider synchronize
  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const handleResize = () => {
    console.log("size div change");
  }

  return (
    <Fragment>
      <div style={{display: "flex"}}>
        <div id="preview-img" className="preview-image" />
        <div className="product-small-image-wrapper col-sm-2">
          <Swiper {...thumbnailSwiperParams}>
            {product.image &&
              product.image.map((image, i) => {
                return (
                  <div className="h-auto" key={i} onClick={()=>setCurrentImage(image)}>
                    <div className="single-image h-auto" style={image === currentImage ? { border: '2px solid red', padding: '4px'} : {}}>
                      <img
                          src={process.env.PUBLIC_URL + image}
                          className="img-fluid"
                          alt=""
                      />
                    </div>
                  </div>
                );
              })}
          </Swiper>
        </div>
        <div className="product-large-image-wrapper col-sm-10">
          {/* floating badges */}
          <div className="product-large-image-wrapper__floating-badges">
            {product.discount && product.discount > 0 ? (
              <span className="onsale">-{product.discount}%</span>
            ) : (
              ""
            )}
            {product.new ? <span className="hot">New</span> : ""}
            {product.stock === 0 ? (
              <span className="out-of-stock">out</span>
            ) : (
              ""
            )}
          </div>

          {/* wishlist button */}
          <div className="product-details-button-wrapper">
            <Tooltip
                title={
                  wishlistItem !== undefined
                      ? "Added to wishlist"
                      : "Add to wishlist"
                }
                position="left"
                trigger="mouseenter"
                animation="shift"
                arrow={true}
                duration={200}
            >
              <button
                  className={`wishlist-icon ${
                      wishlistItem !== undefined ? "active" : ""
                  }`}
                  onClick={
                    wishlistItem !== undefined
                        ? () => deleteFromWishlist(product, addToast)
                        : () => addToWishlist(product, addToast)
                  }
              >
                <IoIosHeartEmpty />
              </button>

              <button
                  className={`wishlist-icon ${
                      compareItem !== undefined ? "active" : ""
                  }`}
                  title={
                    compareItem !== undefined
                        ? "Added to compare"
                        : "Add to compare"
                  }
                  onClick={
                    compareItem !== undefined
                        ? () => deleteFromCompare(product, addToast)
                        : () => addToCompare(product, addToast)
                  }
              >
                <IoIosShuffle />
              </button>
            </Tooltip>
          </div>
          <div>
            <ReactImageMagnify className="image-zoom"
            style={{boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 2px 0px, rgba(0, 0, 0, 0) 0px 1px 2px 0px"}} {...{
              smallImage: {
                alt: '',
                isFluidWidth: true,
                src: currentImage ? process.env.PUBLIC_URL + currentImage : 'undefined'
              },
              largeImage: {
                src: currentImage ? process.env.PUBLIC_URL + currentImage : 'undefined',
                width: 1250,
                height: 1050
              },
              enlargedImagePortalId: 'preview-img',
              enlargedImageContainerDimensions: {
                width: '125%',
                height: '105%'
              },
              shouldUsePositiveSpaceLens: true,
              lensStyle: {
                width: '10%',
                height: '10%'
              }
            }} />
            <div className="col-sm-12 space-mt--30" style={{display: "flex", justifyContent:"center"}}>
              <button 
                className="lezada-button lezada-button--medium product-content__cart space-mr--20 col-sm-6" onClick={() => {
                  addToVendor(
                    { ...product, ...selectedProduct},
                    addToast,
                    1
                    )
                  }}
                  >
                    Add To Cart
              </button>

              <button
                  className="lezada-button lezada-button--medium product-content__cart space-mr--10 col-sm-6"
                  onClick={() => {
                    buyNowAction(
                      { ...product, ...selectedProduct},
                      addToast,
                      1,
                    )
                  }}
              >
                Buy now
              </button>
            </div>

          </div>
        </div>
      </div>
      
    </Fragment>
  );
};

export default ImageGalleryLeftThumb;
