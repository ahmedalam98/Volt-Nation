import React from "react";
import styles from "./Offers.module.css";
import Swiper from "./Slider/Slider.jsx";

export default function Offers() {
  return (
    <div className="flex justify-center ">
      <div className="w-11/12 text-white md:text-start md:flex ">
        <div className="flex flex-col justify-center md:w-1/3 ">
          <h5 className="text-[20px] text-[#666] font-sans font-normal">
            Special Discount On Sale
          </h5>
          <div className="text-[35px] uppercase pl-3 my-[15px] text-Rubik relative ">
            <h3 className={`${styles.line}  `}>
              BEST
              <br />
              COLLECTION
              <br />
              DEVICE
            </h3>
          </div>
          <h5 className="text-[20px] text-[#666] font-sans font-normal">
            The brand comes from the google home collection 2024
          </h5>
          <button className={`${styles.button} mt-16  `}>SHOP NOW</button>
        </div>
        <div className="scale-95 md:w-2/3 md:scale-95 ">
          <Swiper />
        </div>
      </div>
    </div>
  );
}
