import React from "react";
import { TextField, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styles from "./SignUpForm.module.css";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../Store/authSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignUpForm = () => {
  //React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = (data) => {
    delete data.repassword;
    dispatch(registerUser(data));
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

  return (
    <div className={styles.formContainer}>
      <form>
        <div className={styles.nameInputContainer}>
          <div className={`${styles.inputName} `}>
            <TextField
              id="outlined"
              label="First Name"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                style: { color: "white", borderColor: "white" },
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
                    "Password must be at least 8 characters contains at least one uppercase letter, one lowercase letter, one digit, and one special character",
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
                    style={{ color: "white" }}
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
              type={showPassword2 ? "text" : "password"}
              onChange={(e) => handleSubmit(e)}
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
              label="re-Password"
            />
            <small className={styles.errorMsg}>
              {errors.repassword?.message}
            </small>
          </FormControl>
        </div>
        <div className="phone">
          <TextField
            label="Mobile Number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            InputLabelProps={{
              style: { color: "white" },
            }}
            {...register("phone", {
              required: "Mobile number is required",
              pattern: {
                value: /^(010|011|012|015)\d{8,9}$/,
                message: "Invalid mobile number",
              },
            })}
            className={styles.formInput}
          />
          <small className={styles.errorMsg}>{errors.mobile?.message}</small>
        </div>

        {registrationError ? (
          <div className={styles.errorMsg}>{registrationError}</div>
        ) : null}

        <div className={styles.submitBtnContainer}>
          <Button
            variant="contained"
            type="submit"
            className={styles.submitBtn}
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
