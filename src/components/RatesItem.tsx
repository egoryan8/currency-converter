import React from 'react';
import styles from '../pages/rates.module.scss';

export interface RatesItemInterface {
  char: string;
  name: string;
  value: number;
  baseValue: number;
}

const RatesItem: React.FC<RatesItemInterface> = ({char, name, value, baseValue}) => {
  console.log('base: ', baseValue);

  const valueF = value / baseValue;
  return (
    <li className={styles.rateItem}>
      <div>
        {char}
      </div>
      <div>
        {name}
      </div>
      <div>
        {valueF.toFixed(4)}
      </div>
    </li>
  );
};

export default RatesItem;