import { ApiClient } from "../utils/apiClient";
import { CurrencyService } from "./currencyService";

jest.mock("../utils/apiClient");
const mockedApiClient = ApiClient as jest.Mocked<typeof ApiClient>;

describe("CurrencyService", () => {
  it("should convert currency", async () => {
    const mockData = {
      rates: {
        EUR: 0.9,
      },
    };

    mockedApiClient.getExchangeRate.mockResolvedValue(mockData);

    const result = await CurrencyService.convert("USD", "EUR", 100);

    expect(result).toEqual(90);
    expect(mockedApiClient.getExchangeRate).toHaveBeenCalledWith("USD");
  });
});
