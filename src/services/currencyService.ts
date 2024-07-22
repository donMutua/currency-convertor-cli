import { ApiClient } from "../utils/apiClient";

export class CurrencyService {
  static async convert(
    from: string,
    to: string,
    amount: number
  ): Promise<number> {
    const exchangeRates = await ApiClient.getExchangeRate(from);
    const rate = exchangeRates.rates[to];
    return rate * amount;
  }
}
