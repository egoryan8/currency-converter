import React from 'react';
import styles from '../pages/rates.module.scss';
import {RatesItemInterface} from "../interfaces/RatesItemInterface";

const RatesItem: React.FC<RatesItemInterface> = ({char, name, value, baseValue}) => {
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