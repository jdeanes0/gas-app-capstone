// This file will take the variables given by the cli and use them to calculate the best gas prices.

const { getAllStations } = require("../db/queries");
const getRouteLength = require("../services/mapbox/getDirections");
const printReport = require("./printReport");

async function calculatePrices(mpg, tankSize, coordinates) {
  const stations = await getAllStations();

  const stationsAndDistances = [];
  for (const station of stations) {
    const distance = await getRouteLength(coordinates, station);
    stationsAndDistances.push({
      ...station,
      distance,
    });
  }

  // Stations how have distances attached. Now for the easy part.
  const stationsAndCosts = [];
  for (const station of stationsAndDistances) {
    // The cost will be price of tank + price of driving
    const priceOfTank = tankSize * station.price;
    const gallonsToStation = station.distance / mpg;
    const priceOfDriving = gallonsToStation * station.price;
    const addedCost = station.price === null ? Number.POSITIVE_INFINITY : 0;
    stationsAndCosts.push({
      ...station,
      totalCost: priceOfTank + priceOfDriving + addedCost,
    })
  }

  printReport(stationsAndCosts);
}

module.exports = calculatePrices;
