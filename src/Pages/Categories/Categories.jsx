import { useQuery } from "react-query";
import CategoryCard from "../../Components/CategoryCard/CategoryCard.jsx";
import styles from "./Categories.module.css";
import { getCategories } from "../../api/apiFunctions.js";
export default function Categories() {
  const { data } = useQuery("categories", getCategories);

  return (
    <div className={` ${styles.categories} px-8`}>
      <div className="flex flex-wrap justify-center align-items-center gap-12">
        {data?.data?.map((el) => (
          <CategoryCard
            key={el._id}
            img={el.imgs[0]}
            name={el.name}
            desc={el.description}
            quantity={el.productsNum}
          />
        ))}
      </div>
    </div>
  );
}
