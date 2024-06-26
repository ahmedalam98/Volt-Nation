import { useQuery, useQueryClient } from "react-query";
import { useEffect } from "react";
import CategoryCard from "../../Components/CategoryCard/CategoryCard.jsx";
import styles from "./Categories.module.css";
import { getCategories } from "../../api/apiFunctions.js";

export default function Categories() {
  const { data, isLoading } = useQuery("categories", getCategories);

  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries("categories");
    };
  }, []);

  if (isLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  const nonIntegratedImages = [
    "https://www.intel.com/content/dam/www/public/us/en/images/video-thumbnails/15s-vid-intel-pro-rpls-14thg-ag-na-hqprim-na-us-eng-16x9-video-thumbnail.png.rendition.intel.web.1920.1080.png",
    "https://assets2.razerzone.com/images/pnx.assets/7fb8deac5d3c73e360bc687ed62be6cf/gaming-laptops-og-image.webp",
    "https://images.unsplash.com/photo-1563549054059-bf4ebe2f49d5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://m-cdn.phonearena.com/images/article/64576-wide-two_1200/The-Best-Phones-to-buy-in-2024---our-top-10-list.jpg?1712577497",
    "https://static-cse.canva.com/blob/1143144/50insanelycreativeandstunningpackagingdesigns.ec1a2098.avif",
  ];

  return (
    <div className={` ${styles.categories} sm:px-8 xs:px-4`}>
      <div className="flex flex-wrap justify-center align-items-center  sm:gap-12 xs:gap-8">
        {data?.data?.map((el, index) => (
          <CategoryCard
            key={el._id}
            img={
              index < nonIntegratedImages.length
                ? nonIntegratedImages[index]
                : nonIntegratedImages[4]
            }
            name={el.name}
            desc={el.description}
            quantity={el.productsNum}
          />
        ))}
      </div>
    </div>
  );
}
