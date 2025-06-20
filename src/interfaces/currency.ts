interface CurrencyMeta {
  code: number;
  error_detail?: string;
  error_type?: string;
  disclaimer?: string;
}

interface CurrencyResponse<T> {
  response: T;
  meta: CurrencyMeta;
}

interface Currency {
  id: number;
  name: string;
  short_code: string;
  code: string;
  precision: number;
  subunit: number;
  symbol: string;
  symbol_first: boolean;
  decimal_mark: string;
  thousands_separator: string;
}

interface ConvertCurrency {
  timestamp: number;
  date: string;
  from: string;
  to: string;
  amount: number;
  value: number;
}

interface ConvertCurrencyParams {
  from: string;
  to: string;
  amount: number;
}

export type {
  Currency,
  CurrencyResponse,
  ConvertCurrency,
  ConvertCurrencyParams,
};
