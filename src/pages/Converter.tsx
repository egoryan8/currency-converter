import React, {useEffect, useRef, useState} from 'react';
import {RatesInterface} from "../interfaces/RatesInterface";
import {Block} from "../components/Block";
import Header from "../components/Header";

const Converter: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('RUB');
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);
  const [fromCurrencyTitle, setFromCurrencyTitle] = useState('Доллар США');
  const [toCurrencyTitle, setToCurrencyTitle] = useState('Российский рубль');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ratesRef = useRef<RatesInterface>({});

  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
      .then(res => res.json())
      .then(res => {
        ratesRef.current = res.Valute;
        onChangeFromPrice(1);
      })
      .catch(err => {
        console.warn(err);
        alert('Что-то пошло не так');
      });
  }, []);

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency, fromPrice, toCurrency]);

  const onChangeFromCurrency = (cur: string) => {
    setFromCurrency(cur);
    cur === 'RUB' ?
      setFromCurrencyTitle('Российский рубль')
      : setFromCurrencyTitle(ratesRef.current[cur].Name);
  }

  const onChangeToCurrency = (cur: string) => {
    setToCurrency(cur);
    cur === 'RUB' ?
      setToCurrencyTitle('Российский рубль')
      : setToCurrencyTitle(ratesRef.current[cur].Name);
  }

  const onChangeFromPrice = (value: number) => {
    const result = ratesRef.current
      ? (toCurrency === fromCurrency
        ? value
        : fromCurrency === 'RUB'
          ? (Number(value) / (ratesRef.current[toCurrency]?.Value / ratesRef.current[toCurrency]?.Nominal))
          : toCurrency === 'RUB'
            ? (Number(value) * (ratesRef.current[fromCurrency]?.Value / ratesRef.current[fromCurrency]?.Nominal))
            : (Number(value) * (ratesRef.current[fromCurrency]?.Value / ratesRef.current[fromCurrency]?.Nominal) / (ratesRef.current[toCurrency]?.Value / ratesRef.current[toCurrency]?.Nominal)))
      : 0;
    setToPrice(result);
    setFromPrice(value);
  };
  // @ts-ignore
  return (
    <>
      <Header/>
      <div className="App">
        <Block
          value={fromPrice}
          currency={fromCurrency}
          onChangeCurrency={onChangeFromCurrency}
          onChangeValue={onChangeFromPrice}
          currencyTitle={fromCurrencyTitle}
          currencies={ratesRef?.current}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
          <svg version="1.1" x="0px" y="0px" viewBox="0 0 96 96">
            <path d="M12,52h62.344L53.172,73.172c-1.562,1.562-1.562,4.094,0,5.656c1.562,1.562,4.095,1.562,5.657,0l28-28
			      c1.562-1.562,1.562-4.095,0-5.656l-28-28C58.048,16.391,57.024,16,56,16c-1.023,0-2.047,0.391-2.828,1.172
			      c-1.562,1.562-1.562,4.095,0,5.656L74.344,44H12c-2.209,0-4,1.791-4,4S9.791,52,12,52z"/>
          </svg>
        <Block
          value={Math.floor(toPrice * 100) / 100}
          currency={toCurrency}
          onChangeCurrency={onChangeToCurrency}
          currencyTitle={toCurrencyTitle}
          currencies={ratesRef?.current}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </>
  );
};

export default Converter;