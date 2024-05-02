import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { Suspense, lazy } from "react";
import store from "./Store/store";
import Layout from "./Layout/Layout.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import ResetPassword from "./Components/ResetPassword/ResetPassword.jsx";
import Otp from "./Components/OTP/Otp.jsx";
import ResetUserPassword from "./Components/ResetPassword/ResetUserPassword.jsx";
// import { ReactQueryDevtools } from "react-query/devtools";

const Home = lazy(() => import("./Pages/Home/Home.jsx"));
const Products = lazy(() => import("./Pages/Products/Products.jsx"));
const ProductDetails = lazy(
  () => import("./Pages/ProductDetails/ProductDetails.jsx")
);
const Profile = lazy(() => import("./Pages/Profile/Profile.jsx"));
const Cart = lazy(() => import("./Pages/Cart/Cart.jsx"));
const NotFound = lazy(() => import("./Pages/NotFound/NotFound.jsx"));
const LoginPage = lazy(() => import("./Pages/Login/LoginPage.jsx"));
const Register = lazy(() => import("./Pages/Registartion/Register.jsx"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
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
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/cart" element={<Cart />} />
              </Route>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/sign-up" element={<Register />} />
              <Route path="/resetPassword" element={<ResetPassword/>} />
              <Route path="/resetPasswordUsr" element={<ResetUserPassword/>} />
              
              <Route path="/otp" element={<Otp/>} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
