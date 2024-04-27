import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styles from "./LoginForm.module.css";
import { Link } from "react-router-dom";
function LoginForm() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    emailErr: "",
    passwordErr: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // Email Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //Validation
  const handelForm = (event) => {
    switch (event.target.name) {
      case "email":
        setUser({ ...user, email: event.target.value });

        setErrors({
          ...errors,
          emailErr: emailRegex.test(event.target.value)
            ? ""
            : "email is not valid",
        });
        break;
      case "password":
        setUser({ ...user, password: event.target.value });
        setErrors({
          ...errors,
          passwordErr:
            event.target.value.length === 0
              ? "password is required"
              : event.target.value.length < 6
              ? "password must be at least 6 characters"
              : "",
        });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="email">
          <TextField
            fullWidth
            label="E-mail"
            name="email"
            style={{
              width: "98%",
              borderRadius: "5px",
              margin: "5px",
            }}
            onChange={(e) => handelForm(e)}
          />
          <small className={styles.errorMsg}>{errors.emailErr}</small>
        </div>
        <div className="password">
          <FormControl
            sx={{
              width: "98%",
              borderRadius: "5px",
              margin: "5px",
            }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => handelForm(e)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            <small className={styles.errorMsg}>{errors.passwordErr}</small>
          </FormControl>
        </div>

        <div style={{ marginTop: "5%", color: "black" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "3%",
            }}
          >
            <Link to={"/resetPassword"}>
              <small className={styles.link}>
                Forgot Password ?! Reset Password
              </small>
            </Link>
          </div>
          <Button
            variant="contained"
            type="submit"
            style={{
              backgroundColor: "#8dff7a",
              width: "90%",
              marginLeft: "5%",
            }}
            disabled={Object.values(errors).some((err) => !!err)}
          >
            Log In
          </Button>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
