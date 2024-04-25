import React, { useState } from "react";
import SignUpForm from "./../../Components/Sign-UpForm/SignUpForm.jsx";
import styles from "./Sign-Up-Page.module.css";
import SignUpOptions from "../../Components/LoginOptions/SignUpOptions.jsx";

const SignUpPage = () => {
 
  return (
    <>
      <div className={styles.containerX}>
        <div className={styles.container}>
          <div className={styles.avatar}>
            <img src="public/imgs/Big_phone_with_cart.jpg" />
          </div>
          <div className={styles.form}>
            <div className={styles.containerForDetails}>
              <div>
                <p className={styles.header}>Create Account</p>
              </div>
            </div>
            <hr style={{ width: "70%", marginLeft: "15%", marginTop: "5%" }} />
            <div className={styles.Signupform}>
              <SignUpForm />
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
                <SignUpOptions />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
