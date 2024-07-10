import { useDispatch } from "react-redux";
import styles from "./Orders.module.css";
import { addItemToCart } from "../../Store/cartSlice";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { CircularProgress } from "@mui/material";

export default function Orders({ orders, fav, setShowPagination, refetch }) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [loadingCancel, setLoadingCancel] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (id) => {
    dispatch(addItemToCart(id));
  };

  const handleShowProductDetails = (id) => {
    const product = orders.find((item) => item._id === id);
    setSelectedProduct(product);
    setShowPagination(false);
  };
  const handleBackToOrders = () => {
    setSelectedProduct(null);
    setShowPagination(true);
  };
  const handleCancelOrder = async (id) => {
    setLoadingCancel(id);
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    };

    try {
      const response = await fetch(
        `https://volt-nation.up.railway.app/orders/${id}/cancelled`,
        {
          method: "PATCH",
          headers: headers,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // queryClient.invalidateQueries(["allOrders"]);
      await refetch();
      setLoadingCancel(null);
    } catch (error) {
      console.error("Error saving profile details:", error);
      setLoadingCancel(null);
    }
  };
  return (
    <div>
      {selectedProduct ? (
        <div className={styles.singleOrder}>
          <div className={styles.date}>
            Order Date: {selectedProduct?.date?.slice(0, 10)}
          </div>
          {selectedProduct?.products?.map((order) => (
            <div
              className={styles.detailsCard}
              key={order._id}
              style={{ margin: "30px 0 0 0", padding: "0px" }}
            >
              <div className={styles.content}>
                <div className={styles.name}>{order.product.name}</div>
                <div className={styles.desc}>{order.product.description}</div>
                <div className={styles.price}>
                  Price: {order.product.price} EGP
                </div>
                <div className={styles.quantity}>
                  quantity: {order.quantity}
                </div>
                <div className={styles.status}>
                  Status: {selectedProduct.status}
                </div>
              </div>{" "}
              -
              <div className={styles.orderImg}>
                <div>
                  <img src={order.product.images[0]} alt={order.product.name} />
                </div>
              </div>
            </div>
          ))}
          <div className={styles.total}>
            <div className={styles.line}></div>
            <div className={styles.totalPrice}>
              <div>Total price: {selectedProduct.totalPrice} EGP</div>
              <div className={styles.detailsBtn} onClick={handleBackToOrders}>
                Back to Orders
              </div>
            </div>
          </div>
        </div>
      ) : orders && !selectedProduct ? (
        orders.map((el) => (
          <div className={styles.singleOrder} key={el._id}>
            {loadingCancel === el._id ? (
              <div className={styles.loadingContainer}>
                <CircularProgress
                  size={52}
                  sx={{ color: "var(--color-var1)" }}
                />
              </div>
            ) : (
              <>
                <div className={styles.date}>
                  Order Date: {el?.date?.slice(0, 10)}
                </div>
                {el?.products?.map((order) => (
                  <div
                    className={styles.detailsCard}
                    key={order._id}
                    style={{ margin: "30px 0", padding: "0px" }}
                  >
                    <div className={styles.content}>
                      <div className={styles.name}>{order.product.name}</div>
                      <div className={styles.desc}>
                        {order.product.description}
                      </div>
                      <div className={styles.btns}></div>
                    </div>
                    <div className={styles.orderImg}>
                      <div>
                        <img
                          src={order.product.images[0]}
                          alt={order.product.name}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <div className={styles.bottomBtns}>
                  <div className={styles.deliveredBtn}>{el.status}</div>{" "}
                  <div
                    className={styles.detailsBtn}
                    onClick={() => handleShowProductDetails(el._id)}
                  >
                    Show Details
                  </div>
                  {el.status !== "delivered" && (
                    <div
                      className={styles.cancelBtn}
                      onClick={() => handleCancelOrder(el._id)}
                    >
                      Cancel order
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ))
      ) : (
        fav?.map((el) => (
          <div
            className={styles.detailsCard}
            key={el._id}
            style={{
              backgroundColor: " rgba(0, 0, 0, 0.2)",
            }}
          >
            <div className={styles.content}>
              <div className={styles.name}>{el.name}</div>
              <div className={styles.desc}>{el.description}</div>
              <div className={styles.btns}>
                <div
                  className={`${styles.detailsBtn} xs:my-3 sm:my-auto`}
                  onClick={() => handleAddToCart(el._id)}
                >
                  Add to Cart
                </div>
              </div>
            </div>
            <div className={styles.orderImg}>
              <div>
                <img src={el.images[0]} alt={el.name} />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
