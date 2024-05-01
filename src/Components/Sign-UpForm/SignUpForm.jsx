import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styles from "./SignUpForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Store/authSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignUpForm = () => {
  //React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm();
  const [user, setUser] = useState({});

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formHasErrors = Object.keys(errors).length > 0;
  const onSubmit = (data) => {
    //Data of the user if it is validated
    setUser(data);
  };

  //////////////////////////////////
  const navigate = useNavigate();

  const isRegistered = useSelector((state) => state.auth.isRegistered);
  const registrationError = useSelector(
    (state) => state.auth.registrationError
  );
  if (isRegistered) {
    navigate("/login");
  }
  const dispatch = useDispatch();

  const handleRegisterClick = (event) => {
    //ASK AML
    if (formHasErrors) {
      event.preventDefault();
    } else {
      // dispatch(registerUser(user));
    }
  };

  return (
    <div className={styles.formContainer}>
      <form
      //onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.nameInputContainer}>
          <div className={styles.inputName}>
            <TextField
              id="outlined"
              label="First Name"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                style: { color: "white" },
              }}
              {...register("firstName", {
                required: "name is required",
                minLength: {
                  value: 3,
                  message: "Minimum length is 3 characters",
                },
              })}
            />
            <small className={styles.errorMsg}>
              {errors.firstName?.message}
            </small>
          </div>
          <div className={styles.inputName}>
            <TextField
              id="outlined-basic"
              fullWidth
              label="Last Name"
              variant="outlined"
              InputLabelProps={{
                style: { color: "white" },
              }}
              {...register("lastName", {
                required: "name is required",
                minLength: {
                  value: 3,
                  message: "Minimum length is 3 characters",
                },
              })}
            />
            <small className={styles.errorMsg}>
              {errors.lastName?.message}
            </small>
          </div>
        </div>
        <div className="email">
          <TextField
            label="E-mail"
            InputLabelProps={{
              style: { color: "white" },
            }}
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            className={styles.formInput}
          />
          <small className={styles.errorMsg}>{errors.email?.message}</small>
        </div>
        <div className="password">
          <FormControl className={styles.formInput} variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-password"
              style={{ color: "white" }}
            >
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              {...register("password", {
                required: "password is required",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
                },
              })}
              type={showPassword ? "text" : "password"}
              onChange={(e) => handleSubmit(e)}
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
            <small className={styles.errorMsg}>
              {errors.password?.message}
            </small>
          </FormControl>
        </div>
        <div className="re-password">
          <FormControl className={styles.formInput} variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-repassword"
              style={{ color: "white" }}
            >
              Re - Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-repassword"
              {...register("repassword", {
                required: "repassword is required",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
              type={showPassword ? "text" : "password"}
              onChange={(e) => handleSubmit(e)}
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
              label="re-Password"
            />
            <small className={styles.errorMsg}>
              {errors.repassword?.message}
            </small>
          </FormControl>
        </div>
        {registrationError ? <div>{registrationError}</div> : null}

        <div className={styles.submitBtnContainer}>
          <Button
            variant="contained"
            type="submit"
            className={styles.submitBtn}
            //onClick={handleRegisterClick}
            onClick={handleSubmit(onSubmit)}
          >
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
