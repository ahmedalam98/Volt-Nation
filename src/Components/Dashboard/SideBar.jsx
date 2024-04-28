import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faCogs,
  faTable,
  faList,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Dashboard.module.css";

const links = [
  { to: "/dashboard", icon: faUser, text: "Overview" },
  { to: "/dashboard/products", icon: faCogs, text: "Products" },
  { to: "/dashboard/categories", icon: faTable, text: "Categories" },
  { to: "/dashboard/orders", icon: faList, text: "Orders" },
];

const SideBar = ({ isOpen, onToggle }) => {
  const handleTrigger = () => {
    onToggle();
  };

  return (
    <div className={styles.page}>
      <div className={`${styles.sidebar} ${isOpen ? styles.sideOpen : ""}`}>
        <div className={styles.trigger} onClick={handleTrigger}>
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </div>

        {links.map((link) => (
          <Link to={link.to} key={link.text}>
            <div className={styles.sidePosition}>
              <FontAwesomeIcon icon={link.icon} />
              <span>{link.text}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
