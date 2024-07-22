import request from "supertest";
import { app } from "./server";
import { CurrencyService } from "./services/currencyService";

jest.mock("./services/currencyService");
const mockedCurrencyService = CurrencyService as jest.Mocked<
  typeof CurrencyService
>;

describe("Currency converter API", () => {
  it("should convert currency via API", async () => {
    mockedCurrencyService.convert.mockResolvedValue(90);

    const response = await request(app).get(
      "/convert?from=USD&to=EUR&amount=100"
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ convertedAmount: 90 });
  });

  it("should return 400 if parameters are missing", async () => {
    const response = await request(app).get("/convert");
    expect(response.status).toBe(400);
    expect(response.text).toBe(
      "Please provide from, to, and amount query parameters"
    );
  });

  it("should return 500 if an error occurs", async () => {
    mockedCurrencyService.convert.mockRejectedValue(
      new Error("Conversion failed")
    );

    const response = await request(app).get(
      "/convert?from=USD&to=EUR&amount=100"
    );

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Conversion failed" });
  });
});
