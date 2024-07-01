import { useNavigate, useParams } from "react-router-dom";
import styles from "./ProductDetails.module.css";
import { Rating } from "@mui/material";
import { getProducts } from "../../api/apiFunctions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../Store/cartSlice";
import BestSellers from "../../Components/BestSellers/BestSellers.jsx";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export default function ProductDetails() {
  //get the product ID
  const { id } = useParams();
  const [prd, setPrd] = useState(null);
  const [currentImg, setCurrentImg] = useState(0);
  // start of Checking logged in
  let decodedToken;
  let Token = localStorage.getItem("token");
  let valid = false;

  if (Token) {
    decodedToken = jwtDecode(Token);
    let expirationTime = decodedToken.exp;
    let currentTime = Math.floor(Date.now() / 1000);
    if (currentTime < expirationTime) {
      valid = true;
    }
  }
  // end of Checking logged in
  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProducts();
        const product = res.data.find((ele) => ele._id === id);
        setPrd(product);
        setCurrentImg(product.images[0]);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProduct();
  }, [id]);
  let handelImage = (ev) => {
    setCurrentImg(ev.target.src);
  };
  let addToCart = () => {
    //check if the user logged in
    if (valid) {
      dispatch(addItemToCart(prd._id));
    } else {
      toast.error("You should log in first!");
    }
  };
  let buyNow = () => {
    //check if the user logged in
    if (valid) {
      addToCart();
      navigate("/cart");
    } else {
      toast.error("You should log in first!");
    }
  };

  if (prd === null) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  } else {
    return (
      <>
        <div className="flex p-3 m-3" id={styles.mainDiv}>
          <div className="w-1/2 p-4 " style={{ display: "flex" }}>
            {/* First column Images */}

            {/* for other images */}
            <div style={{ width: "25%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  flexWrap: "nowrap",
                  height: "70vh",
                  overflow: "hidden",
                }}
              >
                {prd.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="product-details"
                    className={styles.prdImg}
                    style={{ flexShrink: "3" }}
                    onMouseOver={(event) => handelImage(event)}
                  />
                ))}
              </div>
            </div>
            {/* for main image */}
            <div
              style={{
                width: "75%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "70vh",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={currentImg}
                  alt="product-details"
                  className={styles.mainPrdImg}
                />
              </div>
            </div>
          </div>
          <div className="w-1/2 p-4 text-white">
            {/* Second column content */}
            <div className={styles.prdDetails}>
              {/* Name+Describtion */}
              <h2>{prd.name}</h2>
              <h1 className="my-1">{prd.description}</h1>
              <div style={{ display: "flex" }}>
                <p className="me-5">{prd.brand}</p>
                <p>{prd.category}</p>
              </div>
              <Rating
                className="my-3"
                name="read-only"
                value={prd.rating}
                readOnly
              />
              <p className={styles.price}>Price: {prd.price} L.E</p>
              <p className="mt-3">
                Colors:{" "}
                {prd.colors.map((ele, index) => (
                  <span key={index} className={styles.color}>
                    {ele}
                  </span>
                ))}
              </p>
              <p>Realse date : {prd.releasedDate}</p>
              <div className="mt-3">
                About this item:
                <ol>
                  {prd.features.map((ele, index) => (
                    <li key={index} className={styles.feature}>
                      - {ele}
                    </li>
                  ))}
                </ol>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginTop: "5%",
                }}
              >
                <button className={styles.btn} onClick={addToCart}>
                  Add to Cart
                </button>
                <button className={styles.btn} onClick={buyNow}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <BestSellers />
      </>
    );
  }
}
