require("dotenv").config();

const runPricesScraper = require("./services/scraping/scrapeData");
const runCLI = require("./cli/index");
const calculatePrices = require("./cli/calculatePrices");

setInterval(() => {
  runPricesScraper();
}, 60 * 60 * 1000); // 1 hour

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  while (true) {
    const userData = await runCLI();

    await calculatePrices(
      userData.mpg,
      userData.tankSize,
      userData.coordsForMapbox
    );

    await sleep(3000);
    console.log(
      "\nThank you for using my program! Restarting in 3 seconds...\n\n\n"
    );
    await sleep(3000);
  }
}

main();
