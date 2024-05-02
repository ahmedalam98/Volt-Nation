import React, { useEffect, useState } from "react";
import SignUpForm from "../../Components/Sign-UpForm/SignUpForm.jsx";
import styles from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Register = () => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);

  const handleSignUpClick = () => {
    // Add any other logic before navigating, if needed
    setIsSignUpClicked(true);
    // Use setTimeout to delay navigation until after animation
    setTimeout(() => {
      navigate("/login");
    }, 500); // Adjust timing based on your animation duration
  };

  useEffect(() => {
    // Set loaded to true after a short delay to trigger the fade-in animation
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    // Clear the timer on component unmount to avoid memory leaks
    return () => clearTimeout(timer);
  }, []);

  // return (
  //   <div className={`${styles.containerX} ${loaded ? styles.loaded : ''}`}>
  //     <div className={`${styles.container} ${loaded ? styles.loaded : ''}`}>
  //       <div className={`${styles.avatar} ${loaded ? styles.loaded : ''}`}>
  //         <img src="/4.jpg" alt="register" />
  //       </div>
  //       <div className={`${styles.form} ${loaded ? styles.loaded : ''}`}>
  //         <div className={styles.containerForDetails}>
  //           <div>
  //             <p className={styles.header}>Create Account</p>
  //           </div>
  //         </div>
  //         <hr style={{ width: "70%", marginLeft: "15%", marginTop: "5%" }} />
  //         <div className={styles.Signupform}>
  //           <SignUpForm />
  //           <div
  //             style={{
  //               marginTop: "5%",
  //               display: "flex",
  //               justifyContent: "center",
  //               alignItems: "center",
  //             }}
  //           >
  //             <hr style={{ width: "45%" }} />
  //             <p style={{ width: "10%", textAlign: "center" }}>or</p>
  //             <hr style={{ width: "45%" }} />
  //           </div>
  //           <div style={{ marginTop: "3%" }}>
  //             <SignUpOptions />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className={`${styles.containerX} ${loaded ? styles.loaded : ""}`}>
      <div className={`${styles.container} ${loaded ? styles.loaded : ""}`}>
        <div
          className={`${styles.avatarContainer} ${isSignUpClicked ? styles.slideOutImg : ""}`}
        >
          <div className={`${styles.avatar} ${loaded ? styles.loaded : ""} `}>
            <img src="/4.jpg" alt="register" />
          </div>
        </div>

        <div
          className={` ${styles.formContainer} ${isSignUpClicked ? styles.slideOutForm : ""} `}
        >
          <div className={`${styles.form} ${loaded ? styles.loaded : ""}  `}>
            <div className={styles.containerForDetails}>
              <div>
                <p className={styles.header}>Create Account</p>
              </div>
            </div>
            <hr style={{ width: "70%", marginLeft: "15%", marginTop: "5%" }} />
            <div className={`${styles.Signupform} `}>
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
                <p style={{ width: "10%", textAlign: "center",color:'white' }}>or</p>
                <hr style={{ width: "45%" }} />
              </div>
              <div style={{ marginTop: "3%" }}>
                <div className={styles.conOfOptions}>
                  <div className="google mx-3 my-2">
                    <Button className={styles.Button}>
                      <img src="6.png" alt="google" className={styles.icon} />
                      Sign Up With Google
                    </Button>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "2%",
                    textAlign: "center",
                    color: "blue",
                    textDecoration: "underLine",
                  }}
                >
                  <Link onClick={handleSignUpClick} className="text-sm">
                    Allready Have An Accoun ?! LOG IN{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
