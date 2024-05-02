import styles from "./LoginPage.module.css";
import LoginForm from "./../../Components/LoginForm/LoginForm.jsx";
import LoginOptions from "../../Components/LoginOptions/LoginOptions.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);

  const handleSignUpClick = () => {
    // Add any other logic before navigating, if needed
    setIsSignUpClicked(true);
    // Use setTimeout to delay navigation until after animation
    setTimeout(() => {
      navigate('/sign-up');
    }, 500); // Adjust timing based on your animation duration
  };
  return (
    <div className={`${styles.container} global-styles`}>
      <div className={`${styles.containerX} `}>
        <div className={styles.subContainer}>
          <div className={`${styles.form} ${isSignUpClicked ? styles.slideOutForm : ''} `}>
            <div>
              <div className={styles.containerForDetails}>
                <div>
                  <p className={styles.header}>Login Form</p>
                </div>
              </div>

              <hr className={styles.hr} />

              <div className="mt-5">
                <p className={styles.welcome}>Welcome to Volt Nation :</p>
              </div>

              <div className='m-2 p-3'>
                <LoginForm  />
                <div className={styles.hrContainer}>
                  <hr className={styles.subHr} />
                  <p className={styles.subP}>or</p>
                  <hr className={styles.subHr} />
                </div>
                <div className="mt-5">
                  <LoginOptions />
                  <button onClick={handleSignUpClick}>Click me</button>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.avatar} ${isSignUpClicked ? styles.slideOutImg : ''}`}>
            <img
              src="https://ecc-alex.com/pub/media/wysiwyg/nextgen_1.jpg"
              alt="login"
            />
          </div>
        </div>
      </div>
    </div>
   
  );
};

export default LoginPage;
