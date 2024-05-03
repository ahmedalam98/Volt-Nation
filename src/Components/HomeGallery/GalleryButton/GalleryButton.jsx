import styles from "./GalleryButton.module.css";
import { Link } from "react-router-dom";

const GalleryButton = ({ color, children, fontSize, navigateTo }) => {
  return (
    <Link
      to={navigateTo}
      style={{ borderColor: color, color: color, fontSize: fontSize }}
      className={styles.button}
    >
      {children}
    </Link>
  );
};

export default GalleryButton;
