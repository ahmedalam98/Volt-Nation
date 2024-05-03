import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar.jsx";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen((prev) => !prev);
  };

  const outletWidth = isSideBarOpen
    ? "calc(100% - 280px)"
    : "calc(100% - 80px)";

  return (
    <div>
      <SideBar isOpen={isSideBarOpen} onToggle={toggleSideBar} />

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
