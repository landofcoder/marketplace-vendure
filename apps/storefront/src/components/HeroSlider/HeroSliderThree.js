import Link from "next/link";
import Swiper from "react-id-swiper";
import { Container, Row, Col } from "react-bootstrap";

const HeroSliderThree = ({ sliderData, spaceBottomClass }) => {
  const params = {
    loop: true,
    slidesPerView: 1.5,
    spaceBetween: 30,
    centeredSlides: true,
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    watchSlidesVisibility: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav"></button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav"></button>
    ),
  };
  return (
    <div
      className={`hero-slider-three ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="hero-slider-three__wrapper">
        <Swiper {...params}>
          {sliderData &&
            sliderData.map((single, i) => {
              return (
                <div className="swiper-slide" key={i}>
                  <a href={single.url} target="_blank">
                    <img
                      style={{ width: "100%", minHeight: "150px", objectFit: "cover" }}
                      src={single.bgImage}
                    />
                  </a>
                </div>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSliderThree;
