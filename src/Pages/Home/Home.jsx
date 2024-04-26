import Hero from "../../Components/Hero/Hero.jsx";
import GridGallery from "../../Components/HomeGallery/GridGallery/GridGallery.jsx";
import Pulse from "../../Components/Pulse/Pulse.jsx";
import Offers from "../../Components/Offers/Offers.jsx";

const Home = () => {
  return (
    <>
      <Hero />
      <GridGallery />
      <Pulse />
      <Offers />
    </>
  );
};

export default Home;
