import GalleryButton from "../GalleryButton/GalleryButton.jsx";
import styles from "./GalleryCard.module.css";

const GalleryCard = ({
  buttonColor,
  bgColor,
  subTitle,
  header,
  headerColor,
  dynamicCard,
}) => {
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className={`relative ${styles.card} ${dynamicCard && "hidden md:block"}`}
    >
      <div className={styles.container}>
        <div className="mb-6">
          <p className=" text-[#909090] text-sm mb-3 normal-case">{subTitle}</p>

          <h2
            style={{ color: headerColor }}
            className="overflow-hidden text-2xl font-bold lg:text-base xl:text-2xl whitespace-nowrap text-ellipsis"
          >
            {header}
          </h2>
        </div>

        <GalleryButton
          navigateTo={"/categories"}
          fontSize={"14px"}
          color={buttonColor}
        >
          Shop Collection
        </GalleryButton>
      </div>
    </div>
  );
};

export default GalleryCard;
