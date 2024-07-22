import { useLanguage } from "../../hooks/useLang";
import arabicLang from "../../../public/translation/arabic/hero.json";
import hebrewLang from "../../../public/translation/hebraw/heron.json";
import { useAppDispatch } from "../../hooks/dispatchHooks";
import backgroundImg from "../../assets/images/coversen.png";
import Navbar from "../Navbar";
import PrimaryButton from "../PrimaryButton";
import { toggleModal } from "../../store/slices/modalSlice";

const Hero = () => {
  const lang = useLanguage(arabicLang, hebrewLang);

  const dispatch = useAppDispatch();

  return (
    <section
      className=" h-[600px] bg-no-repeat bg-center md:bg-cover bg-[#bd867f] relative"
      style={{ backgroundImage: `url(${backgroundImg})` }}
      id="home"
    >
      <div className="container flex flex-col h-full">
        <Navbar />
        <div
          className="  w-1/2 flex flex-col justify-center mr-auto flex-1"
          data-aos="fade-right"
        >
          <h1 className="text-white text-2xl md:text-4xl md:leading-[3.5rem]">
            {lang.heroHeader}
          </h1>
          <div className="flex justify-start mt-5">
            <PrimaryButton onClickHandler={() => dispatch(toggleModal())}>
              {lang.heroBtn}
            </PrimaryButton>
          </div>
        </div>
      </div>
      {/* wave */}
      <div className="custom-shape-divider-bottom-1721147053 hidden md:block">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <div className=" absolute w-full bottom-0 right-0 md:hidden block">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#fff"
            fill-opacity="1"
            d="M0,192L34.3,213.3C68.6,235,137,277,206,250.7C274.3,224,343,128,411,112C480,96,549,160,617,197.3C685.7,235,754,245,823,250.7C891.4,256,960,256,1029,240C1097.1,224,1166,192,1234,197.3C1302.9,203,1371,245,1406,266.7L1440,288L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
