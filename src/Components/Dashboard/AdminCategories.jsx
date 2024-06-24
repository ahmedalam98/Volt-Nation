import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { getCategories } from "../../api/apiFunctions";
import { useQuery } from "react-query";
import EditCategory from "./EditCategory.jsx";

const AdminCategories = () => {
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
            {data.data.map((category, index) => (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => handleEditCategory(category)}
              >
                <div className="flex flex-col items-center gap-4 bg-[var(--color-var3)] pb-4 rounded-lg w-[24rem] md:w-[18rem] lg:w-[21rem] mx-auto lg:mx-0">
                  <img
                    src={category.imgs[0]}
                    alt={category.name}
                    className="w-full h-44 object-cover rounded-t-lg"
                  />
                  <h2 className="text-2xl text-white tracking-wide">
                    {category.name} ({category.productsNum})
                  </h2>
                </div>
              </div>
            ))}

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
