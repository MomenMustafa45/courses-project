import React from "react";
import { useTranslation } from "react-i18next";
import styles from "../styles/ControlPanel.module.css"

interface Props {
  visible: boolean,
  onClose: () => void
}

const LanguageBox = ({ visible, onClose }: Props): React.JSX.Element => {
  const [translating, i18n] = useTranslation("global")
  const activeLanguage = i18n.language;

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    onClose()
  }

  return (
    <ul className={visible ? styles.cp_lang_box : `${styles.cp_lang_box} ${styles.cp_lang_box_hide}`}>
      <li
        className={`cursor-pointer ${activeLanguage === "ar" ? "bg-blue-500 text-white px-8" : "bg-white text-black px-8"} hover:bg-blue-500 hover:text-white`}
        onClick={() => handleChangeLanguage("ar")}
      >
        <p>{translating("languageBox.ar")}</p>
      </li>
      <li
        className={`cursor-pointer ${activeLanguage === "he" ? "bg-blue-500 text-white px-8" : "bg-white text-black px-8"} hover:bg-blue-500 hover:text-white`}
        onClick={() => handleChangeLanguage("he")}
      >
        <p>{translating("languageBox.he")}</p>
      </li>
    </ul>
  )
}

export default LanguageBox;