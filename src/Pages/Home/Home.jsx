import { Typography } from "@mui/material";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
      {/* Test Tailwind & MUI */}
      <Typography variant="h1" className="font-bold underline">
        Volt Nation
      </Typography>

      <p className={styles.paragraph}>Home Page</p>
    </>
  );
};

export default Home;
