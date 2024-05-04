import Slider from "react-slick";
import styles from "./BestSellers.module.css";
import { useQuery } from "react-query";
import { getProducts } from "../../api/apiFunctions";
import Card from "../Card/Card.jsx";

export default function BestSellers() {
  const { isLoading, data } = useQuery(["products"], getProducts);

  // console.log(data?.data);

  const settings = {
    infinite: true,
    // fade: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    // autoplay: true,
    speed: 1000,
    autoplaySpeed: 2500,
    cssEase: "linear",

    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
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
    <div className="mt-16 mb-4">
      <h2 className="text-4xl tracking-wider text-white ms-16">
        Our Best Sellers
      </h2>

      {isLoading && <div className="mt-16 text-4xl text-white">Loading...</div>}

      <Slider {...settings} className={styles.swiper}>
        {data?.data?.slice(10, 16).map((el) => (

          <Card key={el.id} product={el} />
        ))}
      </Slider>
    </div>
  );
}
