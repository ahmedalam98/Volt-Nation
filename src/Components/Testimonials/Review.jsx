import { Rating } from "@mui/material";

export default function Review({
  bgColor,
  review,
  rating,
  image,
  name,
  fColor,
  nColor,
}) {
  return (
    <div className="flex justify-around ">
      <div
        className=" w-[470px] h-[500px] flex  justify-center "
        style={{ backgroundColor: bgColor }}
      >
        <div className="w-[270px]  flex  items-center relative flex-col  ">
          <div className="absolute text-[210px] text-Blue-600 opacity-[0.5] font-serif mt-[-150px] ">
            ,,
          </div>
          <p
            className="leading-relaxed font-sans text-lg text-center  mt-[115px] text-[17px] mb-5 font-normal  "
            style={{ color: fColor }}
          >
            {review.slice(0, 150) + "..."}
          </p>
          <Rating
            name="read-only"
            value={rating}
            readOnly
            style={{ opacity: 0.6, fontSize: "1.8rem" }}
          />
          <div className="flex flex-col items-center">
            <img
              src={image}
              alt="reviewr"
              className="rounded-[50%] h-[70px] w-[70px] mt-5"
            />
            <p
              className="mt-3 font-semibold text-[16px] "
              style={{ color: nColor }}
            >
              {name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
