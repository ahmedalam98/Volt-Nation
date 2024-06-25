import React from "react";
import styles from "./Profile.module.css";

export default function Orders({ products, trackOrder, addToCard }) {
  // console.log("Products  from orders", products);
  return (
    <div>
      {products?.map((product) => (
        <div
          key={product._id}
          className={`w-full  md:h-[200px] flex shadow-md items-center rounded-xl md:m-7  ${styles.linear} `}
        >
          <div className="flex w-full h-full ">
            <div className="w-[220px]  flex justify-center items-center sm:h-full rounded-tl-xl rounded-bl-xl bg-white ">
              <img
                src={product.images[0]}
                alt={product.id}
                className=" md:h-20"
              />
            </div>
            <div className=" text-white text-xl flex-wrap  justify-between items-center ml-[20px] flex w-full   sm:p-2 ">
              <div className="sm:flex-[2]">
                <h2>{product.name}</h2>
                <p className="text-[13px] w-10/12  "> {product.features}</p>

                {trackOrder && (
                  <div>
                    <button
                      className={`${styles.track_btn} `}
                      onClick={() => {
                        // console.log("proudct details", product);
                      }}
                    >
                      Details
                    </button>
                    <button
                      className={`${styles.track_btn} `}
                      onClick={() => {
                        // console.log("Track Order", product);
                      }}
                    >
                      Track Order
                    </button>
                  </div>
                )}
                {addToCard && (
                  <div>
                    <button
                      className={`${styles.track_btn} `}
                      onClick={() => {
                        // console.log("Add to Cart", product);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
