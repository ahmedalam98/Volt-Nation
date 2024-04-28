import { useState, useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar.jsx";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [isToggleAllowed, setIsToggleAllowed] = useState(true);

  // Set sidebar state based on window width
  const handleResize = () => {
    const width = window.innerWidth;
    const isOpen = width >= 660;
    setIsSideBarOpen(isOpen);
    setIsToggleAllowed(width >= 660);
  };

  useLayoutEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSideBar = () => {
    if (isToggleAllowed) {
      setIsSideBarOpen((prev) => !prev);
    }
  };

  const outletWidth = isSideBarOpen
    ? "calc(100% - 280px)"
    : "calc(100% - 80px)";

  return (
    <div>
      <SideBar
        isOpen={isSideBarOpen}
        onToggle={toggleSideBar}
        isToggleAllowed={isToggleAllowed}
      />

      <div
        className={styles.content}
        style={{ width: outletWidth, transition: "all 0.3s" }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
