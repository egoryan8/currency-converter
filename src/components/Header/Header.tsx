import React from 'react';
import {Link, NavLink} from "react-router-dom";
import styles from './Header.module.scss';
import {useTranslation} from "react-i18next";
import Language from "../Language/Language";
import cn from "classnames";

const Header = React.memo(() => {
  // @ts-ignore
  const {t} = useTranslation();

  return (
    <div className={styles.wrapper}>
      <Language/>
      <NavLink to="/" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>
        <h2 className={styles.heading}>
          {t('rates')}
        </h2>
      </NavLink>
      <NavLink to="/converter" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>
        <h2 className={styles.heading}>
          {t('converter')}
        </h2>
      </NavLink>
     </div>
  );
});

export default Header;