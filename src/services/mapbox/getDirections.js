// This file will do stuff with mapbox. Wohoo.

require("dotenv").config(); // needed in the case that the file is run separately
const env = require("../../config");

const axios = require("axios");

const profile = "driving";

async function getRouteLength(source, station) {
  // console.log(source, station);
  try {
    // const s = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${source.longitude},${source.latitude};${station.longitude},${station.latitude}?access_token=${env.mapBoxToken}`;
    // console.log(s);
    const res = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/${profile}/${source.longitude},${source.latitude};${station.longitude},${station.latitude}?access_token=${env.mapBoxToken}`
    );
    // res.data.routes[0].distance will be in meters, switch to miles for this project to simplify future calculations
    // console.log(res);
    const meters = res.data.routes[0].distance;
    const miles = meters / 1609;
    return miles;
  } catch (error) {
    // console.error(error);
  }
}

module.exports = getRouteLength;
