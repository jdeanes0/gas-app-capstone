// This file will do stuff with mapbox. Wohoo.

require("dotenv").config(); // needed in the case that the file is run separately
const env = require("../../config");

const axios = require("axios");

const profile = "driving";

async function getRouteLength(source, station) {
  try {
    const res = await axios.get(
      `https://api.mapbox.com/directions/v5/${profile}/${source.longitude},${source.latitude};${station.longitude},${station.latitude}?access_token=${env.mapBoxToken}`
    );
    // res.routes[0].distance will be in meters, switch to miles for this project to simplify future calculations
  } catch (error) {
    console.error(error);
  }
}
