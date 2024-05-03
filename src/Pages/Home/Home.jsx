import Hero from "../../Components/Hero/Hero.jsx";
import GridGallery from "../../Components/HomeGallery/GridGallery/GridGallery.jsx";
import Pulse from "../../Components/Pulse/Pulse.jsx";
import Offers from "../../Components/Offers/Offers.jsx";
import BestSellers from "../../Components/BestSellers/BestSellers.jsx";
import { useEffect, useRef, useState } from "react";
import "./Home.css";

const isMobile = () => window.innerWidth <= 660;

const Home = () => {
  const isScrolled = useRef({});
  const [mobile, setMobile] = useState(isMobile());
  const [sections, setAnimatedSections] = useState(
    mobile
      ? [
          { id: "section-2", component: <BestSellers /> },
          { id: "section-3", component: <Pulse /> },
          { id: "section-4", component: <Offers /> },
        ]
      : [
          { id: "section-1", component: <GridGallery /> },
          { id: "section-2", component: <BestSellers /> },
          { id: "section-3", component: <Pulse /> },
          { id: "section-4", component: <Offers /> },
        ]
  );

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = isMobile();
      setMobile(isMobileView);

      if (isMobileView) {
        setAnimatedSections([
          { id: "section-2", component: <BestSellers /> },
          { id: "section-3", component: <Pulse /> },
          { id: "section-4", component: <Offers /> },
        ]);
      } else {
        setAnimatedSections([
          { id: "section-1", component: <GridGallery /> },
          { id: "section-2", component: <BestSellers /> },
          { id: "section-3", component: <Pulse /> },
          { id: "section-4", component: <Offers /> },
        ]);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

    const sectionElements = document.querySelectorAll(
      'section[id^="section-"]'
    );
    sectionElements.forEach((section) => {
      sectionObserver.observe(section);
    });

    return () => {
      sectionElements.forEach((section) => {
        sectionObserver.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <Hero />

      {mobile && <GridGallery />}

      {sections.map((section) => (
        <section
          key={section.id}
          className={`${isScrolled.current[section.id] ? "in-view" : "fade-in-bottom"}`}
          id={section.id}
        >
          {section.component}
        </section>
      ))}
    </>
  );
};

export default Home;
