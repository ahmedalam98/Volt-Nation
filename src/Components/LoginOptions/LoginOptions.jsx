import { Button } from "@mui/material";
import styles from "./LoginOptions.module.css";
import { Link } from "react-router-dom";
function LoginOptions() {
  return (
    <div>
      <div className={styles.conOfOptions}>
        <div className="google mx-3 my-2">
          <Button className={styles.Button}>
            <img src="public/imgs/facebook-icon.png" className={styles.icon} />
           Login With Facebook
          </Button>
        </div>
        <div className="facebook my-2">
          <Button className={styles.Button} style={{width:'100%'}}>
            <img src="public/imgs/google-icon.png" className={styles.icon} />
            Login With Facebook
          </Button>
        </div>
      </div>
      <div style={{ marginTop: "2%", textAlign: "center" }}>
        <small>
          <Link to="/sign-up">Do Not Have An Accoun ?! SIGN UP </Link>
        </small>
      </div>
    </div>
  );
}

export default LoginOptions;
