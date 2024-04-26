import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Styles from "./Slider.module.css";

let offers = [
  {
    image:
      "https://images.unsplash.com/photo-1576087503901-b2a3e3b66672?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    offerValue: " Only from $210.00",
    saleValue: "sale up to 40%",
  },
  {
    image:
      "https://images.unsplash.com/photo-1612444530582-fc66183b16f7?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    offerValue: "Only from $140.00",
    saleValue: "sale up to 60%",
  },
  {
    image:
      "https://images.unsplash.com/photo-1503328427499-d92d1ac3d174?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    offerValue: "Only from $210.00",
    saleValue: "trend 2024",
  },
  {
    image:
      "https://images.unsplash.com/photo-1552168324-d612d77725e3?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    offerValue: " Only from $210.00",
    saleValue: "sale up to 80%",
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className=" slider-container">
      <Slider {...settings} className="relative flex ">
        {offers.map((offer) => (
          <div
            key={offer.offerValue}
            className={`relative text-center respns scale-95 justify-self-center m-0-auto ${Styles.center} `}
          >
            <img
              src={offer.image}
              alt="offer"
              className="text-center shadow-xl "
              style={{ height: "700px" }}
            />
            <div className="absolute translate-x-[-50%] left-1/2 top-1/2 translate-y-[150%] text-white bg-black py-2 px-6 bg-opacity-20 rounded-md">
              <div className="leading-7 text-[15px] ">{offer.offerValue}</div>
              <h2 className="mt-5 text-[24px] font-bold">{offer.saleValue}</h2>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
