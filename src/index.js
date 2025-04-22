require('dotenv').config();

const runPricesScraper = require("./services/scraping/scrapeData");
// const mapBoxToken = require("./config");
const runCLI = require("./cli/index");

setInterval(() => {
  runPricesScraper();
}, 60 * 60 * 1000) // 1 hour

// console.log(mapBoxToken);

runCLI();
