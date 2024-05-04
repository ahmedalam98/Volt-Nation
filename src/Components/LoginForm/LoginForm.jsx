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
import { useSelector } from "react-redux";
// import { logInUser } from "../../Store/authSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function LoginForm() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  //React Hook Froms
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const formHasErrors = Object.keys(errors).length > 0;


  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  ///////////////////////////////////////////
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const logInError = useSelector((state) => state.auth.logInError);

  if (isLoggedIn) {
    navigate("/");
  }

  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    await setUser(data);
    console.log("user is ", user);
    dispatch(logInUser(user));
    console.log("Action dispatched with ", user);
  };
  const registerUser = async (email, password) => {
    try {
      const response = await axios.post(
        "https://volt-nation.up.railway.app/user/login",
        {
          email: email,
          password: password,
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const handleLogInClick = (event) => {
    event.preventDefault();
    registerUser(user.email, user.password);
  };

  //Validation
  const handelForm = (event) => {};

  return (
    <>
      <form onSubmit={handleLogInClick}>
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
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
                },
              })}
              type={showPassword ? "text" : "password"}
              onChange={(e) => handelForm(e)}
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
        {logInError ? <div>{logInError}</div> : null}
        <div className="mt-5">
          <Button
            variant="contained"
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className={styles.submitBtn}
          >
            Log In
          </Button>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
