import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartColumn,
  faLaptopCode,
  faList,
  faTruckFast,
  faBars,
  faUsers,
  faArrowLeft,
  faDoorOpen,
  faCrown,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Dashboard.module.css";

const links = [
  { to: "/dashboard", icon: faChartColumn, text: "Overview" },
  { to: "/dashboard/products", icon: faLaptopCode, text: "Products" },
  { to: "/dashboard/categories", icon: faList, text: "Categories" },
  { to: "/dashboard/orders", icon: faTruckFast, text: "Orders" },
  { to: "/dashboard/admins", icon: faUsers, text: "Admins" },
  { to: "/login", icon: faDoorOpen, text: "Log out" },
];

const SideBar = ({ isOpen, onToggle, isToggleAllowed }) => {
  const handleTrigger = () => {
    onToggle();
  };

  return (
    <div className={styles.page}>
      <div className={`${styles.sidebar} ${isOpen ? styles.sideOpen : ""}`}>
        {isToggleAllowed ? (
          <div className={styles.trigger} onClick={handleTrigger}>
            <FontAwesomeIcon icon={isOpen ? faArrowLeft : faBars} />
          </div>
        ) : null}

        <br />

        {links.map((link) => (
          <Link to={link.to} key={link.text}>
            <div className={styles.sidePosition}>
              <FontAwesomeIcon icon={link.icon} />
              <span>{link.text}</span>
            </div>
          </Link>
        ))}
      </div>

      <div
        className={` flex flex-col justify-center items-center text-4xl gap-4 absolute left-7 bottom-24 text-white transition-opacity duration-300 tracking-wider ${
          !isOpen ? "opacity-0 delay-75" : "opacity-100"
        }`}
      >
        <FontAwesomeIcon icon={faCrown} />
        <p>Admin</p>
        <p>Dashboard</p>
      </div>
    </div>
  );
};

export default SideBar;
