import { Button } from "@mui/material";
import styles from "./SignUpOptions.module.css";


function SignUpOptions() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div className="google mx-3">
          <Button className={styles.Button}>
            <img src='public/imgs/facebook-icon.png' className={styles.icon}/>
            Sign Up With Facebook
          </Button>
        </div>
        <div className="facebook">
          <Button className={styles.Button}>
          <img src='public/imgs/google-icon.png' className={styles.icon}/>
            Sign Up With Facebook
          </Button>
        </div>
      </div>
    </>
  );
}

export default SignUpOptions;
