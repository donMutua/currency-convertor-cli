import axios from "axios";

const API_URL = "https://open.er-api.com/v6/latest";

export class ApiClient {
  static async getExchangeRate(baseCurrency: string) {
    try {
      const response = await axios.get(`${API_URL}/${baseCurrency}`);
      return response.data;
    } catch (error: any) {
      throw new Error(`Error fetching exchange rate: ${error.message}`);
    }
  }
}
