import Hero from "../../Components/Hero/Hero.jsx";
import GridGallery from "../../Components/HomeGallery/GridGallery/GridGallery.jsx";
import Pulse from "../../Components/Pulse/Pulse.jsx";
import Offers from "../../Components/Offers/Offers.jsx";
import { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsScrolled(true);
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

      <section
        className={`${isScrolled["section-1"] ? "in-view" : "fade-in-bottom"}`}
        id="section-1"
      >
        <GridGallery />
      </section>

      <section
        className={`${isScrolled["section-2"] ? "in-view" : "fade-in-bottom"}`}
        id="section-2"
      >
        <Pulse />
      </section>

      <section
        className={`${isScrolled["section-3"] ? "in-view" : "fade-in-bottom"}`}
        id="section-3"
      >
        <Offers />
      </section>
    </>
  );
};

export default Home;
