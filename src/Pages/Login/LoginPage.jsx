import styles from "./LoginPage.module.css";
import LoginForm from "./../../Components/LoginForm/LoginForm.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { logInUser } from "../../Store/authSlice.js";

const LoginPage = () => {
  const [loaded, setLoaded] = useState(false);
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const logInError = useSelector((state) => state.auth.logInError);

  let decodedToken;
  let user;

  const [isSignUpClicked, setIsSignUpClicked] = useState(false);
  let goToHome = () => {
    navigate("/");
  };

  const handleSignUpClick = () => {
    setIsSignUpClicked(true);
    setTimeout(() => {
      navigate("/sign-up");
    }, 500);
  };

  const handleSuccess = (response) => {
    decodedToken = jwtDecode(response.credential);
    user = {
      email: decodedToken.email,
      gmail: true,
    };
    dispatch(logInUser(user));
  };

  const handleFailure = (error) => {
    console.log("Login with google Failed:", error);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

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
                    <p className={styles.header} onClick={goToHome}>
                      Login Form
                    </p>
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
                    <div>
                      <div className={styles.conOfOptions}>
                        <div className="google mx-3 my-2">
                          <GoogleLogin
                            onSuccess={handleSuccess}
                            onError={handleFailure}
                          />
                        </div>
                        {logInError ? (
                          <div className={styles.errorMsg}>{logInError}</div>
                        ) : null}
                      </div>
                      <div
                        style={{
                          marginTop: "2%",
                          textAlign: "center",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        <Link className="text-sm" onClick={handleSignUpClick}>
                          Do Not Have An Account ?! SIGN UP{" "}
                        </Link>
                      </div>
                      <div
                        style={{
                          marginTop: "2%",
                          textAlign: "center",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        <Link to="/resetPassword" className="text-sm">
                          Forgot Password{" "}
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
                src="https://images.pexels.com/photos/3563627/pexels-photo-3563627.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
