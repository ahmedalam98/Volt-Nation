import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { Suspense, lazy } from "react";
import store from "./Store/store";

import SignUpPage from "./Pages/Registartion/Sign-Up-Page.jsx";
import LoginPage from "./Pages/Login/LoginPage.jsx";
import Layout from "./Layout/Layout.jsx";
import Home from "./Pages/Home/Home.jsx";


//pages
// const Home = lazy(() => import("./Pages/Home/Home.jsx"));
const Products = lazy(() => import("./Pages/Products/Products.jsx"));
const ProductDetails = lazy(
  () => import("./Pages/ProductDetails/ProductDetails.jsx")
);
const Profile = lazy(() => import("./Pages/Profile/Profile.jsx"));
const Cart = lazy(() => import("./Pages/Cart/Cart.jsx"));
const Login = lazy(() => import("./Pages/Login/Login.jsx"));
const Register = lazy(() => import("./Pages/Register/Register.jsx"));
const NotFound = lazy(() => import("./Pages/NotFound/NotFound.jsx"));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Suspense
          fallback={
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
            <Route path="*" element={<NotFound />} />

          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
