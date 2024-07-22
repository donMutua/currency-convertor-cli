import { Command } from "commander";
import { CurrencyService } from "./services/currencyService";

const program = new Command();

program
  .version("1.0.0")
  .description("Currency converter CLI")
  .option("-f, --from <currency>", "Currency to convert from")
  .option("-t, --to <currency>", "Currency to convert to")
  .option("-a, --amount <amount>", "Amount to convert", parseFloat)
  .action(async (options) => {
    const { from, to, amount } = options;
    if (!from || !to || !amount) {
      console.error("Please provide from, to, and amount options");
      process.exit(1);
    }

    try {
      const convertedAmount = await CurrencyService.convert(from, to, amount);
      console.log(`converted amount: ${convertedAmount}`);
    } catch (error: any) {
      console.error(`Error converting currency: ${error.message}  `);
      process.exit(1);
    }
  });

program.parse(process.argv);
