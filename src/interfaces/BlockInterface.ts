import {RatesInterface} from "./RatesInterface";
import {Dispatch, SetStateAction} from "react";

export interface BlockInterface {
  value: number;
  currency: string;
  onChangeValue?: (value: number) => void;
  onChangeCurrency: (currency: string) => void;
  currencyTitle?: string;
  currencies?: RatesInterface;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}