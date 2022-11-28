import React from 'react';
import {RatesItemInterface} from "../../interfaces/RatesItemInterface";
import styles from './RatesItem.module.scss';

const RatesItem: React.FC<RatesItemInterface> = ({char, name, value, baseValue}) => {
  const finalValue = value / baseValue;
  return (
    <li className={styles.item}>
      <div>
        {char}
      </div>
      <div>
        {name}
      </div>
      <div>
        {finalValue.toFixed(4)}
      </div>
    </li>
  );
};

export default RatesItem;