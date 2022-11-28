import React from 'react';
import {motion} from "framer-motion";
import cn from 'classnames';
import {ModalInterface} from "../interfaces/ModalInterface";

const Modal: React.FC<ModalInterface>
  = ({
       currenciesArr,
       onChangeCurrency,
       modalIsOpened,
       setModalIsOpened,
       currency,
       className
  }) => {
  const variants = {
    closed: {
      height: 0,
      opacity: 0,
    },
    opened: {
      height: '30vh',
      opacity: 1,
    },
  };

  return (
    <motion.ul
      className={cn(className,'currencies modal-currencies')}
      animate={modalIsOpened ? 'opened' : 'closed'}
      initial={'closed'}
      variants={variants}
      transition={{type: "spring", stiffness: 70}}
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
  );
};

export default Modal;