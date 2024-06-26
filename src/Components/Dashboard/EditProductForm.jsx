import { useState } from "react";
import { useForm } from "react-hook-form";
import { getCategories } from "../../api/apiFunctions";
import { useQuery, useQueryClient } from "react-query";

const EditProductForm = ({ product, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery("categories", getCategories);

  const [features, setFeatures] = useState(product.features || []);
  const [colors, setColors] = useState(product.colors || []);

  const excludedFields = [
    "_id",
    "id",
    "reviews",
    "rating",
    "rate",
    "salesNum",
    "images",
    "releasedDate",
    "oldPrice",
    "__v",
  ];

  const productProperties = Object.keys(product).filter(
    (property) => !excludedFields.includes(property)
  );

  const handleAddFeature = () => {
    setFeatures([...features, ""]);
  };

  const handleRemoveFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const handleAddColor = () => {
    setColors([...colors, ""]);
  };

  const handleRemoveColor = (index) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const handleColorChange = (index, value) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
  };

  const handleFormSubmit = async (data) => {
    const finalData = {
      ...data,
      features,
      colors,
    };

    const isNewProduct = !product._id;

    const url = isNewProduct
      ? "https://volt-nation.up.railway.app/products/add"
      : `https://volt-nation.up.railway.app/products/update/${product._id}`;

    const method = isNewProduct ? "POST" : "PATCH";

    console.log(`Submitting to ${url} with method ${method}`);

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      if (!response.ok) {
        throw new Error(
          isNewProduct ? "Failed to add product." : "Failed to update product."
        );
      }
      await queryClient.invalidateQueries("products");
      await queryClient.invalidateQueries("categories");
      onSubmit();
    } catch (error) {
      console.error(
        isNewProduct ? "Error adding product:" : "Error updating product:",
        error
      );
    }
  };

  return (
    <div className="p-4">
      <div className="w-full md:w-auto">
        <h2 className="text-4xl mb-10 border-s-4 border-[var(--color-var1)] ps-4">
          {product._id ? "Edit Product" : "Add Product"}
        </h2>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="w-full md:w-[80%] mx-auto"
        >
          <div className="grid place-items-center grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-5">
            {productProperties
              .filter(
                (property) => property !== "features" && property !== "colors"
              )
              .map((property) => (
                <div
                  key={property}
                  className="flex flex-col w-full md:w-[400px]"
                >
                  <label className="capitalize mb-2">
                    {property.replace(/([a-z])([A-Z])/g, "$1 $2")}
                  </label>

                  {property === "description" ? (
                    <textarea
                      defaultValue={product[property]}
                      {...register(property, { required: true })}
                      className="rounded-lg py-2 px-4 outline-none bg-[var(--color-var2)] border-2 border-[var(--color-var1)] text-white w-3/4 md:w-[250px]"
                      style={{ height: 80 }}
                    />
                  ) : property === "category" ? (
                    isLoading ? (
                      <p>Loading categories...</p>
                    ) : (
                      <select
                        defaultValue={product[property]}
                        {...register(property, { required: true })}
                        className="rounded-lg py-2 px-4 outline-none bg-[var(--color-var2)] border-2 border-[var(--color-var1)] text-white w-3/4 md:w-[250px]"
                      >
                        {data &&
                          data.data.map((category) => (
                            <option key={category._id} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                      </select>
                    )
                  ) : property === "price" || property === "quantity" ? (
                    <input
                      type="number"
                      defaultValue={product[property]}
                      {...register(property, {
                        required: property !== "category",
                      })}
                      className="rounded-lg py-2 px-4 outline-none bg-[var(--color-var2)] border-2 border-[var(--color-var1)] text-white w-3/4 md:w-[250px]"
                    />
                  ) : (
                    <input
                      type="text"
                      defaultValue={product[property]}
                      {...register(property, {
                        required: property !== "category",
                      })}
                      className="rounded-lg py-2 px-4 outline-none bg-[var(--color-var2)] border-2 border-[var(--color-var1)] text-white w-3/4 md:w-[250px]"
                    />
                  )}

                  {errors[property] && (
                    <span className="text-red-500 mt-2">Required Field</span>
                  )}
                </div>
              ))}

            {/* Features */}
            <div className="flex flex-col w-full md:w-[400px]">
              <label className="capitalize mb-2">Features</label>
              {features.map((feature, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="rounded-lg py-2 px-4 outline-none bg-[var(--color-var2)] border-2 border-[var(--color-var1)] text-white w-full md:w-[250px]"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="ml-2 bg-red-500 hover:bg-red-800 duration-300 text-white p-2 rounded"
                  >
                    X
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddFeature}
                className="mt-2 bg-blue-500 hover:bg-blue-700 duration-300 text-white px-4 py-2 rounded w-1/2 md:w-[250px] self-center md:self-auto"
              >
                Add Feature
              </button>
            </div>

            {/* Colors */}
            <div className="flex flex-col w-full md:w-[400px]">
              <label className="capitalize mb-2">Colors</label>
              {colors.map((color, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => handleColorChange(index, e.target.value)}
                    className="rounded-lg py-2 px-4 outline-none bg-[var(--color-var2)] border-2 border-[var(--color-var1)] text-white w-full md:w-[250px]"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveColor(index)}
                    className="ml-2 bg-red-500 hover:bg-red-800 duration-300 text-white p-2 rounded"
                  >
                    X
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddColor}
                className="mt-2 bg-blue-500 hover:bg-blue-700 duration-300 text-white px-4 py-2 rounded w-1/2 md:w-[250px] self-center md:self-auto"
              >
                Add Color
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-12">
            <button
              type="submit"
              className="text-xl border-blue-600 bg-blue-600 hover:bg-blue-800 hover:border-blue-800 duration-300 text-white px-4 py-2 rounded h-8 w-1/2 md:w-[100px]"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="text-xl border-gray-600 bg-gray-600 hover:bg-gray-800 hover:border-gray-800 duration-300 text-white px-4 py-2 rounded h-8 w-1/2 md:w-[100px]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
