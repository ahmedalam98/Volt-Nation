import React, { useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import styles from "./Otp.module.css";

function Otp() {
  const location = useLocation();
  const [otp, setOtp] = useState("");
  let otpFromFront = location.state.otp;
  console.log(otpFromFront);
  const [inputs, setInputs] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
    setOtp(newInputs.join(""));
    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleBackspace = (index, e) => {
    if (e.key === "Backspace" && !inputs[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleVerify = () => {
    console.log("Verifying OTP:", otp);
    // Add your OTP verification logic here
  };

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.img}>
          <img src="public/imgs/check.png" alt="Checkmark" />
        </div>
        <div className={styles.header}>
          <h1>Enter Verification Code</h1>
        </div>
        <div className={styles.otpInputs}>
          {inputs.map((value, index) => (
            <TextField
              key={index}
              type="text"
              className={styles.otpInput}
              variant="outlined"
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyUp={(e) => handleBackspace(index, e)}
              inputProps={{ maxLength: 1 }}
              autoFocus={index === 0}
              inputRef={inputRefs[index]}
            />
          ))}
        </div>
        <div className={styles.btns}>
          <Link to="/login" className={styles.link}>
            <Button variant="contained" className={styles.btnBack}>
              Back to sign in
            </Button>
          </Link>
          <Button
            variant="contained"
            className={styles.btn}
            onClick={handleVerify}
          >
            Verify
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Otp;
