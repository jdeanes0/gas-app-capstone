// This file will contain a function to log our scraped data

const path = require("path");
const Database = require("better-sqlite3");
const dbPath = path.join(__dirname, "../../db/app.db");
const db = new Database(dbPath); // Oh yeah. sqlite time.

function replaceNewlineChar(string) {
  return string.replaceAll("\n", " ");
}

/**
 * This will log any new entries into the table
 * @param scrapedStations
 */
async function logNewScrapedData(scrapedStations) {
  const stmt = db.prepare(
    "INSERT OR IGNORE INTO stations (name, address, price) VALUES (?, ?, ?)"
  );
  for (const zipcode of scrapedStations) {
    for (const station of zipcode) {
      stmt.run(
        station.name,
        replaceNewlineChar(station.address),
        parseFloat(station.price.substring(1)) ?? null
      );
    }
  }
}

/**
 * And this function will update the existing entries in the table with new price data.
 * @param {} scrapedStations 
 */
async function logUpdatedData(scrapedStations) {
  const stmt = db.prepare("UPDATE stations SET price=? WHERE address=?");
  for (const zipcode of scrapedStations) {
    for (const station of zipcode) {
      stmt.run(
        replaceNewlineChar(station.address),
        parseFloat(station.price.substring(1)) ?? null
      );
    }
  }
}

module.exports = { logNewScrapedData, logUpdatedData };
