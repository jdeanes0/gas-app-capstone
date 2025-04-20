const runPricesScraper = require("./services/scrapeData");

setInterval(() => {
  runPricesScraper();
}, 60 * 1000) // 60 seconds
