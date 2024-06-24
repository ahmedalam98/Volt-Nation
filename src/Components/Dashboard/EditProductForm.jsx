import { useState } from "react";
import { useForm } from "react-hook-form";
import { getCategories } from "../../api/apiFunctions";
import { useQuery } from "react-query";

const EditProductForm = ({ product, onSubmit, onCancel, handleFileChange }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    "__v",
  ];

  const productProperties = Object.keys(product).filter(
    (property) => !excludedFields.includes(property)
  );

  const productImages = product.images || [];

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

  const handleFormSubmit = (data) => {
    const finalData = {
      ...data,
      features,
      colors,
    };
    console.log(finalData);
    onSubmit(finalData);
  };

  return (
    <>
      <div className="p-4">
        <div className="w-full md:w-auto">
          <h2 className="text-4xl mb-10 border-s-4 border-[var(--color-var1)] ps-4">
            Edit Product
          </h2>

          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="w-full md:w-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 place-items-center">
              <div className="order-2 lg:order-1 flex flex-col h-full w-full md:w-auto">
                <div className="mt-1 mb-[8rem]">
                  <label className="mb-2 capitalize block">
                    Product Images
                  </label>

                  <div className="relative inline-block">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <button className="rounded-lg py-2 px-4 bg-[var(--color-var2)] border-2 border-[var(--color-var1)] text-white md:w-auto">
                      Choose Files
                    </button>
                  </div>

                  <div className="flex gap-4 mt-8 flex-wrap">
                    {productImages.map((img, index) => (
                      <div key={index} className="w-20 h-20">
                        <img
                          src={img}
                          alt={`Product ${index + 1}`}
                          className="object-cover w-full h-full rounded"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between md:items-center self-center">
                  <div className="flex gap-4 mt-12 md:mt-0 justify-center">
                    <button
                      type="submit"
                      className="text-xl border-blue-600 bg-blue-600 hover:bg-blue-800 hover:border-blue-800 duration-300 text-white px-4 py-2 rounded h-8 w-[100px]"
                    >
                      Save
                    </button>

                    <button
                      type="button"
                      onClick={onCancel}
                      className="text-xl border-gray-600 bg-gray-600 hover:bg-gray-800 hover:border-gray-800 duration-300 text-white px-4 py-2 rounded h-8 w-[100px]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-5">
                {productProperties
                  .filter(
                    (property) =>
                      property !== "features" && property !== "colors"
                  )
                  .map((property) => (
                    <div key={property} className="flex flex-col w-[400px]">
                      <label className="capitalize mb-2">
                        {property.replace(/([a-z])([A-Z])/g, "$1 $2")}
                      </label>

                      {property === "description" ? (
                        <textarea
                          defaultValue={product[property]}
                          {...register(property, { required: true })}
                          className="rounded-lg py-2 px-4 outline-none bg-[var(--color-var2)] border-2 border-[var(--color-var1)] text-white w-[250px] md:w-auto"
                          style={{ height: 80 }}
                        />
                      ) : property === "category" ? (
                        isLoading ? (
                          <p>Loading categories...</p>
                        ) : (
                          <select
                            defaultValue={product[property]}
                            {...register(property, { required: true })}
                            className="rounded-lg py-2 px-4 outline-none bg-[var(--color-var2)] border-2 border-[var(--color-var1)] text-white w-[250px] md:w-auto"
                          >
                            {data &&
                              data.data.map((category) => (
                                <option
                                  key={category._id}
                                  value={category.name}
                                >
                                  {category.name}
                                </option>
                              ))}
                          </select>
                        )
                      ) : property === "price" ? (
                        <input
                          type="number"
                          defaultValue={product[property]}
                          {...register(property, {
                            required: property !== "category",
                          })}
                          className="rounded-lg py-2 px-4 outline-none bg-[var(--color-var2)] border-2 border-[var(--color-var1)] text-white w-[250px] md:w-auto"
                        />
                      ) : (
                        <input
                          type="text"
                          defaultValue={product[property]}
                          {...register(property, {
                            required: property !== "category",
                          })}
                          className="rounded-lg py-2 px-4 outline-none bg-[var(--color-var2)] border-2 border-[var(--color-var1)] text-white w-[250px] md:w-auto"
                        />
                      )}

                      {errors[property] && (
                        <span className="text-red-500 mt-2">
                          Required Field
                        </span>
                      )}
                    </div>
                  ))}
                {/* Features */}
                <div className="flex flex-col w-[400px]">
                  <label className="capitalize mb-2">Features</label>
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) =>
                          handleFeatureChange(index, e.target.value)
                        }
                        className="rounded-lg py-2 px-4 outline-none bg-[var(--color-var2)] border-2 border-[var(--color-var1)] text-white w-[250px] md:w-auto"
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
                    className="mt-2 bg-blue-500 hover:bg-blue-800 duration-300 text-white px-4 py-2 rounded w-1/2 lg:w-[90%]"
                  >
                    Add Feature
                  </button>
                </div>
                {/* Colors */}
                <div className="flex flex-col w-[400px]">
                  <label className="capitalize mb-2">Colors</label>
                  {colors.map((color, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="text"
                        value={color}
                        onChange={(e) =>
                          handleColorChange(index, e.target.value)
                        }
                        className="rounded-lg py-2 px-4 outline-none bg-[var(--color-var2)] border-2 border-[var(--color-var1)] text-white w-[250px] md:w-auto"
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
                    className="mt-2 bg-blue-500 hover:bg-blue-800 duration-300 text-white px-4 py-2 rounded w-1/2 lg:w-[90%]"
                  >
                    Add Color
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProductForm;
