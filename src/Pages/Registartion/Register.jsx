import React, { useEffect, useState } from 'react';
import SignUpForm from "../../Components/Sign-UpForm/SignUpForm.jsx";
import styles from "./Register.module.css";
import SignUpOptions from "../../Components/SignUpOptions/SignUpOptions.jsx";

const Register = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Set loaded to true after a short delay to trigger the fade-in animation
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    // Clear the timer on component unmount to avoid memory leaks
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.containerX} ${loaded ? styles.loaded : ''}`}>
      <div className={`${styles.container} ${loaded ? styles.loaded : ''}`}>
        <div className={`${styles.avatar} ${loaded ? styles.loaded : ''}`}>
          <img src="/4.jpg" alt="register" />
        </div>
        <div className={`${styles.form} ${loaded ? styles.loaded : ''}`}>
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
  );
};

export default Register;
