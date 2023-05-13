import React, {useState} from 'react';
import {motion} from 'framer-motion';
import i18n from "../../i18n";
import useLocalStorage from "../../hooks/useLocalStorage";
import {useTranslation} from "react-i18next";
import cn from "classnames";
import styles from './Language.module.scss';

// import "/node_modules/flag-icons/css/flag-icons.min.css";

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
        </motion.ul>
      }
    </div>
  );
};

export default Language;