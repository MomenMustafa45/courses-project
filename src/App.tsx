import "./index.css";
import "aos/dist/aos.css";
import Home from "./pages/Home";
import AOS from "aos";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopBtn";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);
  console.log("app rendered");

  return (
    <>
      <Router>
        <ScrollToTop />
        <ScrollToTopButton />

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
