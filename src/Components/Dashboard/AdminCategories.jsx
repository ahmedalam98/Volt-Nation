import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { getCategories } from "../../api/apiFunctions";
import { useQuery } from "react-query";
import EditCategory from "./EditCategory.jsx";

const AdminCategories = () => {
  const nonIntegratedImages = [
    "https://www.intel.com/content/dam/www/public/us/en/images/video-thumbnails/15s-vid-intel-pro-rpls-14thg-ag-na-hqprim-na-us-eng-16x9-video-thumbnail.png.rendition.intel.web.1920.1080.png",
    "https://assets2.razerzone.com/images/pnx.assets/7fb8deac5d3c73e360bc687ed62be6cf/gaming-laptops-og-image.webp",
    "https://images.unsplash.com/photo-1563549054059-bf4ebe2f49d5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://m-cdn.phonearena.com/images/article/64576-wide-two_1200/The-Best-Phones-to-buy-in-2024---our-top-10-list.jpg?1712577497",
    "https://static-cse.canva.com/blob/1143144/50insanelycreativeandstunningpackagingdesigns.ec1a2098.avif",
  ];

  const { data, isLoading } = useQuery("categories", getCategories);
  const [editing, setEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setEditing(true);
  };

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setSelectedCategory(null);
  };

  if (isLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!data?.data || data.data.length === 0) {
    return <p>No categories found.</p>;
  }

  return (
    <div className="p-4">
      <div className="max-w-7xl min-w-[500px] mx-auto">
        <h1 className="text-4xl border-s-4 border-[var(--color-var1)] ps-4 mb-10">
          Categories
        </h1>

        {editing ? (
          <EditCategory category={selectedCategory} onCancel={handleCancel} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {data.data.map((category, index) => {
              const imgSrc =
                index < nonIntegratedImages.length - 1
                  ? nonIntegratedImages[index]
                  : nonIntegratedImages[nonIntegratedImages.length - 1];
              return (
                <div
                  key={category._id}
                  className="cursor-pointer"
                  onClick={() => handleEditCategory(category)}
                >
                  <div className="flex flex-col items-center gap-4 bg-[var(--color-var3)] pb-4 rounded-lg w-[24rem] md:w-[18rem] lg:w-[21rem] mx-auto lg:mx-0">
                    <img
                      src={imgSrc}
                      alt={category.name}
                      className="w-full h-44 object-cover rounded-t-lg"
                    />
                    <h2 className="text-2xl text-white tracking-wide">
                      {category.name} ({category.productsNum})
                    </h2>
                  </div>
                </div>
              );
            })}

            <div
              onClick={handleAddCategory}
              className="flex flex-col items-center justify-center gap-4 p-4 rounded-lg cursor-pointer w-[24rem] md:w-[18rem] lg:w-[19rem] mx-auto lg:mx-0"
            >
              <AddIcon className="text-white" sx={{ fontSize: 140 }} />
              <h2 className="text-2xl text-white tracking-wide">
                Add Category
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCategories;
