import { Button } from "@mui/material";
import styles from "./SignUpOptions.module.css";
import { Link } from "react-router-dom";

function SignUpOptions() {
  return (
    <>
      <div className={styles.conOfOptions}>
        <div className="google mx-3 my-2">
          <Button className={styles.Button}>
            <img src="6.png" alt="google" className={styles.icon} />
            Sign Up With Google
          </Button>
        </div>
        
      </div>
      <div style={{ marginTop: "2%", textAlign: "center" }}>
        <Link to="/login" className="text-sm">
          Allready Have An Accoun ?! LOG IN{" "}
        </Link>
      </div>
    </>
  );
}

export default SignUpOptions;
