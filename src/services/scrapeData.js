// Scrapes data from the external data source every so often.
// We will want to scrape 21502 & 21532 for this app's initial version.

const zips = ["21502", "21532"];

const puppeteer = require("puppeteer");

const getPrices = async (zipcode) => {
  const browser = await puppeteer.launch({
    headless: true, // eventually set to true
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto(
    `https://www.gasbuddy.com/home?search=${zipcode}&fuel=1&method=all&maxAge=0`,
    {
      waitUntil: "networkidle2",
    }
  );

  await page.waitForSelector(".GenericStationListItem-module__station___1O4vF"); // Wait for the station items to appear

  const prices = await page.evaluate(() => {
    const stations = Array.from(
      document.querySelectorAll(
        ".GenericStationListItem-module__station___1O4vF"
      )
    );

    return stations.map((station) => {
      const name = station
        .querySelector(".StationDisplay-module__stationNameHeader___1A2q8")
        .innerText.trim();
      const address = station
        .querySelector(".StationDisplay-module__address___2_c7v")
        .innerText.trim();
      const price = station
        .querySelector(".StationDisplayPrice-module__price___3rARL")
        .innerText.trim();

      return { name, address, price };
    });
  });

  console.log(prices);

  await browser.close();
};

function runPricesScraper() {
  zips.forEach((zipcode) => getPrices(zipcode));
}

module.exports = runPricesScraper;
