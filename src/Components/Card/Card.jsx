import { Rating } from "@mui/material";
import styles from "./Card.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Link } from "react-router-dom";
import { addItemToCart } from "../../Store/cartSlice.js";
import { useDispatch } from "react-redux";

export default function Card({ product }) {
  const dispatch = useDispatch();

  const handelIncrease = (id) => {
    dispatch(addItemToCart(id));
  };
  return (
    <>
      <div className={styles.card}>
        <div className={styles.img}>
          <img
            loading="lazy"
            src={product.images[0]}
            alt="prd1"
            className={styles.prdImg1}
          />
          <img
            loading="lazy"
            src={product.images[1]}
            alt="prd2"
            className={styles.prdImg2}
          />
        </div>

        <div className={styles.content}>
          <div className={styles.name}>
            <Link to={`/products/${product._id}`}>
              {product?.name?.slice(0, 29)}
            </Link>
          </div>
          <div className={styles.rating}>
            <Rating name="read-only" value={product.rating} readOnly />
          </div>
          <div className={styles.price}>{+product.price} EGP</div>
        </div>

        <div className={styles.icons}>
          <button>
            <FavoriteBorderIcon />
          </button>

          <button>
            <ShoppingBagOutlinedIcon
              onClick={() => handelIncrease(product._id)}
            />
          </button>
        </div>
      </div>
      {/* <div className={styles.card}>
        <div className={styles.imgBx}>
          <img src={product.images[0]} alt />
        </div>
        <div className={styles.contextBx}>
          <h3>Wireless Headphone</h3>
          <h2 className={styles.price}>
            $245<small>.22</small>
          </h2>
          <a href="#" className={styles.buy}>
            Buy now
          </a>
        </div>
      </div> */}
    </>
  );
}
