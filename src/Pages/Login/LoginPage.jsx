import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import LoginForm from "./../../Components/LoginForm/LoginForm.jsx";
import LoginOptions from "../../Components/LoginOptions/LoginOptions.jsx";

const LoginPage = () => {
  return (
    <div className={styles.containerX}>
      <div className={styles.container}>
        <div className={styles.avatar}>
          <img src="https://ecc-alex.com/pub/media/wysiwyg/nextgen_1.jpg" />
        </div>
        <div className={styles.form}>
         <div>
         <div className={styles.containerForDetails}>
            <div>
              <p className={styles.header}>Login Form</p>
            </div>
          </div>
          <hr style={{ width: "70%", marginLeft: "15%", marginTop: "5%" }} />
          <div style={{ marginTop: "3%" }}>
            <p className={styles.welcome}>Welcome to Volt Nation :</p>
          </div>
          <div className={styles.Signupform}>
            <LoginForm />
            <div
              style={{
                marginTop: "5%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <hr style={{ width: "45%" }} />
              <p style={{ width: "10%", textAlign: "center" }}>or</p>
              <hr style={{ width: "45%" }} />
            </div>
            <div style={{ marginTop: "3%" }}>
              <LoginOptions />
            </div>
          </div>
         </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
