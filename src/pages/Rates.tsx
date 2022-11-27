import React, {useEffect, useRef, useState} from 'react';
import styles from './rates.module.scss';
import {RatesInterface} from "../interfaces/RatesInterface";
import RatesItem from "../components/RatesItem";
import Modal from "../components/Modal";

const defaultCurrencies = ['RUB', 'USD', 'EUR', 'UAH'];

const Rates: React.FC = () => {
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
        console.log(ratesRef.current);
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
      <h1 className="header">Курсы валют</h1>
      <div className={styles.baseCurrency}>
        <h2>Базовая валюта: </h2>
        <ul className="currencies">
          {defaultCurrencies.map((cur) => (
            <li
              onClick={() => onChangeBaseCur(cur)}
              className={baseCurrency === cur ? 'active' : ''}
              key={cur}>
              {cur}
            </li>
          ))}
          <li onClick={() => setModalIsOpened(!modalIsOpened)}>
            <svg height="50px" viewBox="0 0 50 50" width="50px" className={modalIsOpened ? 'arrow up' : 'arrow'}>
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
          <div>Знак валюты</div>
          <div>Полное наименование валюты</div>
          <div>Курс к базовой валюте&nbsp;
            {baseCurrency && <span>({baseCurrency})</span>}
          </div>
        </li>
        {
          ratesArray.length > 0 && baseCurrency
            ? ratesArray.map(i =>
              <RatesItem
                key={i.CharCode}
                char={i.CharCode}
                name={i.Name}
                value={i.Value / i.Nominal}
                baseValue={baseValue}
              />)
            : <li className={styles.pickBase}>Выберете базовую валюту</li>
        }
      </ul>
    </div>
  );
};

export default Rates;