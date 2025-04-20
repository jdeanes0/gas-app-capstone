require('dotenv').config();

const runPricesScraper = require("./services/scraping/scrapeData");
const mapBoxToken = require("./config");

setInterval(() => {
  runPricesScraper();
}, 60 * 1000) // 60 seconds

console.log(mapBoxToken);
