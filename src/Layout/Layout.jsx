import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar.jsx";
import Footer from "../Components/Footer/Footer.jsx";

export default function Layout() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <>
      <Navbar />
      <Outlet />
      {!isDashboardRoute && <Footer />}
    </>
  );
}
