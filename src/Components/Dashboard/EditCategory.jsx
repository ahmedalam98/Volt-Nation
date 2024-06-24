import React, { useState, useEffect } from "react";

const EditCategory = ({ category, onUpdate, onDelete, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    img: "",
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description,
        img: category.imgs[0],
      });
    } else {
      setFormData({
        name: "",
        description: "",
        img: "",
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedCategory = {
      name: formData.name,
      description: formData.description,
      imgs: [formData.img],
    };

    onUpdate(category._id, updatedCategory);
    console.log("Form submitted:", updatedCategory);
  };

  const handleDelete = () => {
    onDelete(category._id);
    console.log("Category deleted:", category._id);
  };

  const handleCancel = () => {
    onCancel();
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
            className="rounded-lg py-2 px-4 outline-none bg-[var(--color-var2)] border-2 border-[var(--color-var1)] text-white w-[450px] h-[150px] md:w-[50%]"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="img"
            className="block text-sm font-medium text-white mb-2"
          >
            Image URL
          </label>
          <input
            type="text"
            id="img"
            name="img"
            value={formData.img}
            onChange={handleChange}
            className="rounded-lg py-2 px-4 outline-none bg-[var(--color-var2)] border-2 border-[var(--color-var1)] text-white w-[250px] md:w-[50%]"
            required
          />
        </div>

        <div className="flex gap-10 mt-10">
          <button
            type="submit"
            className="px-4 py-2 border-blue-600 bg-blue-600 hover:bg-blue-800 hover:border-blue-800 duration-300 text-white rounded-md"
          >
            Update
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 border-red-600 bg-red-600 hover:bg-red-800 hover:border-red-800 duration-300 text-white rounded-md"
          >
            Delete
          </button>

          <button
            type="button"
            onClick={handleCancel}
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
