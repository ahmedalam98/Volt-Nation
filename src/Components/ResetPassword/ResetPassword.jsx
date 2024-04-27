import React from "react";
import styles from "./ResetPassword.module.css";
import { TextField, Button } from "@mui/material";


const ResetPassword = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerOfForm}>
          <div className={styles.detailsContainer}>
            <img
              className={styles.icon}
              src="public/imgs/reset-password-icon.png"
            />
           <div className="my-5">
           <h1 className={styles.header}>Reset your password</h1>
            <p className={styles.txt}>
              Enter the email address you used to register with
            </p>
           </div>
            <TextField
              fullWidth
              label="E-mail"
              name="email"
              style={{
                borderRadius: "3px",
              }}
              className="my-5"
              
            />
            <div className={styles.btnContainer}>
           
          <Button
            variant="contained"
            type="submit"
            className={styles.btnBack}
          >
           Back to sign in 
          </Button>
          <Button
            variant="contained"
            type="submit"
           
            className={styles.btn}
          >
            Send Instructions
          </Button>

            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
