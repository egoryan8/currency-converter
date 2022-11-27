import React, {ChangeEvent, useState} from 'react';
import {BlockInterface} from "../interfaces/BlockInterface";
import Modal from "./Modal";

const defaultCurrencies = ['RUB', 'USD', 'EUR', 'UAH'];

export const Block: React.FC<BlockInterface>
  = ({
       value,
       currency,
       onChangeValue,
       onChangeCurrency,
       currencyTitle,
       currencies,
     }) => {
  const currenciesArr = currencies ? Object.keys(currencies) : [];
  const [modalIsOpened, setModalIsOpened] = useState(false);

  return (
    <div className="block">
      <p className="currency__title">{currencyTitle}</p>
      <ul className="currencies">
        {defaultCurrencies.map((cur) => (
          <li
            onClick={() => onChangeCurrency(cur)}
            className={currency === cur ? 'active' : ''}
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
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (onChangeValue) {
            //@ts-ignore
            onChangeValue(e.target.value);
          }
        }}
        value={value}
        type="number"
        placeholder={'0'}
      />
      <Modal currency={currency} onChangeCurrency={onChangeCurrency} modalIsOpened={modalIsOpened} setModalIsOpened={setModalIsOpened} currenciesArr={currenciesArr}/>
    </div>
  )
};