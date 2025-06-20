import type { AxiosError } from "axios";
import type {
  ConvertCurrency,
  Currency,
  CurrencyResponse,
} from "../interfaces/currency";

export function extractApiError(error: unknown): string {
  const err = error as AxiosError<
    CurrencyResponse<Currency[] | ConvertCurrency>
  >;
  return err.response?.data?.meta?.error_detail || "Something went wrong.";
}
