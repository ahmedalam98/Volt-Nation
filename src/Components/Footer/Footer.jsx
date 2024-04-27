import FooterFirstColumn from "./FooterFirstColumn.jsx";
import FooterSecondColumn from "./FooterSecondColumn.jsx";
import FooterSubscribe from "./FooterSubscribe.jsx";

export default function Footer() {
  return (
    <div className="mt-20 md:mt-0">
      <div className="h-fit md:h-[320px] grid grid-cols-1 md:grid-cols-[1fr_1.25fr_2fr] lg:grid-cols-[1.5fr_1.5fr_2fr] gap-10 mt-10 text-white mx-12 mb-10 md:mb-0">
        <FooterFirstColumn />

        <FooterSecondColumn />

        <div className="ms-0 md:ms-20">
          <h3 className="text-xl font-bold mb-3 tracking-widest text-center md:text-start">
            OUR LOCATIONS
          </h3>

          <img src="/footer.jpg" alt="map" className=" rounded-xl" />
        </div>
      </div>

      <FooterSubscribe />
    </div>
  );
}
