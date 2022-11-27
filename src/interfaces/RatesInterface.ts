export interface RateInterface {
  "ID": string,
  "NumCode": string,
  "CharCode": string,
  "Nominal": number,
  "Name": string,
  "Value": number,
  "Previous": number,
}

export interface RatesInterface {
  [key: string]: RateInterface
}