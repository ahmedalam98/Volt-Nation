import { Button } from "@mui/material";
import styles from "./SignUpOptions.module.css";


function SignUpOptions() {
  return (
    <>
      <div
       className={styles.conOfOptions}
      >
        <div className="google mx-3 my-2">
          <Button className={styles.Button}>
            <img src='public/imgs/facebook-icon.png' className={styles.icon}/>
            Sign Up With Facebook
          </Button>
        </div>
        <div className="facebook my-2">
          <Button className={styles.Button}>
          <img src='public/imgs/google-icon.png' className={styles.icon}/>
            Sign Up With Facebook
          </Button>
        </div>
      </div>
      <div style={{marginTop:'2%',textAlign:'center',}}>
        <small><a >Allready Have An Accoun ?! LOG IN </a></small>
      </div>
    </>
  );
}

export default SignUpOptions;
