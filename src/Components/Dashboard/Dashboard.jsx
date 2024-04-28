import { useState, useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar.jsx";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [isToggleAllowed, setIsToggleAllowed] = useState(true); // Determine if toggling is allowed

  // Set sidebar state based on window width
  const handleResize = () => {
    const width = window.innerWidth;
    const isOpen = width >= 660;
    setIsSideBarOpen(isOpen);
    setIsToggleAllowed(width >= 660); // Only allow toggling when screen width is >= 660px
  };

  useLayoutEffect(() => {
    // Set initial state based on window width
    handleResize();

    // Add event listener for window resizing
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to run only once when the component mounts

  // Toggle the sidebar if allowed
  const toggleSideBar = () => {
    if (isToggleAllowed) {
      setIsSideBarOpen((prev) => !prev);
    }
  };

  // Calculate the content width based on whether the sidebar is open or closed
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
