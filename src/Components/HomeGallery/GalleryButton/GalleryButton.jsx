/* eslint-disable react/prop-types */
import styles from "./GalleryButton.module.css";
import { Link } from "react-router-dom";

const GalleryButton = ({ color, children, fontSize }) => {
  return (
    <Link
      to="/"
      style={{ borderColor: color, color: color, fontSize: fontSize }}
      className={styles.button}
    >
      {children}
    </Link>
  );
};

export default GalleryButton;
