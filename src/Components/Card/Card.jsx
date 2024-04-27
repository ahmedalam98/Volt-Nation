import { Rating } from "@mui/material";
import styles from "./Card.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
// eslint-disable-next-line react/prop-types
export default function Card({ product }) {
  console.log(product, "card");
  return (
    <>
      <div className={styles.card}>
        <div className={styles.img}>
          <img src={product.images[0]} alt="prd1" className={styles.prdImg1} />
          <img src={product.images[1]} alt="prd2" className={styles.prdImg2} />
        </div>
        <div className={styles.content}>
          <div className={styles.rating}>
            <Rating name="read-only" value={product.rating} readOnly />
          </div>
          <div className={styles.name}>{product.pName}</div>
          <div className={styles.brand}>{product.brand}</div>
          <div className={styles.price}>{product.price}</div>
        </div>
        <div className={styles.icons}>
          <button>
            <FavoriteBorderIcon />
          </button>
          <button>
            <ShoppingBagOutlinedIcon />
          </button>
        </div>
      </div>
    </>
  );
}
