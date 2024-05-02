import styles from "./LoginPage.module.css";
import LoginForm from "./../../Components/LoginForm/LoginForm.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

const LoginPage = () => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);

  const handleSignUpClick = () => {
    // Add any other logic before navigating, if needed
    setIsSignUpClicked(true);
    // Use setTimeout to delay navigation until after animation
    setTimeout(() => {
      navigate("/sign-up");
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

  return (
    <div
      className={`${styles.container} global-styles  ${loaded ? styles.loaded : ""}`}
    >
      <div className={`${styles.containerX}  ${loaded ? styles.loaded : ""}`}>
        <div
          className={`${styles.subContainer} ${loaded ? styles.loaded : ""}`}
        >
          <div className={`${styles.form} ${loaded ? styles.loaded : ""}`}>
            <div className={` ${isSignUpClicked ? styles.slideOutForm : ""} `}>
              <div>
                <div className={`${styles.containerForDetails} `}>
                  <div>
                    <p className={styles.header}>Login Form</p>
                  </div>
                </div>

                <hr className={styles.hr} />

                <div className="mt-5">
                  <p className={styles.welcome}>Welcome to Volt Nation :</p>
                </div>

                <div className="m-2 p-3">
                  <LoginForm />
                  <div className={styles.hrContainer}>
                    <hr className={styles.subHr} />
                    <p className={styles.subP}>or</p>
                    <hr className={styles.subHr} />
                  </div>
                  <div className="mt-5">
                    {/* <LoginOptions onCLick={handleSignUpClick}/> */}
                    <div>
                      <div className={styles.conOfOptions}>
                        <div className="google mx-3 my-2">
                          <Button className={styles.Button}>
                            <img
                              src="6.png"
                              alt="google"
                              className={styles.icon}
                            />
                            Login With Google
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
                        <Link className="text-sm" onClick={handleSignUpClick}>
                          Do Not Have An Account ?! SIGN UP{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.avatar} ${loaded ? styles.loaded : ""}`}>
            <div className={` ${isSignUpClicked ? styles.slideOutImg : ""} `}>
              <img
                src="https://ecc-alex.com/pub/media/wysiwyg/nextgen_1.jpg"
                alt="login"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
