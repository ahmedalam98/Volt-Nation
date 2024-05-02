import AddIcon from "@mui/icons-material/Add";

const categories = [
  {
    name: "Smart Phones",
    img: "https://m-cdn.phonearena.com/images/article/64576-wide-two_1200/The-Best-Phones-to-buy-in-2024---our-top-10-list.jpg?1712577497",
  },
  {
    name: "Laptops",
    img: "https://assets2.razerzone.com/images/pnx.assets/7fb8deac5d3c73e360bc687ed62be6cf/gaming-laptops-og-image.webp",
  },
  {
    name: "Desktops",
    img: "https://www.intel.com/content/dam/www/public/us/en/images/video-thumbnails/15s-vid-intel-pro-rpls-14thg-ag-na-hqprim-na-us-eng-16x9-video-thumbnail.png.rendition.intel.web.1920.1080.png",
  },
  {
    name: "Accessories",
    img: "https://m.media-amazon.com/images/I/71ZgJvkP0tL._AC_SL1500_.jpg",
  },
  {
    name: "Chairs",
    img: "https://kaleidoscope.scene7.com/is/image/OttoUK/600w/X-Rocker-Maverick-Ergonomic-Office-Gaming-Chair---Black-Blue~25W613FRSP.jpg",
  },
];

const AdminCategories = () => {
  return (
    <div className="p-4">
      <div className="max-w-7xl min-w-[500px] mx-auto">
        <h1 className="text-4xl border-s-4 border-[var(--color-var1)] ps-4 mb-10">
          Categories
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-4 gap-x-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-4 bg-[var(--color-var3)] p-4 rounded-lg w-[24rem] md:w-[18rem] lg:w-[21rem] mx-auto"
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

          <div className="flex flex-col items-center justify-center gap-4 bg-[var(--color-var3)] p-4 rounded-lg cursor-pointer w-[24rem] md:w-[18rem] lg:w-[21rem] mx-auto">
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
