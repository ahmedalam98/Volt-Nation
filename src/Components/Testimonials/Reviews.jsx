import Review from "./Review.jsx";

const reviews = [
  {
    name: "Sophia Rodriguez",
    image:
      "https://images.unsplash.com/photo-1595897952944-878f3abafb5a?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4,
    bgColor: "#f5f5f5",
    fColor: "#666",
    nColor: "#1b1b1b",
    review:
      "Highly recommend this website! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non mattis dui, sit amet hendrerit nibh. Duis congue volutpat urna ut accumsan...",
  },
  {
    name: "Thom Holmes",
    image:
      "https://images.unsplash.com/photo-1514501259756-f4b6fbeffa67?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
    bgColor: "var(--color-var3)",
    fColor: "#fff",
    nColor: "#f5f5f5",
    review:
      "Far exceeded expectations! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non mattis dui, sit amet hendrerit nibh. Duis congue volutpat urna ut accumsan. Nulla facilisi.",
  },
  {
    name: "Olivia Carter",
    image:
      "https://images.unsplash.com/photo-1484186139897-d5fc6b908812?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4,
    bgColor: "#f5f5f5",
    fColor: "#666",
    nColor: "#1b1b1b",
    review:
      "Incredible service and products! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non mattis dui, sit amet hendrerit nibh. Duis congue volutpat urna ut accumsan. Nulla facilisi",
  },
];

export default function Reviews() {
  return (
    <div>
      <div className="text-center">
        <h1
          className=" mt-10 text-center text-[34px] flex flex-col items-center justify-center font-bold "
          style={{ fontFamily: "Roboto" }}
        >
          ULTIMATE DEVICES
          <hr className="relative my-10 text-center w-80 " />
          <img
            width={50}
            src="https://cdn-icons-png.flaticon.com/512/2013/2013665.png"
            alt="reviwes icon"
            className="absolute mt-5"
          />
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-8 h-3/4 ">
          {reviews.map((review) => (
            <div key={review.name}>
              <Review {...review} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
