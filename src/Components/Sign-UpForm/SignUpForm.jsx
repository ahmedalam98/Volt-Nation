import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import styles from "./SignUpForm.module.css";

const SignUpForm = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    firstNameErr: "",
    lastNameErr: "",
    emailErr: "",
    passwordErr: "",
    repasswordErr: "",
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
      case "firstName":
        setUser({ ...user, firstName: event.target.value });
        setErrors({
          ...errors,
          firstNameErr:
            event.target.value.length == 0
              ? "name is required"
              : event.target.value.length < 3
              ? "name must be at least 3 chars"
              : "",
        });
        break;
      case "lastName":
        setUser({ ...user, lastName: event.target.value });
        setErrors({
          ...errors,
          lastNameErr:
            event.target.value.length == 0
              ? "name is required"
              : event.target.value.length < 3
              ? "name must be at least 3 chars"
              : "",
        });
        break;
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
      case "repassword":
        setErrors({
          ...errors,
          repasswordErr:
            event.target.value !== user.password
              ? "password does not match"
              : "",
        });
        break;
      default:
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", width: "100%" }}>
        <div
          style={{
            width: "50%",
            borderRadius: "5px",
            margin: "2.5px",
          }}
        >
          <TextField
            id="outlined "
            color="secondary"
            label="First Name"
            variant="outlined"
            name="firstName"
            style={{ width: "100%" }}
            onChange={(e) => handelForm(e)}
          />

          <small className={styles.errorMsg}>{errors.firstNameErr}</small>
        </div>
        <div  style={{
              width: "50%",
              borderRadius: "5px",
              margin: "2.5px",
            }}>
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            name="lastName"
           
            onChange={(e) => handelForm(e)}
          />
          <small className={styles.errorMsg}>{errors.lastNameErr}</small>
        </div>
      </div>
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
      <div className="re-password">
        <FormControl
          sx={{
            width: "98%",
            borderRadius: "5px",
            margin: "5px",
          }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-repassword">
            Re - Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-repassword"
            name="repassword"
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
          <small className={styles.errorMsg}>{errors.repasswordErr}</small>
        </FormControl>
      </div>
      <div
        className="checkBox"
        style={{ margin: "5px", marginLeft: "2%", width: "97%" }}
      >
        <FormControlLabel
          required
          control={<Checkbox />}
          label="By registration you are agree to our terms and conditions"
        />
      </div>
      <div style={{ marginTop: "5%", color: "black" }}>
        <Button
          variant="contained"
          type="submit"
          style={{ backgroundColor: "#8dff7a", width: "90%", marginLeft: "5%" }}
        >
          Create Account
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
