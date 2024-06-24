import React, { useState, useEffect } from "react";
import DeleteModal from "./DeleteModal.jsx";

const EditCategory = ({ category = {}, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    img: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
        img: category.imgs ? category.imgs[0] : "",
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

    console.log("Form submitted:", updatedCategory);
    onCancel();
  };

  const handleDelete = () => {
    console.log("Category deleted:", category._id);
    setIsModalOpen(false);
    onCancel();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
            Save
          </button>

          {category && category._id && (
            <button
              type="button"
              onClick={handleOpenModal}
              className="px-4 py-2 border-red-600 bg-red-600 hover:bg-red-800 hover:border-red-800 duration-300 text-white rounded-md"
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

      {isModalOpen && (
        <DeleteModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleDelete}
          title="Confirm Deletion"
          description="Are you sure you want to delete this category?"
          setModalConfirmed={(value) => setIsModalOpen(!value)}
        />
      )}
    </div>
  );
};

export default EditCategory;
