import { jwtDecode } from "jwt-decode";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  let valid = false;
  let isAdmin = false;

  if (token) {
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp;
    const currentTime = Math.floor(Date.now() / 1000);

    if (currentTime < expirationTime) {
      valid = true;
      if (decodedToken.isAdmin === "admin") {
        isAdmin = true;
      }
    }
  }

  if (!valid) {
    // User is not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (isAdmin) {
    return <Outlet />;
  }

  // Non-admin user trying to access admin route, redirect to home
  if (location.pathname.startsWith("/dashboard")) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
