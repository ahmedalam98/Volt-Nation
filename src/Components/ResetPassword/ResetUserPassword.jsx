import { useState } from "react";
import styles from "./ResetPassword.module.css";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../Store/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";

const ResetUserPassword = () => {
  const [password, setPassword] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errRePassword, setErrRePassword] = useState("");
  const dispatch = useDispatch();
  // const doesUserUpdatedPassword = useSelector(
  //   (state) => state.auth.doesUserUpdatedPassword
  // );
  const location = useLocation();
  let userEmail = location.state.email;
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  const navigate = useNavigate();

  const handelResetPassword = (event) => {
    if (errPassword === "" && errRePassword === "") {
      dispatch(updatePassword({ email: userEmail, password: password }));
      navigate("/login");
    } else {
      event.preventDefault();
    }
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  let passwordREGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

  //Validation
  const handelValidation = (event) => {
    switch (event.target.name) {
      case "password":
        setPassword(event.target.value);
        if (passwordREGEX.test(event.target.value)) {
          setErrPassword("");
        } else {
          setErrPassword(
            "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
          );
        }
        break;
      case "repassword":
        if (event.target.value === password) {
          setErrRePassword("");
          // console.log("Passwords match");
        } else {
          setErrRePassword("Passwords do not match");
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerOfForm}>
          <div className={styles.detailsContainer}>
            <img
              className={styles.icon}
              src="/forgot-password.png"
              alt="forget password"
            />
            <div className="my-5">
              <h1 className={styles.header}>Reset your password</h1>
              <p className={styles.txt}>
                Enter the new Password you would like to save
              </p>
            </div>

            {/* Password */}
            <div className="password">
              <FormControl
                sx={{
                  width: "98%",
                  borderRadius: "5px",
                  margin: "5px",
                }}
                variant="outlined"
              >
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  style={{ color: "white" }}
                >
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => handelValidation(e)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        style={{ color: "white" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <small className={styles.errMsg}>{errPassword}</small>
            </div>

            {/* Repassword */}
            <div className="password">
              <FormControl
                sx={{
                  width: "98%",
                  borderRadius: "5px",
                  margin: "5px",
                }}
                variant="outlined"
              >
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  style={{ color: "white" }}
                >
                  Re-Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  name="repassword"
                  type={showPassword2 ? "text" : "Password"}
                  onChange={(e) => handelValidation(e)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword2}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        style={{ color: "white" }}
                      >
                        {showPassword2 ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <small className={styles.errMsg}>{errRePassword}</small>
            </div>

            <div className={styles.btnContainer2}>
              <Button
                variant="contained"
                className={styles.btn2}
                onClick={(event) => {
                  handelResetPassword(event);
                }}
              >
                Save New Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetUserPassword;
