import {motion} from 'framer-motion';
import React, {ChangeEvent, useState} from 'react';
import {BlockInterface} from "../interfaces/BlockInterface";

const defaultCurrencies = ['RUB', 'USD', 'EUR', 'UAH'];

export const Block: React.FC<BlockInterface>
  = ({
     value,
     currency,
     onChangeValue,
     onChangeCurrency,
     currencyTitle,
     currencies
  }) => {
  const currenciesArr = currencies ? Object.keys(currencies) : [];
  const [modalIsOpened, setModalIsOpened] = useState(false);

  const variants = {
    closed: {
      height: 0,
      opacity: 0,
    },
    opened: {
      height: '200%',
      opacity: 1,
    },
  };

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
          <svg height="50px" viewBox="0 0 50 50" width="50px">
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
      <motion.ul
        className="currencies modal-currencies"
        animate={modalIsOpened ? 'opened' : 'closed'}
        initial={'closed'}
        variants={variants}
        transition={{ type: "spring", stiffness: 70 }}
      >
        {
          currenciesArr.length > 0 && currenciesArr.map(c => (
            <li
              onClick={() => {
                onChangeCurrency(c);
                setModalIsOpened(false);
              }}
              className={currency === c ? 'active' : ''}
              key={c}>
              {c}
            </li>
          ))
        }
      </motion.ul>
    </div>
  )
};