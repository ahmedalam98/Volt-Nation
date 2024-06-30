import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { Suspense, lazy } from "react";
import store from "./Store/store";
import Layout from "./Layout/Layout.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import ProtectedRoute from "./Utils/ProtectedRoute.jsx";
import UnderConstruction from "./Pages/UnderConstruction/UnderConstruction.jsx";
import Home from "./Pages/Home/Home.jsx";
import LoginPage from "./Pages/Login/LoginPage.jsx";
import Register from "./Pages/Registartion/Register.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = lazy(() => import("./Pages/Products/Products.jsx"));
const Categories = lazy(() => import("./Pages/Categories/Categories.jsx"));
const ProductDetails = lazy(
  () => import("./Pages/ProductDetails/ProductDetails.jsx")
);
const Otp = lazy(() => import("./Components/OTP/Otp.jsx"));
const ResetPassword = lazy(
  () => import("./Components/ResetPassword/ResetPassword.jsx")
);
const ResetUserPassword = lazy(
  () => import("./Components/ResetPassword/ResetUserPassword.jsx")
);
const Profile = lazy(() => import("./Components/Profile/Profile.jsx"));
const Cart = lazy(() => import("./Components/Cart/Cart.jsx"));
const NotFound = lazy(() => import("./Pages/NotFound/NotFound.jsx"));
const Dashboard = lazy(() => import("./Components/Dashboard/Dashboard.jsx"));
const Overview = lazy(() => import("./Components/Dashboard/Overview.jsx"));
const AdminProducts = lazy(
  () => import("./Components/Dashboard/AdminProducts.jsx")
);
const AdminOrders = lazy(
  () => import("./Components/Dashboard/AdminOrders.jsx")
);
const AdminCategories = lazy(
  () => import("./Components/Dashboard/AdminCategories.jsx")
);
const Admins = lazy(() => import("./Components/Dashboard/Admins.jsx"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <Suspense
            fallback={
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            }
          >
            <ToastContainer />
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                {/* <Route path="/products" element={<Products />} /> */}
                <Route path="/categories" element={<Categories />} />
                <Route path="/categories/:name" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />

                <Route path="/cart" element={<Cart />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/profile" element={<Profile />} />
                </Route>
                <Route
                  path="/under-construction"
                  element={<UnderConstruction />}
                />
              </Route>

              {/* Auth Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/sign-up" element={<Register />} />
              <Route path="/resetPassword" element={<ResetPassword />} />
              <Route path="/resetPasswordUsr" element={<ResetUserPassword />} />

              <Route path="/otp" element={<Otp />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />}>
                  <Route index element={<Overview />} />
                  <Route
                    path="/dashboard/products"
                    element={<AdminProducts />}
                  />
                  <Route
                    path="/dashboard/categories"
                    element={<AdminCategories />}
                  />
                  <Route path="/dashboard/orders" element={<AdminOrders />} />
                  <Route path="/dashboard/admins" element={<Admins />} />
                </Route>
              </Route>

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
