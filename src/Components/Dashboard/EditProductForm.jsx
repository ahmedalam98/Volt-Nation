import { useForm } from "react-hook-form";

const EditProductForm = ({ product, onSubmit, onCancel, handleFileChange }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const excludedFields = [
    "_id",
    "id",
    "reviews",
    "quantity",
    "rating",
    "salesNum",
    "images",
    "__v",
  ];

  const productProperties = Object.keys(product).filter(
    (property) => !excludedFields.includes(property)
  );

  return (
    <>
      <div className="p-4">
        <h2 className="text-4xl mb-10 border-s-4 border-[var(--color-var1)] ps-4">
          Edit Product
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="md:w-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.2fr] gap-6 place-items-center">
            <div className="flex flex-col justify-between h-full ">
              <div className="mt-1">
                <label className="mb-2 capitalize block">Product Images</label>

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
                  {product.images.map((img, index) => (
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

            <div className="grid grid-cols-2 gap-x-10 gap-y-5">
              {productProperties.map((property) => (
                <div key={property} className="flex flex-col w-[400px]">
                  <label className="capitalize mb-2">
                    {property.replace(/([a-z])([A-Z])/g, "$1 $2")}
                  </label>

                  {property === "description" || property === "features" ? (
                    <textarea
                      defaultValue={product[property]}
                      {...register(property, {
                        required: property === "description",
                      })}
                      className="rounded-lg py-2 px-4 outline-none bg-[var(--color-var2)] border-2 border-[var(--color-var1)] text-white w-[250px] md:w-auto"
                      style={{ height: 80 }}
                    />
                  ) : (
                    <input
                      type="text"
                      defaultValue={product[property]}
                      {...register(property, {
                        required:
                          property === "name" || property === "category",
                      })}
                      className="rounded-lg py-2 px-4 outline-none bg-[var(--color-var2)] border-2 border-[var(--color-var1)] text-white w-[250px] md:w-auto"
                    />
                  )}

                  {errors[property] && (
                    <span className="text-red-500 mt-2">Required</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProductForm;
