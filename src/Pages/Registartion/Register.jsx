import SignUpForm from "../../Components/Sign-UpForm/SignUpForm.jsx";
import styles from "./Register.module.css";
import SignUpOptions from "../../Components/SignUpOptions/SignUpOptions.jsx";

const Register = () => {
  return (
    <>
      <div className={styles.containerX}>
        <div className={styles.container}>
          <div className={styles.avatar}>
            <img src="/4.jpg" alt="register" />
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

export default Register;
