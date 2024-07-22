import axios from "axios";
import { ApiClient } from "./apiClient";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("ApiClient", () => {
  it("should fetch exchange rate", async () => {
    const mockData = {
      rates: {
        USD: 1.2,
        EUR: 0.9,
      },
    };

    mockedAxios.get.mockResolvedValue({ data: mockData });

    const result = await ApiClient.getExchangeRate("USD");
    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://open.er-api.com/v6/latest/USD"
    );
  });

  it("should throw an error if the request fails", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Request failed"));

    await expect(ApiClient.getExchangeRate("USD")).rejects.toThrow(
      "Error fetching exchange rate: Request failed"
    );
  });
});
