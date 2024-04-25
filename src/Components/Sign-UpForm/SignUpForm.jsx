import React from "react";
import { TextField, Button } from "@mui/material";
import { red } from "@mui/material/colors";
import InputLabel from "@mui/material/InputLabel";
import "./SignUpForm.module.css";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";


const SignUpForm = () => {
  const primary = red[500]; // #f44336
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", width: "100%" }}>
        <TextField
          id="outlined-basic"
          label="First Name"
          variant="outlined"
          style={{
            width: "50%",
            border: "1px white solid",
            borderRadius: "5px",
            margin: "2.5px",
          }}
        />
        <TextField
          id="outlined-basic"
          label="Last Name"
          variant="outlined"
          style={{
            width: "50%",
            border: "1px white solid",
            borderRadius: "5px",
            margin: "2.5px",
          }}
        />
      </div>
      <div className="email">
        <TextField
          fullWidth
          label="ُE-Mail"
          style={{
            width: "98%",
            border: "1px white solid",
            borderRadius: "5px",
            margin: "5px",
          }}
        />
      </div>
      <div className="password">
        <FormControl
          sx={{
            width: "98%",
            border: "1px white solid",
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
            type={showPassword ? "text" : "password"}
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
        <FormControl
          sx={{
            width: "98%",
            border: "1px white solid",
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
            type={showPassword ? "text" : "password"}
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
