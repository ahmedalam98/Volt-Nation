import Hero from "../../Components/Hero/Hero.jsx";
// import GridGallery from "../../Components/HomeGallery/GridGallery/GridGallery.jsx";
// import Pulse from "../../Components/Pulse/Pulse.jsx";
// import Offers from "../../Components/Offers/Offers.jsx";
// import BestSellers from "../../Components/BestSellers/BestSellers.jsx";
import { useEffect, useRef, lazy, Suspense } from "react";
import "./Home.css";

const GridGallery = lazy(
  () => import("../../Components/HomeGallery/GridGallery/GridGallery.jsx")
);
const Pulse = lazy(() => import("../../Components/Pulse/Pulse.jsx"));
const Offers = lazy(() => import("../../Components/Offers/Offers.jsx"));
const BestSellers = lazy(
  () => import("../../Components/BestSellers/BestSellers.jsx")
);

const animatedSections = [
  { id: "section-1", component: <GridGallery /> },
  { id: "section-2", component: <BestSellers /> },
  { id: "section-3", component: <Pulse /> },
  { id: "section-4", component: <Offers /> },
];

const Home = () => {
  const isScrolled = useRef({});
  console.log(isScrolled.current);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isScrolled.current[entry.target.id] = true;
            entry.target.classList.add("in-view");
            sectionObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll('section[id^="section-"]');

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        sectionObserver.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <Hero />

      {animatedSections.map((section) => (
        <section
          key={section.id}
          className={`${isScrolled.current[section.id] ? "in-view" : "fade-in-bottom"}`}
          id={section.id}
        >
          <Suspense
            fallback={<div className=" text-yellow-400">Loading...</div>}
          >
            {section.component}
          </Suspense>
        </section>
      ))}
    </>
  );
};

export default Home;
