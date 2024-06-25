import React, { useState, useEffect } from "react";
import { useQueryClient } from "react-query";

const EditCategory = ({ category = {}, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    // img: null,
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
        // img: null,
      });
    }
  }, [category]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("description", formData.description);
    // if (formData.img) {
    //   formDataToSubmit.append("img", formData.img);
    // }

    const apiUrl =
      category && category._id
        ? `https://volt-nation.up.railway.app/category/update/${category._id}`
        : "https://volt-nation.up.railway.app/category/add";

    try {
      const response = await fetch(apiUrl, {
        method: category && category._id ? "PATCH" : "POST",
        body: formDataToSubmit,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      queryClient.invalidateQueries("categories");

      const data = await response.json();
      // console.log("Category updated/added successfully:", data);
      onCancel();
    } catch (error) {
      console.error("Error updating/adding category:", error);
    }
  };

  const handleDelete = async () => {
    console.log("Deleting category:", category._id);
    const deleteUrl = `https://volt-nation.up.railway.app/category/delete/${category._id}`;

    try {
      const response = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // console.log("Category deleted successfully:", data);

      // Invalidate and refetch categories
      queryClient.invalidateQueries("categories");

      onCancel();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="p-4 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-white mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="rounded-lg py-2 px-4 outline-none bg-[var(--color-var2)] border-2 border-[var(--color-var1)] text-white w-[250px] md:w-[25%]"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-white mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="rounded-lg py-2 px-4 outline-none bg-[var(--color-var2)] border-2 border-[var(--color-var1)] text-white w-[60%] h-[150px] md:w-[50%]"
            required
          />
        </div>

        <div className="flex gap-10 mt-10">
          <button
            type="submit"
            className="px-4 py-2 border-blue-600 bg-blue-600 hover:bg-blue-800 hover:border-blue-800 duration-300 text-white rounded-md"
          >
            {category && category._id ? "Update" : "Save"}
          </button>

          {category && category._id && (
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 border-red-500 bg-red-500 hover:bg-red-700 hover:border-red-700 duration-300 text-white rounded-md"
            >
              Delete
            </button>
          )}

          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border-gray-600 bg-gray-600 hover:bg-gray-800 hover:border-gray-800 duration-300 text-white rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
