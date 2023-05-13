import React, {useEffect, useRef, useState} from 'react';
import styles from '../styles/rates.module.scss';
import {RatesInterface} from "../interfaces/RatesInterface";
import RatesItem from "../components/RatesItem/RatesItem";
import Modal from "../components/Modal";
import Header from "../components/Header/Header";
import cn from "classnames";
import {useTranslation} from "react-i18next";

const defaultCurrencies = ['RUB', 'USD', 'EUR'];

const Rates: React.FC = () => {
  // @ts-ignore
  const {t} = useTranslation();
  const [baseCurrency, setBaseCurrency] = useState('');
  const [modalIsOpened, setModalIsOpened] = useState(false);
  const [baseValue, setBaseValue] = useState(0);
  const ratesRef = useRef<RatesInterface>({});
  const ratesArray = Object.values(ratesRef.current);

  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
      .then(res => res.json())
      .then(res => {
        ratesRef.current = res.Valute;
      })
      .catch(err => {
        console.warn(err);
        alert('Что-то пошло не так');
      });
  }, []);

  const onChangeBaseCur = (cur: string) => {
    setBaseCurrency(cur);
    cur === 'RUB' ? setBaseValue(1) : setBaseValue(ratesRef?.current[cur]?.Value / ratesRef?.current[cur].Nominal);
  };

  return (
    <div className={styles.wrapper}>
      <Header/>
      <div className={styles.baseCurrency}>
        <h2>{t('baseCurrency')}</h2>
        <ul className="currencies">
          {defaultCurrencies.map((cur) => (
            <li
              onClick={() => onChangeBaseCur(cur)}
              className={cn({
                'active': baseCurrency === cur,
              })}
              key={cur}>
              {cur}
            </li>
          ))}
          <li onClick={() => setModalIsOpened(!modalIsOpened)}>
            <svg height="50px" viewBox="0 0 50 50" width="50px" className={cn("arrow", {
              "up": modalIsOpened,
            })}>
              <rect fill="none" height="50" width="50"/>
              <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 "/>
            </svg>
          </li>
        </ul>
      </div>
      <Modal
        currency={baseCurrency}
        onChangeCurrency={onChangeBaseCur}
        modalIsOpened={modalIsOpened}
        setModalIsOpened={setModalIsOpened}
        currenciesArr={Object.keys(ratesRef.current)}
        className={styles.modal}
      />
      <ul className={styles.rates}>
        <li className={styles.ratesHeadings}>
          <div>{t('char')}</div>
          <div>{t('fullName')}</div>
          <div>{t('rateToBase')}&nbsp;
            {baseCurrency && <span>({baseCurrency})</span>}
          </div>
        </li>
        {
          ratesArray.length > 0 && baseCurrency
            ? ratesArray.map(i =>
              <RatesItem
                key={i.ID}
                char={i.CharCode}
                name={i.Name}
                value={i.Value / i.Nominal}
                baseValue={baseValue}
              />)
            : <li className={styles.pickBase}>{t('pickBase')}</li>
        }
      </ul>
    </div>
  );
};

export default Rates;