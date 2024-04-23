import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { Suspense, lazy } from "react";
import store from "./Store/store";

const Home = lazy(() => import("./Pages/Home/Home.jsx"));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<h1>Loading ....</h1>}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
