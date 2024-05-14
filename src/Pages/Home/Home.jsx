import Hero from "../../Components/Hero/Hero.jsx";
import GridGallery from "../../Components/HomeGallery/GridGallery/GridGallery.jsx";
import { useEffect, useRef, useState, lazy } from "react";
import "./Home.css";

const Pulse = lazy(() => import("../../Components/Pulse/Pulse.jsx"));
const Offers = lazy(() => import("../../Components/Offers/Offers.jsx"));
const BestSellers = lazy(
  () => import("../../Components/BestSellers/BestSellers.jsx")
);

const isMobile = () => window.innerWidth <= 660;

const Home = () => {
  // const Token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzU5ZTJhNTUwZmYzNjg1NTkwNWZhYSIsImlzQWRtaW4iOiJ1c2VyIiwiaWF0IjoxNzE0NzkwNjU4LCJleHAiOjE3MTQ4NzcwNTh9.q9jDJDp5ZLlVjMQI5ZcVp2IFnP1F50H2bNT8brszLa4";

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
    // localStorage.setItem("token", Token);

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
