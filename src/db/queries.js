// This file is in charge of housing any common sqlite queries.

const path = require("path");
const Database = require("better-sqlite3");
const dbPath = path.join(__dirname, "app.db");
const db = new Database(dbPath);

/**
 *
 * @returns An array of all stations in the database
 */
function getAllStations() {
  const rows = db.prepare("SELECT * FROM stations").all();

  // rows.forEach((row) => console.log(row));
  return rows;
}

/**
 *
 * @returns An array of all stations in the table that don't have coordinates
 */
function getStationsWithoutCoordinates() {
  const rows = db.prepare("SELECT * FROM stations").all();
  const locationsToProcess = rows.filter(
    (row) => !row.latitude || !row.longitude
  );
  // const addresses = locationsToProcess.map((loc) => loc.address);

  // addresses.forEach((address) => console.log(address));
  return locationsToProcess;
}

function getCoordinatesByAddress(address) {
  const stmt = db.prepare("SELECT * FROM stations WHERE address=?");
  const station = stmt.get(address);

  if (!station.latitude || !station.longitude) {
    throw new Error("Address has not been geocoded.");
  }

  return {
    latitude: station.latitude,
    longitude: station.longitude,
  };
}

// getAllStations();
// getAddressesWithoutCoordinates();
// console.log(getCoordinatesByAddress("15808 McMullen Hwy SW, Bel Air, MD"));

module.exports = {
  getAllStations,
  getStationsWithoutCoordinates,
  getCoordinatesByAddress,
};
