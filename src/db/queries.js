// This file is in charge of housing any common sqlite queries.

const path = require("path");
const Database = require("better-sqlite3")
const dbPath = path.join(__dirname, "app.db");
const db = new Database(dbPath);

async function getAllStations() {
  const rows = db.prepare("SELECT * FROM stations").all();

  rows.forEach((row) => console.log(row));
}

async function getAllStationAddresses() {
  const rows = db.prepare("SELECT * FROM stations").all();

  rows.forEach((row) => console.log(row));
}

getAllStations();

