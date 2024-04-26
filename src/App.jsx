import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { Suspense, lazy } from "react";
import store from "./Store/store";
import SignUpPage from "./Pages/Registartion/Sign-Up-Page.jsx";
import LoginPage from "./Pages/Login/LoginPage.jsx";
import ResetPassword from "./Components/ResetPassword/ResetPassword.jsx";

const Home = lazy(() => import("./Pages/Home/Home.jsx"));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<h1>Loading ....</h1>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
