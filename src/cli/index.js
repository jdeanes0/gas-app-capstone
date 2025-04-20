// This file is where the cli will be run by inquirer.js.

const inquirer = require("inquirer");
const getGeocode = require("../services/mapbox/getGeocodeForAddress");

async function runCLI() {
  const name = await inquirer.prompt([
    { type: "input", name: "username", message: "What is your name?" },
  ]);
  console.log(name);

  const mpg = await inquirer.prompt([
    {
      type: "input",
      name: "mpg",
      message: "What is your car's miles per gallon average?",
      validate: (input) => {
        const parsed = parseFloat(input);
        if (isNaN(parsed)) {
          return "Please enter a number.";
        }
        return true;
      },
    },
  ]);
  console.log(mpg);

  const method = await inquirer.prompt([
    // Will the user want to do coordinates or an address?
    {
      type: "list",
      name: "positionType",
      message:
        "Do you have an address or coordinates of your current position?",
      choices: ["address", "coordinates"],
    },
  ]);
  console.log(method);

  let coordsForMapbox;
  // Permanent branch here based on address type.
  if (method.positionType === "address") {
    // Get the address
    const address = await inquirer.prompt([
      {
        type: "input",
        name: "address",
        message: "What is your current address?",
      },
    ]);
    // console.log(address);
    const apiCoords = await getGeocode(address.address);
    console.log(apiCoords);

  } else {
    // Get the coordinates with two prompts
    const coordinates = await inquirer.prompt([
      {
        type: "input",
        name: "latitude",
        message: "Latitude?",
        validate: (input) => {
          const parsed = parseFloat(input);
          if (isNaN(parsed)) {
            return "Please enter a number.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "longitude",
        message: "Longitude?",
        validate: (input) => {
          const parsed = parseFloat(input);
          if (isNaN(parsed)) {
            return "Please enter a number.";
          }
          return true;
        },
      },
    ]);
    console.log(coordinates);
    coordsForMapbox = coordinates;
  }
}

runCLI();
