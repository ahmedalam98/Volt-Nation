import { useDispatch } from "react-redux";
import styles from "./Orders.module.css";
import { addItemToCart } from "../../Store/cartSlice";

export default function Orders({ order, fav }) {
  console.log(fav, "fav");
  const dispatch = useDispatch();

  const handleAddToCart = (id) => {
    dispatch(addItemToCart(id));
  };
  return (
    <div className={styles.singleOrder}>
      {order ? (
        <>
          {order.products.map((el) => (
            <div className={styles.detailsCard} key={el._id}>
              <div className={styles.content}>
                <div className={styles.date}>
                  Order Date: {order.date.slice(0, 10)}
                </div>
                <div className={styles.name}>{el.product.name}</div>
                <div className={styles.desc}>{el.product.description}</div>
                <div className={styles.btns}>
                  <div className={styles.detailsBtn}>Details</div>
                  <div className={styles.deliveredBtn}>{order.status}</div>
                </div>
              </div>
              <div className={styles.orderImg}>
                <div>
                  <img src={el.product.images[0]} alt={el.product.name} />
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {fav?.map((el) => (
            <div className={styles.detailsCard} key={el._id}>
              <div className={styles.content}>
                <div className={styles.name}>{el.name}</div>
                <div className={styles.desc}>{el.description}</div>
                <div className={styles.btns}>
                  <div
                    className={styles.detailsBtn}
                    onClick={() => handleAddToCart(el._id)}
                  >
                    Add to cart
                  </div>
                </div>
              </div>
              <div className={styles.orderImg}>
                <div>
                  <img src={el.images[0]} alt={el.name} />
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
