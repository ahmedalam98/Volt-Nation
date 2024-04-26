import Slider from "react-slick";
import styles from "./Hero.module.css";

export default function Hero() {
  const settings = {
    infinite: true,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2500,
    cssEase: "linear",

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          dots: false,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className={styles.heroContainer}>
      <Slider {...settings} className={styles.slider}>
        <div className={styles.slide}>
          <div className={styles.subTitle}>Device Deals</div>
          <div className={styles.headline1}>
            <h1>SmartPhone</h1>
          </div>
          <div className={styles.img}>
            <img
              src="https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2020/01/img3-1.png"
              alt="smartphone"
            />
          </div>
          <button className={styles.shopBtn}>Shop now</button>
        </div>

        <div className={styles.slide}>
          <div className={styles.subTitle2}>Smart Choices</div>

          <div className={styles.headline2}>
            <h1>airpods</h1>
          </div>
          <div className={styles.img}>
            <img
              src="https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2020/01/img2-1.png"
              alt="airpods"
            />
          </div>
          <button className={styles.shopBtn}>Shop now</button>
        </div>
        <div className={styles.slide}>
          <div className={styles.subTitle}>Tech Trends</div>

          <div className={styles.headline1}>
            <h1>Headphone</h1>
          </div>
          <div className={styles.img}>
            <img
              src="https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2020/01/img1.png"
              alt="Headphone"
            />
          </div>
          <button className={styles.shopBtn}>Shop now</button>
        </div>
      </Slider>
    </div>
  );
}
