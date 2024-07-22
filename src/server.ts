import express from "express";
import { CurrencyService } from "./services/currencyService";

const app = express();
const port = 4000;

app.get("/convert", async (req, res) => {
  const { from, to, amount } = req.query;
  if (!from || !to || !amount) {
    return res
      .status(400)
      .send("Please provide from, to, and amount query parameters");
  }

  try {
    const convertedAmount = await CurrencyService.convert(
      from as string,
      to as string,
      parseFloat(amount as string)
    );
    res.json({ convertedAmount });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export { app };
