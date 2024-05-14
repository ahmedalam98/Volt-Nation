import { Outlet, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = () => {
  let Token = localStorage.getItem("token");
  let valid = false;

  if (Token) {
    let decodedToken = jwtDecode(Token);
    let expirationTime = decodedToken.exp;
    let currentTime = Math.floor(Date.now() / 1000);
    if (currentTime < expirationTime) {
      valid = true;
    }
    console.log(decodedToken);
  }

  return valid ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
