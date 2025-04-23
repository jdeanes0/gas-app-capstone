// We have addresses. Mapbox wants coordinates. So, if a DB record doesn't have coordinates, use its address to find them.
// Then, update the table accordingly.
// This will probably not be run via. index, as it feels like it would be unnecessary to.
require("dotenv").config();
const env = require("../../config");

const axios = require("axios");
const {
  getStationsWithoutCoordinates,
  updateAddressWithCoordinates,
} = require("../../db/queries");

function replaceNewlineChar(string) {
  return string.replaceAll("\n", " ");
}

const getGeocode = async (address) => {
  try {
    const res = await axios.get(
      `https://api.mapbox.com/search/geocode/v6/forward?q=${address}&access_token=${env.mapBoxToken}`
    );
    const coords = res.data.features[0].properties.coordinates;
    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };
  } catch (error) {
    console.error(
      "Error fetching geocode:",
      error.response?.data || error.message
    );
    return null;
  }
};

async function addGeocodingToStations() {
  const stations = await getStationsWithoutCoordinates();
  await Promise.all(
    stations.map(async (station) => {
      const coords = await getGeocode(replaceNewlineChar(station.address));
      await updateAddressWithCoordinates(
        station.address,
        coords.longitude,
        coords.latitude
      );
    })
  );
}

addGeocodingToStations();

module.exports = { getGeocode, addGeocodingToStations };
