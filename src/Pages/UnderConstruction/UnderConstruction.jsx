import { useNavigate } from "react-router-dom";
import styles from "./UnderContruction.module.css";
function UnderConstruction() {
  let navigate = useNavigate();
  let goToHome = () => {
    navigate("/");
  };
  let goToPrds = () => {
    navigate("/products");
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.img}>
          <img src="/work-in-progress.png" alt="work in progresss" />
        </div>
        <div className={styles.header}>
          <p className={styles.p}>THIS PAGE IS UNDER CONSTRUCTION</p>
          <p className={styles.p2}>
            While this page is under development, we encourage you to explore
            our other active pages
          </p>
        </div>
        <div className={styles.iconsContainer}>
          <div className={styles.icon} onClick={goToHome}>
            <img src="/web-page.png" alt="home page icon" />
            <p>Explore Home</p>
          </div>
          <div className={styles.icon} onClick={goToPrds}>
            <img src="/web-page.png" alt="products page icon" />
            <p>Explore Products</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default UnderConstruction;
