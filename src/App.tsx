import "./index.css";
import "aos/dist/aos.css";
import Home from "./pages/Home";
import AOS from "aos";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopBtn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Requests from "./ControlPanel/Pages/Requests";
import Login from "./ControlPanel/Pages/Login";
import { useAppContext } from "./ControlPanel/context/AppProvider";
import Header from "./ControlPanel/components/Header";
import Gallery from "./ControlPanel/Pages/Gallery";
import Classes from "./ControlPanel/Pages/Classes";
import Courses from "./ControlPanel/Pages/Courses";
import WaitingRequests from "./ControlPanel/Pages/WaitingRequests";
import Settings from "./ControlPanel/Pages/Settings";

const App = () => {
  const { isLoggedIn } = useAppContext();

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <ToastContainer />
      <Router>
        <ScrollToTop />
        <ScrollToTopButton />

        <Routes>
          <Route path="/" element={<Home />} />

          {isLoggedIn ? (
            <>
              <Route
                path="/dashboard"
                element={
                  <>
                    <div className="pt-[78px]" />
                    <WaitingRequests />
                    <Header />
                  </>
                }
              />

              <Route
                path="/settings"
                element={
                  <>
                    <div className="pt-[78px]" />
                    <Settings />
                    <Header />
                  </>
                }
              />

              <Route
                path="/requests"
                element={
                  <>
                    <div className="pt-[78px]" />
                    <Requests />
                    <Header />
                  </>
                }
              />

              <Route
                path="/courses"
                element={
                  <>
                    <div className="pt-[78px]" />
                    <Courses />
                    <Header />
                  </>
                }
              />

              <Route
                path="/classes"
                element={
                  <>
                    <div className="pt-[78px]" />
                    <Classes />
                    <Header />
                  </>
                }
              />

              <Route
                path="/gallery"
                element={
                  <>
                    <div className="pt-[78px]" />
                    <Gallery />
                    <Header />
                  </>
                }
              />
            </>
          ) : (
            <Route path="/dashboard" element={<Login />} />
          )}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
