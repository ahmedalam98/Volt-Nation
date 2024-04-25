import GalleryButton from "../GalleryButton/GalleryButton.jsx";
import PropTypes from "prop-types";
import styles from "./GalleryCard.module.css";

const GalleryCard = ({
  buttonColor,
  bgColor,
  subTitle,
  header,
  headerColor,
}) => {
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className={`relative ${styles.card}`}
    >
      <div className={styles.container}>
        <div className="mb-6">
          <p className=" text-[#909090] text-sm mb-3 normal-case">{subTitle}</p>

          <h2
            style={{ color: headerColor }}
            className="text-2xl lg:text-base xl:text-2xl font-bold whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {header}
          </h2>
        </div>

        <GalleryButton fontSize={"14px"} color={buttonColor}>
          Shop Collection
        </GalleryButton>
      </div>
    </div>
  );
};

GalleryCard.propTypes = {
  buttonColor: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  header: PropTypes.string,
  headerColor: PropTypes.string.isRequired,
};

export default GalleryCard;
