import React from "react";
import styles from "./Offers.module.css";
import Swiper from "./Slider/Slider.jsx";
import { useNavigate } from "react-router-dom";

export default function Offers() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center mt-20 md:mt-5 ">
      <div className="w-11/12 text-white md:text-start md:flex ">
        <div className="flex flex-col justify-center md:w-1/3 ">
          <h5 className="text-[20px] text-[#666] tracking-wider">
            Special Discount On Sale
          </h5>
          <div className="text-[35px] uppercase pl-3 my-[15px]  relative ">
            <h3 className={`${styles.line}  `}>
              BEST
              <br />
              COLLECTION
              <br />
              DEVICE
            </h3>
          </div>
          <h5 className="text-[20px] text-[#666] tracking-wider">
            The brand comes from the google home collection 2024
          </h5>
          <div className="text-center md:text-start">
            <button
              onClick={() => navigate("/categories")}
              className={`${styles.button} mt-16 mb-8 md:mb-0`}
            >
              SHOP NOW
            </button>
          </div>
        </div>
        <div className="scale-95 md:w-2/3 md:scale-95 ">
          <Swiper />
        </div>
      </div>
    </div>
  );
}
