import Navbar from "../Components/Navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer.jsx";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
