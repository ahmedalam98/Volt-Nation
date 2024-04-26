import styles from "./GalleryButton.module.css";
import PropTypes from "prop-types";
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

GalleryButton.propTypes = {
  color: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  fontSize: PropTypes.string,
};

export default GalleryButton;
