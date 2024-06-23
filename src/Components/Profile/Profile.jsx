import React, { useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import styles from "./Profile.module.css";
import { useQuery } from "react-query";
import { getProducts } from "../../api/apiFunctions";
import Orders from "./Orders.jsx";

export default function Profile() {
  const [value, setValue] = useState(0);
  const [orders, setOrders] = useState(1);
  const [wishlist, setWishlist] = useState(0);

  const { data, isLoading } = useQuery(["products"], getProducts);

  let orderProducts = data?.data?.slice(0, 4);
  let wishlistProducts = data?.data?.slice(10, 14);

  if (isLoading) <div>Loading...</div>;

  return (
    <div>
      <div className={styles.show}>
        <div className={`${styles.navContainer} m-5 `}>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              flex: 2,
              justifyContent: "center",
              background: "transparent",
            }}
          >
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              sx={{ background: "transparent" }}
            >
              <BottomNavigationAction
                sx={{ color: "white" }}
                label="Orders"
                icon={<ShoppingBasketIcon />}
                className={`${styles.customBtn} ${styles.home}`}
                onClick={() => {
                  setOrders(1);
                  setWishlist(0);
                }}
              />
              <BottomNavigationAction
                sx={{ color: "white" }}
                label="Wishlist"
                icon={<FavoriteIcon />}
                className={`${styles.customBtn} ${styles.home}`}
                onClick={() => {
                  setOrders(0);
                  setWishlist(1);
                }}
              />
            </BottomNavigation>
          </Box>
        </div>
        <div className="mr-16">
          {orders ? (
            <Orders products={orderProducts} trackOrder="TrackOrder" />
          ) : (
            ""
          )}
          {wishlist ? (
            <Orders products={wishlistProducts} addToCard="Add to cart" />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
