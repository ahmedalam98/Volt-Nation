import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { IconButton } from "@mui/material";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
// import {
//   addItemToCart,
//   decrementItem,
//   removeFromCart,
// } from "../../api/apiFunctions";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  decrementItem,
  removeFromCart,
} from "../../Store/cartSlice.js";

export default function CartItem(props) {
  console.log(props);

  const { _id, id, pName, price, images, brand, deleteProduct, quantity } =
    props;
  const [cartItems, setCartItems] = useState(quantity);
  const dispatch = useDispatch();
  useEffect(() => {
    setCartItems(quantity);
  }, [quantity]);


  if (quantity < 1) {
    deleteProduct(id);
  }

  const handelDecrease = (id) => {
    dispatch(decrementItem(id));
  };
  const handelIncrease = (id) => {
    dispatch(addItemToCart(id));
  };
  const handleDelete = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div
      className={`w-full  md:h-[150px] flex shadow-md items-center rounded-xl md:m-7  ${styles.linear} `}
    >
      <div className="flex w-full h-full ">
        <div className="w-[220px]  flex justify-center items-center sm:h-full rounded-tl-xl rounded-bl-xl bg-white ">
          <img src={images[0]} alt={id} className=" md:h-20" />
        </div>
        <div className=" text-white text-xl flex-wrap  justify-between items-center ml-[20px] flex w-full  mt-2 sm:p-5 ">
          <div className="sm:flex-[2]">
            <h2>{pName}</h2>
            <p className="text-[13px]  "> Brand: {brand}</p>
            <p className="text-[13px] text-white "> Price: {price} </p>
          </div>
          <div className="flex items-center sm:gap-10 ">
            <div className="flex justify-end text-2xl ">
              <div className="counter   sm:m-[-2px] m-[-5px] ">
                <IconButton onClick={() => handelIncrease(_id)}>
                  <AddBoxIcon
                    style={{
                      color: "white",
                    }}
                  ></AddBoxIcon>
                </IconButton>
                <span className="text-base text-white">{cartItems}</span>

                <IconButton
                  sx={{ color: "white" }}
                  onClick={() => handelDecrease(_id)}
                >
                  <IndeterminateCheckBoxIcon></IndeterminateCheckBoxIcon>
                </IconButton>
              </div>
            </div>
            <div className="flex justify-end text-2xl ">
              <section>
                <span
                  onClick={() => handleDelete(_id)}
                  className={styles.sampah}
                >
                  <span></span>
                  <i></i>
                </span>
                <img
                  className={styles.image}
                  src={images[0]}
                  alt=" thounder logo"
                />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
