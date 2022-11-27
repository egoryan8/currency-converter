import {RatesInterface} from "./RatesInterface";

export interface BlockInterface {
  value: number;
  currency: string;
  onChangeValue?: (value: number) => void;
  onChangeCurrency: (currency: string) => void;
  currencyTitle?: string;
  currencies?: RatesInterface;
}