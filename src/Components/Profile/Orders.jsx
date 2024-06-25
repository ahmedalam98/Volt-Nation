import styles from "./Orders.module.css";

export default function Orders({ order }) {
  console.log(order, "ss");
  return (
    <div className={styles.singleOrder}>
      {order.products.map((el) => (
        <div className={styles.detailsCard} key={el._id}>
          <div className={styles.content}>
            <div className={styles.date}>
              Order Data :{order.date.slice(0, 10)}
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
              <img src={el.product.images[0]} />
            </div>
          </div>{" "}
        </div>
      ))}
    </div>
  );
}
