import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Styles from "./Slider.module.css";

let offers = [
  {
    image: "/sl1.JPG",
    offerValue: " Only from $210.00",
    saleValue: "Sale up to 40%",
  },
  {
    image: "/sl2.JPG",
    offerValue: "Only from $140.00",
    saleValue: "Sale up to 60%",
  },
  {
    image: "/sl3.JPG",
    offerValue: "Only from $210.00",
    saleValue: "Trend 2024",
  },
  {
    image: "/sl4.JPG",
    offerValue: " Only from $210.00",
    saleValue: "Sale up to 80%",
  },
];
export default function Swiper() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1125,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: true,
          dotsColor: "white",
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className=" slider-container">
      <Slider {...settings} className={`relative flex ${Styles.responsive} `}>
        {offers.map((offer) => (
          <div
            key={offer.offerValue}
            className={`relative text-center respns scale-[0.85] justify-self-center m-0-auto ${Styles.center} `}
          >
            <img
              src={offer.image}
              alt="offer"
              className="text-center shadow-xl h-[500px] md:h-[700px]"
            />
            <div className="absolute translate-x-[-50%] left-1/2 top-1/2 translate-y-[150%] text-white bg-black py-2 px-6 bg-opacity-20 rounded-md tracking-wide">
              <div className="leading-7 text-[15px] ">{offer.offerValue}</div>
              <h2 className="mt-5 text-[24px] font-bold">{offer.saleValue}</h2>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
