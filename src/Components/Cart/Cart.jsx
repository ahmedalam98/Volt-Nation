import React, { useEffect, useState } from "react";
import CartItem from "./CartItem.jsx";
import { useNavigate } from "react-router-dom";
import { getProducts, getCart } from "../../api/apiFunctions";
import { useQuery } from "react-query";
import styles from "./Cart.module.css";
import PayPal from "../PayPal/PayPal.jsx";
import axios from "axios";

export default function Cart() {
  // const navigate = useNavigate();
  // const { isLoading, isError, data, error, refetch } = useQuery(
  //   ["products"],
  //   getProducts
  // );
  // const { isLoading, isError, data, error, refetch } = useQuery(
  //   ["cart"],
  //   getCart
  // );
  // console.log("data", data);

  // let totalAmount = 10;
  const [checkout, setCheckout] = useState(false);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    getCart().then((data) => {
      setProducts(data?.data?.products);
      setQuantity(
        data?.data?.products?.reduce(
          (acc, cur) => acc + Number(cur.quantity),
          0
        )
      );
    });
  }, [quantity]);

  function deleteProduct(id) {
    setProducts(products.filter((product) => product.product.id !== id));
  }

  // if (isLoading)
  //   return (
  //     <div>
  //       <div className="loader-container">
  //         <div className="loader"></div>
  //       </div>
  //     </div>
  //   );

  if (products.length === 0)
    return (
      <div className="flex items-center justify-center w-full ">
        <h1
          className={` ${styles.linear}   p-10  w-1/2 m-20 text-center rounded-lg text-pretty text-white bg-[#1e3446]`}
        >
          Your Shopping Cart is Empty &#128542;
        </h1>
      </div>
    );

  if (products.length > 0)
    return (
      <div className="flex flex-col items-center justify-center gap-20 mx-5 md:mx-20 cart">
        <div className="w-full gap-16 my-0 md:mx-auto lg:flex">
          <div className="cart flex-[4] flex flex-col md:block gap-5  ">
            {products?.map((product) => {
              return (
                <CartItem
                  key={product.product.id}
                  deleteProduct={deleteProduct}
                  quantity={product.quantity}
                  {...product.product}
                />
              );
            })}
          </div>

          <div className={` mt-5 md:m-7  flex-[1.5] w-full `}>
            <div
              className={`flex flex-col justify-center leading-5 text-center rounded-xl ${styles.linear} text-white pt-10 checkout`}
            >
              <div className="mb-10 text-xl font-semibold ">SUBTOTAL</div>
              <div className="flex justify-around mb-3">
                <div> Items </div>
                <div> {quantity} </div>
              </div>
              <div className="flex justify-around mb-3">
                <div> Total price </div>
                <div>
                  $&nbsp;
                  {products.reduce(
                    (acc, cur) =>
                      acc + Number(cur.product.price.replace("$", "")),
                    0
                  )}
                </div>
              </div>
              <hr className="w-4/5 mx-auto my-0" />
              <br />
              <div className="flex flex-wrap items-center justify-center w-full row-auto ">
                <button
                  className={`${styles.checkout_btn} `}
                  onClick={() => {
                    setCheckout(!checkout);
                    console.log("checkout");
                  }}
                >
                  Checkout
                </button>
              </div>
              {checkout && (
                <div className="flex items-center self-center justify-center w-1/2 lg:w-4/5">
                  <PayPal
                    price={products?.reduce(
                      (acc, cur) =>
                        acc + Number(cur.product.price.replace("$", "")),
                      0
                    )}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
}
