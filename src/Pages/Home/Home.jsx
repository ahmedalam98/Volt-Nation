import Hero from "../../Components/Hero/Hero.jsx";
import GridGallery from "../../Components/HomeGallery/GridGallery/GridGallery.jsx";
import Offers from "../../Components/Offers/Offers.jsx";

const Home = () => {
  return (
    <>
      <Hero />
      <GridGallery />
      {/* <div className="circle"></div> */}
      <Offers />
    </>
  );
};

export default Home;
