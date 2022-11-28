import React, {useState} from 'react';
import {motion} from 'framer-motion';
import i18n from "../../i18n";
import useLocalStorage from "../../hooks/useLocalStorage";
import {useTranslation} from "react-i18next";
import cn from "classnames";
import styles from './Language.module.scss';

import "/node_modules/flag-icons/css/flag-icons.min.css";

const Language = () => {
  const [language, setLanguage] = useLocalStorage('language', 'ru');
  // @ts-ignore
  const {t} = useTranslation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(language);
  const variants = {
    closed: {
      height: 0,
      opacity: 0,
    },
    opened: {
      height: 'auto',
      opacity: 1,
    },
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    setCurrentLang(lang);
    setModalIsOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.currenLang}>
        <span className={"fi fi-" + (currentLang === 'en' ? 'us' : currentLang)}></span>
        <p>{currentLang.toUpperCase()}</p>
        <svg
          onClick={() => setModalIsOpen(!modalIsOpen)}
          height="20px"
          viewBox="0 0 50 50"
          width="20px"
          fill="white"
          className={cn("arrow", {
            "up": modalIsOpen,
          })}
        >
          <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 "/>
        </svg>
      </div>
      {
        modalIsOpen &&
        <motion.ul
          className={styles.modal}
          animate={modalIsOpen ? 'opened' : 'closed'}
          initial={'closed'}
          variants={variants}
          transition={{type: "spring", stiffness: 70}}
        >
          <li className={styles.item} onClick={() => handleLanguageChange('ru')}>
            <span className="fi fi-ru"></span>
            RU
          </li>
          <li className={styles.item} onClick={() => handleLanguageChange('en')}>
            <span className="fi fi-us"></span>
            EN
          </li>
          <li className={styles.item} onClick={() => handleLanguageChange('kz')}>
            <span className="fi fi-kz"></span>
            KZ
          </li>
          <li className={styles.item} onClick={() => handleLanguageChange('ua')}>
            <span className="fi fi-ua"></span>
            UA
          </li>
          <li className={styles.item} onClick={() => handleLanguageChange('de')}>
            <span className="fi fi-de"></span>
            DE
          </li>
        </motion.ul>
      }
    </div>
  );
};

export default Language;