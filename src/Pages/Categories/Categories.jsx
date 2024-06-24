import { useQuery } from "react-query";
import CategoryCard from "../../Components/CategoryCard/CategoryCard.jsx";
import styles from "./Categories.module.css";
import { getCategories, getProducts } from "../../api/apiFunctions.js";
export default function Categories() {
  const catg = [
    {
      img: "laptops.png",
      name: "Laptops",
      desc: "encompass various types of computers tailored for specific needs, including workstations for professional tasks and gaming desktops optimized for high-performance gaming experiences.",
      quantity: "30",
    },
    {
      img: "chair.jpg",
      name: "Accessories",
      desc: "encompass various types of computers tailored for specific needs, including workstations for professional tasks and gaming desktops optimized for high-performance gaming experiences.",
      quantity: "20",
    },
    {
      img: "desktops.jpeg",
      name: "Desktops",
      desc: "encompass various types of computers tailored for specific needs, including workstations for professional tasks and gaming desktops optimized for high-performance gaming experiences.",
      quantity: "30",
    },
    {
      img: "headphone.jpg",
      name: "Headphone",
      desc: "encompass various types of computers tailored for specific needs, including workstations for professional tasks and gaming desktops optimized for high-performance gaming experiences.",
      quantity: "20",
    },
    {
      img: "smartphone.jpg",
      name: "SmartPhones",
      desc: "encompass various types of computers tailored for specific needs, including workstations for professional tasks and gaming desktops optimized for high-performance gaming experiences.",
      quantity: "20",
    },
  ];

  const { data, error, isLoading } = useQuery("categories", getCategories);

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
