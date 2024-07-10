import React, { useEffect, useState } from "react";
import SignUpForm from "../../Components/Sign-UpForm/SignUpForm.jsx";
import styles from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { registerUser } from "../../Store/authSlice.js";

// import { Button } from "@mui/material";

const Register = () => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  let dispatch = useDispatch();
  let goToHome = () => {
    navigate("/");
  };
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);
  let decodedToken;
  let user;
  const handleSuccess = (response) => {
    decodedToken = jwtDecode(response.credential);
    user = {
      firstName: decodedToken.given_name,
      lastName: decodedToken.family_name,
      email: decodedToken.email,
      gmail: true,
    };

    dispatch(registerUser(user));
  };

  const handleFailure = (error) => {
    console.log("Login with google Failed:", error);
  };
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
            <img
              src="https://images.pexels.com/photos/3412313/pexels-photo-3412313.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="register"
            />
          </div>
        </div>

        <div
          className={` ${styles.formContainer} ${isSignUpClicked ? styles.slideOutForm : ""} `}
        >
          <div className={`${styles.form} ${loaded ? styles.loaded : ""}  `}>
            <div className={styles.containerForDetails}>
              <div>
                <p className={styles.header} onClick={goToHome}>
                  Create Account
                </p>
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
                <p
                  style={{ width: "10%", textAlign: "center", color: "white" }}
                >
                  or
                </p>
                <hr style={{ width: "45%" }} />
              </div>
              <div style={{ marginTop: "3%" }}>
                <div className={styles.conOfOptions}></div>
                <div
                  style={{
                    marginTop: "1%",
                    padding: "15px",
                    textAlign: "center",
                    color: "white",
                    fontWeight: "bold",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleFailure}
                  />
                  <Link onClick={handleSignUpClick} className="text-sm mt-5">
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
