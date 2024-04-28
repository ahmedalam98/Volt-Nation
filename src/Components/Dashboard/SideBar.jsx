import { Link, useNavigate } from "react-router-dom";
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
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Dashboard.module.css";

const links = [
  { to: "/dashboard", icon: faChartColumn, text: "Overview" },
  { to: "/dashboard/products", icon: faLaptopCode, text: "Products" },
  { to: "/dashboard/categories", icon: faList, text: "Categories" },
  { to: "/dashboard/orders", icon: faTruckFast, text: "Orders" },
  { to: "/dashboard/admins", icon: faUsers, text: "Admins" },
];

const SideBar = ({ isOpen, onToggle, isToggleAllowed }) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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

        {links.map((link) => (
          <Link to={link.to} key={link.text}>
            <div className={styles.sidePosition}>
              <FontAwesomeIcon icon={link.icon} />
              <span className="tracking-wide">{link.text}</span>
            </div>
          </Link>
        ))}

        <div className={styles.sidePosition} onClick={handleLogOut}>
          <FontAwesomeIcon icon={faDoorOpen} />
          <span className="tracking-wide">Log out</span>
        </div>
      </div>

      <div
        className={`flex flex-col justify-center items-center text-4xl gap-4 absolute left-8 bottom-16 text-white transition-opacity duration-300 tracking-wider ${
          !isOpen ? "opacity-0 delay-75" : "opacity-100"
        }`}
      >
        <div className={styles.thunder}></div>
        <p>VoltNation</p>
      </div>
    </div>
  );
};

export default SideBar;
