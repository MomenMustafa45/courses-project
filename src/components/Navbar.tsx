import { Link } from "react-router-dom";
// import PrimaryButton from "./PrimaryButton";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
// import { useAppDispatch } from "../hooks/dispatchHooks";
// import { changeLang } from "../store/slices/langSlice";
import arabicLang from "../../public/translation/arabic/navbar.json";
import hebrewLang from "../../public/translation/hebraw/navbar.json";
import { useLanguage } from "../hooks/useLang";
import navlogo from "../../src/assets/images/navlogo.png";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  // const dispatch = useAppDispatch();

  // To define the language
  const lang = useLanguage(arabicLang, hebrewLang);

  // const handleChangeLang = () => {
  //   dispatch(changeLang());
  // };

  return (
    <nav className="py-5 bg-[#bd867f]t md:bg-transparent">
      <div className="flex justify-between items-center">
        {/* main list */}
        <ul className="hidden items-center  md:flex">
          <li className="mr-4 font-bold text-white hover:text-pink-default transition-all">
            <Link to="#home">{lang.home}</Link>
          </li>
          <li className="mr-4 font-bold text-white hover:text-pink-default transition-all">
            <Link to="#gallery">{lang.gallery}</Link>
          </li>
          <li className="mr-4 font-bold text-white hover:text-pink-default transition-all">
            <Link to="#footer">{lang.about}</Link>
          </li>
          <li className="mr-4 font-bold text-white hover:text-pink-default transition-all">
            <Link to="#footer">{lang.contact}</Link>
          </li>
          {/* <li className="mr-4" onClick={handleChangeLang}>
            <PrimaryButton>{lang.btnLang}</PrimaryButton>
          </li> */}
        </ul>
        <div className=" relative md:hidden">
          <div
            className=" cursor-pointer"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <RxHamburgerMenu size={25} color="#fff" />
          </div>
          {/* menu responsive */}
          <ul
            className={`${
              showMenu ? " h-60 py-4" : "h-0 py-0"
            } absolute bg-[#c69b95] z-50 w-56 px-2 transition-all overflow-hidden rounded flex flex-col justify-between shadow-lg top-8`}
          >
            <li
              className=" font-bold text-white hover:text-pink-default transition-all"
              onClick={() => setShowMenu(false)}
            >
              <Link to="#home">{lang.home}</Link>
            </li>
            <li
              className=" font-bold text-white hover:text-pink-default transition-all"
              onClick={() => setShowMenu(false)}
            >
              <Link to="#gallery">{lang.gallery}</Link>
            </li>
            <li
              className=" font-bold text-white hover:text-pink-default transition-all"
              onClick={() => setShowMenu(false)}
            >
              <Link to="#footer">{lang.about}</Link>
            </li>
            <li
              className=" font-bold text-white hover:text-pink-default transition-all"
              onClick={() => setShowMenu(false)}
            >
              <Link to="#footer">{lang.contact}</Link>
            </li>
            {/* <li onClick={handleChangeLang}>
              <PrimaryButton>{lang.btnLang}</PrimaryButton>
            </li> */}
          </ul>
        </div>
        <div>
          <div className="w-[80px] h-[80px]">
            <img src={navlogo} alt="logo" className="w-full h-full" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

