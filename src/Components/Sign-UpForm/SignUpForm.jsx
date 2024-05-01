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
  } = useForm();
  console.log(watch("firstName"));
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
    event.preventDefault();

    dispatch(registerUser(user));
  };

  return (
    <div className={styles.formContainer}>
      <form>
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
                required: "Name is required",
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
                minLenght: 3,
              })}
              onChange={(e) => handleSubmit(e)}
            />
          </div>
        </div>
        <div className="email">
          <TextField
            label="E-mail"
            InputLabelProps={{
              style: { color: "white" },
            }}
            {...register("email", { required: "email is required" })}
            onChange={(e) => handleSubmit(e)}
            className={styles.formInput}
          />
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
                minLenght: 6,
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
                minLenght: 6,
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
          </FormControl>
        </div>
        {registrationError ? <div>{registrationError}</div> : null}

        <div className={styles.submitBtnContainer}>
          <Button
            variant="contained"
            type="submit"
            className={styles.submitBtn}
            // onClick={handleRegisterClick}
            onClick={handleSubmit((data) => {
              console.log(data);
            })}
          >
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
