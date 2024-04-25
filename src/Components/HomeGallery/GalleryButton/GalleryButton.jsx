import styles from "./GalleryButton.module.css";
import PropTypes from "prop-types";

const GalleryButton = ({ color, children, fontSize }) => {
  return (
    <button
      style={{ borderColor: color, color: color, fontSize: fontSize }}
      className={styles.button}
    >
      {children}
    </button>
  );
};

GalleryButton.propTypes = {
  color: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  fontSize: PropTypes.string,
};

export default GalleryButton;
