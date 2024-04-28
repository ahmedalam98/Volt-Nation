import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { Suspense, lazy } from "react";
import store from "./Store/store";
import Layout from "./Layout/Layout.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import Overview from "./Components/Dashboard/Overview.jsx";
import AdminProducts from "./Components/Dashboard/AdminProducts.jsx";
import AdminOrders from "./Components/Dashboard/AdminOrders.jsx";
import AdminCategories from "./Components/Dashboard/AdminCategories.jsx";
import ProtectedRoute from "./Utils/ProtectedRoute.jsx";
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
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/cart" element={<Cart />} />
              </Route>

              {/* Auth Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/sign-up" element={<Register />} />

              {/* Protected Dashboard Routes */}
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
