import AddIcon from "@mui/icons-material/Add";
import { categories } from "./Dummy/categories";

const AdminCategories = () => {
  return (
    <div className="p-4">
      <div className="max-w-7xl min-w-[500px] mx-auto">
        <h1 className="text-4xl border-s-4 border-[var(--color-var1)] ps-4 mb-10">
          Categories
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-4 bg-[var(--color-var3)] p-4 rounded-lg w-[24rem] md:w-[18rem] lg:w-[21rem] mx-auto lg:mx-0"
            >
              <img
                src={category.img}
                alt={category.name}
                className="w-52 h-52 object-cover rounded-full"
              />

              <h2 className="text-2xl text-white tracking-wide">
                {category.name}
              </h2>
            </div>
          ))}

          <div className="flex flex-col items-center justify-center gap-4 bg-[var(--color-var3)] p-4 rounded-lg cursor-pointer w-[24rem] md:w-[18rem] lg:w-[21rem] mx-auto lg:mx-0">
            <AddIcon className="text-slate-300" sx={{ fontSize: 200 }} />

            <h2 className="text-2xl text-slate-200 tracking-wide">
              Add Category
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
