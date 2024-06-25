import { Rating } from "@mui/material";
import styles from "./Card.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Link } from "react-router-dom";
import { addItemToCart } from "../../Store/cartSlice.js";
import { useDispatch } from "react-redux";
import { addToFav, getProfileDetails } from "../../api/apiFunctions.js";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
export default function Card({ product }) {
  // console.log(product, "prod");
  const { data, isLoading } = useQuery("profileDetails", getProfileDetails);
  // console.log(data?.data?.favourite, "fffffff");
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [fav, setFav] = useState();

  const { mutate: addToFavorites } = useMutation(addToFav, {
    onSuccess: () => {
      queryClient.invalidateQueries(["profileDetails"]);
    },
  });
  // const { mutate: removeFromFavorites } = useMutation(removeFromFav, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["profileDetails"]);
  //   },
  // });
  const handleAddToFavorites = (id) => {
    addToFavorites(id);
  };
  const handleRemoveFromFavorites = async (id) => {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    };

    try {
      const response = await fetch(
        `http://localhost:2024/user/remove-favourite/${id}`,
        {
          method: "PATCH",
          headers: headers,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      queryClient.invalidateQueries(["profileDetails"]);
    } catch (error) {
      console.error("Error saving profile details:", error);
    }
  };
  const handelIncrease = (id) => {
    dispatch(addItemToCart(id));
  };
  const isFavorite = data?.data?.favourite?.some(
    (favItem) => favItem._id === product._id
  );

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
          {isFavorite ? (
            <button onClick={() => handleRemoveFromFavorites(product._id)}>
              <FavoriteIcon />
            </button>
          ) : (
            <button onClick={() => handleAddToFavorites(product._id)}>
              <FavoriteBorderIcon />
            </button>
          )}

          <button>
            <ShoppingBagOutlinedIcon
              onClick={() => handelIncrease(product._id)}
            />
          </button>
        </div>
      </div>
    </>
  );
}
