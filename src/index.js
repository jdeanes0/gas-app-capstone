require("dotenv").config();

const runPricesScraper = require("./services/scraping/scrapeData");
// const mapBoxToken = require("./config");
const runCLI = require("./cli/index");
const calculatePrices = require("./cli/calculatePrices");

// setInterval(() => {
//   runPricesScraper();
// }, 60 * 60 * 1000); // 1 hour

// console.log(mapBoxToken);

async function main() {
  const userData = await runCLI();

  const travelCosts = calculatePrices(
    userData.mpg,
    userData.tankSize,
    userData.coordsForMapbox
  );
}

main();
