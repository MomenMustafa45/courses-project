import { MdPhoneIphone } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { HiOfficeBuilding } from "react-icons/hi";
import { FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";
import wazeLogo from "../../assets/images/waze-logo.png";
import { Link } from "react-router-dom";
import { useLanguage } from "../../hooks/useLang";
import arabicLang from "../../../public/translation/arabic/footer.json";
import hebrewLang from "../../../public/translation/hebraw/footer.json";

const Footer = () => {
  const lang = useLanguage(arabicLang, hebrewLang);
  return (
    <footer className="bg-pink-default" id="footer">
      <div className="container flex flex-col md:flex-row-reverse gap-x-2 mx-auto items-start py-20 ">
        {/* about */}
        <div className="flex-1 mb-5 md:mb-0" data-aos="fade-up">
          <h4 className="text-4xl font-bold mb-4">{lang.aboutUs}</h4>
          <p>{lang.aboutUsDesc}</p>
        </div>
        {/* Quick Links */}
        <div className="flex-1 mb-5 md:mb-0" data-aos="fade-down">
          <h4 className="text-4xl font-bold mb-4">{lang.quickLinks}</h4>
          <ul>
            <li className="mb-3">
              <Link to="#">{lang.linkHome}</Link>
            </li>
            <li className="mb-3">
              <Link to="#">{lang.linkGallery}</Link>
            </li>
          </ul>
        </div>
        {/* Contact US */}
        <div className="flex-1 mb-5 md:mb-0" data-aos="fade-up">
          <h4 className="text-4xl font-bold mb-4">{lang.contactUs}</h4>
          <ul>
            <li className="flex items-start mb-4">
              <Link
                to="https://www.waze.com/live-map/directions?to=ll.32.656667%2C35.291455"
                target="_blank"
                className="flex items-start"
              >
                <div className="pt-1 ml-2">
                  <div className="w-[15px] h-[15px]">
                    <img src={wazeLogo} alt="logo" className="h-full w-full" />
                  </div>
                </div>
                <p>{lang.address}</p>
              </Link>
            </li>
            <li className="flex items-start mb-4">
              <div className="pt-1 ml-2">
                <MdPhoneIphone />
              </div>
              <p>{lang.mobileNumber}</p>
            </li>
            <li className="flex items-start mb-4">
              <div className="pt-1 ml-2">
                <CiMail />
              </div>
              <p>
                <Link to={`mailto:${lang.mail}`} target="_blank">
                  {lang.email}
                </Link>
              </p>
            </li>
            <li className="flex items-start mb-4">
              <div className="pt-1 ml-2">
                <HiOfficeBuilding />
              </div>
              <p>{lang.office}</p>
            </li>
          </ul>
        </div>
        {/* Social Links */}
        <div className="flex-1 mb-5 md:mb-0" data-aos="fade-down">
          <h4 className="text-4xl font-bold mb-4">{lang.socialLinks}</h4>

          <ul className="flex mt-6">
            <li className="w-6 h-6 mr-3">
              <Link to="#">
                <img src={wazeLogo} alt="logo" className="h-full w-full" />
              </Link>
            </li>

            <li className="w-6 h-6 mr-3">
              <Link
                to="https://www.instagram.com/senorita.academy?igsh=MW1vbmo3ZzA0c3Zobw=="
                target="_blank"
              >
                <FaInstagram size={24} />
              </Link>
            </li>

            <li className="w-6 h-6 mr-3">
              <Link
                to="https://www.tiktok.com/@eyebrows_academy?_t=8o6gSQ4MLh2&_r=1"
                target="_blank"
              >
                <FaTiktok size={24} />
              </Link>
            </li>

            <li className="w-6 h-6 mr-3">
              <Link to="https://wa.me/972509011952" target="_blank">
                <FaWhatsapp size={24} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
