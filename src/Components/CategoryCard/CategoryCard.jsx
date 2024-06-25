import { Link } from "react-router-dom";
import styles from "./CategoryCard.module.css";

export default function CategoryCard({ img, name, desc, quantity }) {
  return (
    <Link to={`/categories/${name}`} className={styles.card}>
      <div className={styles["card-info"]}>
        <div className={styles.img}>
          <img src={img} alt="category" />
        </div>
        <div className={styles.txt}>
          <div className={styles.nameQ}>
            <div className={styles.name}>{name}</div>
            <div className={styles.quantity}>{quantity}</div>
          </div>
          <div className={styles.desc}>{desc}</div>
        </div>
      </div>
    </Link>
  );
}
