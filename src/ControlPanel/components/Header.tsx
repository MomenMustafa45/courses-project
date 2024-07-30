import React, { useState } from 'react';
import logoImage from "../../assets/images/navlogo.png";
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { GrLogout } from "react-icons/gr";
// import { GrLanguage, GrLogout } from "react-icons/gr";
import { IoMdSettings } from "react-icons/io";
import { useTranslation } from 'react-i18next';
import "../styles/Header.css";
// import LanguageBox from './LanguageBox';
import { useMutation } from 'react-query';
import { logout } from '../api-client';
import { useAppContext } from '../context/AppProvider';

const Header = (): React.JSX.Element => {
  const [barActive, setBarActive] = useState<boolean>(false);
  // const [langBoxShow, setLangBoxShow] = useState<boolean>(false);

  const { showToast } = useAppContext();
  const translating = useTranslation("global")[0];
  const navigateTo = useNavigate();

  const isActiveLink = (path: string): boolean => location.pathname.toLowerCase() === path;

  const handleLinkClick = () => {
    setBarActive(false);
  };

  const mutation = useMutation(logout, {
    onSuccess: () => {
      showToast({ message: translating("links.logout.success"), type: "SUCCESS" });
      navigateTo("/");
      setBarActive(false);
    },
    onError: () => {
      showToast({ message: translating("links.logout.error"), type: "ERROR" });
    },
  });

  const handleButtonClick = () => {
    mutation.mutate();
    setBarActive(false);
  };

  return (
    <div id='header' className='fixed whitespace-nowrap px-3 top-0 left-0 right-0 bg-white shadow-sm h-[72px] flex flex-row-reverse items-center justify-between'>
      <div className="logo cursor-pointer" onClick={() => navigateTo("/")}>
        <img src={logoImage} alt="logo" className='w-[75px]' />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="bars">
            {barActive ?
              <FaBarsStaggered onClick={() => setBarActive(false)} />
              :
              <FaBars onClick={() => setBarActive(true)} />
            }
          </div>

          <button className="text-black" onClick={handleButtonClick}>
            <GrLogout size={22} />
          </button>

          {/*<button className="relative text-black" onClick={() => setLangBoxShow(!langBoxShow)}>*/}
          {/*  <GrLanguage size={22} />*/}
          {/*  <div className='fixed top-[55px] right-[35px]'>*/}
          {/*    <LanguageBox onClose={() => setLangBoxShow(false)} visible={langBoxShow} />*/}
          {/*  </div>*/}
          {/*</button>*/}

          <button className="text-black" onClick={() => navigateTo("/settings")}>
            <IoMdSettings size={22} />
          </button>
        </div>

        <ul className={`m-0 flex items-center gap-4 m-nav ${barActive && "active"}`}>
          <li className={isActiveLink("/dashboard") ? "active" : ""}>
            <Link to={"/dashboard"} onClick={handleLinkClick}>
              <p className='mb-0'>{translating("links.waiting-requests")}</p>
            </Link>
          </li>
          <li className={isActiveLink("/requests") ? "active" : ""}>
            <Link to={"/requests"} onClick={handleLinkClick}>
              <p className='mb-0'>{translating("links.requests")}</p>
            </Link>
          </li>
          <li className={isActiveLink("/courses") ? "active" : ""}>
            <Link to={"/courses"} onClick={handleLinkClick}>
              <p className='mb-0'>{translating("links.courses")}</p>
            </Link>
          </li>
          <li className={isActiveLink("/classes") ? "active" : ""}>
            <Link to={"/classes"} onClick={handleLinkClick}>
              <p className='mb-0'>{translating("links.classes")}</p>
            </Link>
          </li>
          <li className={isActiveLink("/gallery") ? "active" : ""}>
            <Link to={"/gallery"} onClick={handleLinkClick}>
              <p className='mb-0'>{translating("links.gallery")}</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;