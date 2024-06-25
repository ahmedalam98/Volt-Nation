import { Outlet, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = () => {
  let Token = localStorage.getItem("token");
  let valid = false;
  let isAdmin = false;

  if (Token) {
    let decodedToken = jwtDecode(Token);
    let expirationTime = decodedToken.exp;
    let currentTime = Math.floor(Date.now() / 1000);
    if (currentTime < expirationTime) {
      valid = true;
      if (decodedToken.isAdmin === "admin") {
        isAdmin = true;
      }
    }
    // console.log(decodedToken);
  }

  if (isAdmin) {
    return <Outlet />;
  } else if (valid) {
    return <Navigate to="/" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
