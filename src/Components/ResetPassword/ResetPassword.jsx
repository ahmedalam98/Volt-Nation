import React, { useState } from "react";
import styles from "./ResetPassword.module.css";
import { TextField, Button } from "@mui/material";
import { Link  } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [userEmail, setUserEmail] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  // Email Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handelValidation = (eve) => {
    console.log(userEmail);

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
    for (let i = 0; i <4; i++) {
      numbers.push(Math.floor(Math.random() * 9) + 1);
    }
    return numbers;
  }

  const handelResetPassword = () => {
    //generate OTP random number
    const otp = generateRandomNumbers();
    //Send OTP number to user's email through BACKEND Ya AMAAAAALLLLLL
    //go to OTP page and compare
    navigate('/OTP', { state: { otp:otp }})
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerOfForm}>
          <div className={styles.detailsContainer}>
            <img
              className={styles.icon}
              src="public/imgs/reset-password-icon.png"
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
              className="my-5"
              onChange={(e) => handelValidation(e)}
            />
            <small className={styles.errMsg}>{err}</small>
            <div className={styles.btnContainer}>
              <Link to={"/login"}>
                <Button variant="contained" className={styles.btnBack}>
                  Back to sign in
                </Button>
              </Link>
              <Button
                variant="contained"
                className={styles.btn}
                disabled={err != ""}
                onClick={() => handelResetPassword()}
              >
                Send Instructions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
