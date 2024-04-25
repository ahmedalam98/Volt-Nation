import styles from "./GridGallery.module.css";
import GalleryButton from "../GalleryButton/GalleryButton.jsx";
import GalleryCard from "../GalleryCard/GalleryCard.jsx";

const GridGallery = () => {
  return (
    <div className={`grid md:grid-cols-1 lg:grid-cols-2`}>
      <div className={styles.imageContainer}>
        <img
          src="src/assets/2.jpg"
          alt="headphone"
          className={`${styles.image}`}
          loading="lazy"
        />

        <div className={styles.textContainer}>
          <h2
            className={` font-semibold text-2xl md:text-5xl lg:text-3xl xl:text-5xl ${styles.header} `}
          >
            Discover your <br /> favourite item
          </h2>

          <GalleryButton color="white">Discover Now</GalleryButton>
        </div>
      </div>

      <div className="grid grid-cols-1 grid-rows-5 md:grid-cols-2 md:grid-rows-2">
        <div className={styles.imageContainer}>
          <img
            src="src/assets/1.jpg"
            alt="headphone"
            className={styles.image}
            loading="lazy"
          />
        </div>

        <GalleryCard
          buttonColor={"black"}
          bgColor={"#EDEDED"}
          subTitle={"RGB Design 2024"}
          header={"CREATION CONQUERED"}
          headerColor={"#1b1b1b"}
        />

        <GalleryCard
          buttonColor={"white"}
          bgColor={"#1b1b1b"}
          subTitle={"Best Brand 2024"}
          header={"SURROUND SOUND"}
          headerColor={"#EDEDED"}
        />

        <div className={styles.imageContainer}>
          <img
            src="src/assets/3.jpg"
            alt="headphone"
            className={styles.image}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default GridGallery;
