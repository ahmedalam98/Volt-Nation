import { useState, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import styles from "./Otp.module.css";

function Otp() {
  const location = useLocation();
  const divRef = useRef(null);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  let otpFromFront = location.state.otp.join("");
  let userEmail = location.state.email;

  // console.log(otpFromFront);

  //Data From The Inputs
  const [inputs, setInputs] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  // const [showerErr, setShowErr] = useState(false);

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

  const clearInputs = () => {
    setInputs(["", "", "", ""]);
    setOtp("");
    inputRefs[0].current.focus();
  };

  const handleVerify = () => {
    if (otpFromFront === otp) {
      navigate("/resetPasswordUsr", { state: { email: userEmail } });
    } else {
      // alert("not correct please try again");
      divRef.current.innerText = "not correct please try again";
      clearInputs();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.img}>
          <img src="/otp-password.png" alt="Checkmark" />
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
        <small ref={divRef} className={styles.errorMsg}></small>
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
