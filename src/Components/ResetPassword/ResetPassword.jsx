import { useState, useRef } from "react";
import styles from "./ResetPassword.module.css";
import { TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userHasEmail } from "../../Store/authSlice";

const ResetPassword = () => {
  const [userEmail, setUserEmail] = useState("");
  const divRef = useRef(null);
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const doesUserHasEmail = useSelector((state) => state.auth.doesUserHasEmail);
  // Email Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handelValidation = (eve) => {
    if (emailRegex.test(eve.target.value)) {
      setErr("");
      setUserEmail(eve.target.value);
    } else {
      setErr(
        eve.target.value.length === 0
          ? "Email is required"
          : "Email is not valid"
      );
    }
  };

  function generateRandomNumbers() {
    const numbers = [];
    for (let i = 0; i < 4; i++) {
      numbers.push(Math.floor(Math.random() * 9) + 1);
    }
    return numbers;
  }

  const handelResetPassword = () => {
    let otp = generateRandomNumbers();
    let returnPromise = dispatch(
      userHasEmail({ email: userEmail, otp: Number(otp.join("")) })
    );
    returnPromise
      .then((res) => {
        if (res.payload.message === "reset mail sent successfully") {
          navigate("/OTP", { state: { otp: otp, email: userEmail } });
        } else {
          alert("Email is not found , please sign up");
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerOfForm}>
          <div className={styles.detailsContainer}>
            <img
              className={styles.icon}
              src="/forgot-password.png"
              alt="forget"
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
              name="userEmail"
              style={{
                borderRadius: "3px",
              }}
              InputLabelProps={{
                style: { color: "white", borderColor: "white" },
              }}
              className="my-5"
              onChange={(e) => handelValidation(e)}
            />
            <small className={styles.errMsg}>{err}</small>
            <small className={styles.errMsg} ref={divRef}></small>
            <div className={styles.btnContainer}>
              <Link to={"/login"}>
                <Button variant="contained" className={styles.btnBack}>
                  Back to sign in
                </Button>
              </Link>
              <Button
                variant="contained"
                className={styles.btn}
                disabled={err !== ""}
                onClick={() => handelResetPassword()}
              >
                Send OTP
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
