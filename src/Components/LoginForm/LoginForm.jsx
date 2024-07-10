import { useState } from "react";
import { TextField, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styles from "./LoginForm.module.css";
import { useSelector, useDispatch } from "react-redux";
import { logInUser } from "../../Store/authSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { jwtDecode } from "jwt-decode";
import { useQueryClient } from "react-query";

function LoginForm() {
  // const [user, setUser] = useState(5);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const logInError = useSelector((state) => state.auth.logInError);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  if (isLoggedIn && isAdmin) {
    navigate("/dashboard");
  } else if (isLoggedIn) {
    navigate("/");
    queryClient.invalidateQueries(["profileDetails"]);
    queryClient.invalidateQueries(["allOrders"]);
  }

  const handelUserState = (data) => {
    if (data) {
      dispatch(logInUser(data));
    } else {
      // console.log("user is null ", data);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          // setUser(data, () => {
          //   // console.log(user);
          // });
          // console.log(user);
          handelUserState(data);
        })}
      >
        <div className="email">
          <TextField
            fullWidth
            label="E-mail"
            name="email"
            className={styles.textField}
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
          />
          <small className={styles.errorMsg}>{errors.email?.message}</small>
        </div>
        <div className="password">
          <FormControl variant="outlined" className={styles.passwordInput}>
            <InputLabel
              htmlFor="outlined-adornment-password"
              style={{ color: "white" }}
            >
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              name="password"
              InputLabelProps={{
                style: { color: "white" },
              }}
              {...register("password", {
                required: "password is required",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                  message: "Invalid Password",
                },
              })}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    className={styles.showPasswordIcon}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            <small className={styles.errorMsg}>
              {" "}
              {errors.password?.message}
            </small>
          </FormControl>
        </div>
        {logInError ? (
          <div className={styles.errorMsg}>{logInError}</div>
        ) : null}
        <div className="mt-5">
          <Button
            variant="contained"
            type="submit"
            className={styles.submitBtn}
          >
            Log In
          </Button>
        </div>
        <div></div>
      </form>
    </>
  );
}

export default LoginForm;
