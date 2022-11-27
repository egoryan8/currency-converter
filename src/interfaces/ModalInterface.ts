import {DetailedHTMLProps, Dispatch, HTMLAttributes, SetStateAction} from "react";

export interface ModalInterface extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
  currency: string;
  onChangeValue?: (value: number) => void;
  onChangeCurrency: (currency: string) => void;
  modalIsOpened: boolean;
  setModalIsOpened: Dispatch<SetStateAction<boolean>>;
  currenciesArr: string[];
}