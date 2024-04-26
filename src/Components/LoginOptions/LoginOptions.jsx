import { Button } from "@mui/material";
import styles from "./LoginOptions.module.css";
import { Link } from "react-router-dom";
function LoginOptions() {
  return (
    <div>
      <div className={styles.conOfOptions}>
        <div className="google mx-3 my-2">
          <Button className={styles.Button}>
            <img src="6.png" alt="google" className={styles.icon} />
            Login With Google
          </Button>
        </div>
        <div className="facebook my-2">
          <Button className={styles.Button} style={{ width: "100%" }}>
            <img src="5.png" alt="facebook" className={styles.icon} />
            Login With Facebook
          </Button>
        </div>
      </div>
      <div style={{ marginTop: "2%", textAlign: "center" }}>
        <Link className="text-sm" to="/sign-up">
          Do Not Have An Account ?! SIGN UP{" "}
        </Link>
      </div>
    </div>
  );
}

export default LoginOptions;
