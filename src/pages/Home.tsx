// import Navbar from "../components/Navbar";
import ModalForm from "../components/ModalForm";
import Courses from "../components/sections/Courses";
import Footer from "../components/sections/Footer";
import Gallery from "../components/sections/Gallery";
import Hero from "../components/sections/Hero";

const Home = () => {
  console.log("home rendered");

  return (
    <main>
      <Hero />
      <Courses />
      <Gallery />
      <Footer />
      <ModalForm />
    </main>
  );
};

export default Home;
