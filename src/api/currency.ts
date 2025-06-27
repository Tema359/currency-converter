import type {
  CurrencyResponse,
  Currency,
  ConvertCurrency,
  ConvertCurrencyParams,
} from "../interfaces/currency";
import axiosInstance from "../lib/axios";

const getCurrencies = async () => {
  const response = await axiosInstance.get<CurrencyResponse<Currency[]>>(
    "currencies",
  );
  
  return response.data.response;
};

const convertCurrency = async ({ from, to, amount }: ConvertCurrencyParams) => {
  const response = await axiosInstance.get<CurrencyResponse<ConvertCurrency>>(
    "convert",
    {
      params: { from, to, amount },
    },
  );
  return response.data.response;
};

export { getCurrencies, convertCurrency };
