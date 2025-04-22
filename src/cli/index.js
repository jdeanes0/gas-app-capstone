// This file is where the cli will be run by inquirer.js.

const inquirer = require("inquirer");
const getGeocode = require("../services/mapbox/getGeocodeForAddress");

const validateNumber = (input) => {
  const parsed = parseFloat(input);
  if (isNaN(parsed)) {
    return "Please enter a number.";
  }
  return true;
};

async function runCLI() {
  const name = await inquirer.prompt([
    { type: "input", name: "username", message: "What is your name?" },
  ]);
  console.log(name);

  const mpg = await inquirer.prompt([
    {
      type: "input",
      name: "mpg",
      message: "What is your car's average miles per gallon?",
      validate: validateNumber,
    },
  ]);
  console.log(mpg);

  const tankSize = await inquirer.prompt([
    {
      type: "input",
      name: "tank",
      message: "How large is your car's gas tank??",
      validate: validateNumber,
    },
  ]);
  console.log(tankSize);

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
        validate: validateNumber,
      },
      {
        type: "input",
        name: "longitude",
        message: "Longitude?",
        validate: validateNumber,
      },
    ]);
    console.log(coordinates);
    coordsForMapbox = coordinates;
  }
  // We now have our coordinates. Time for a whole philosophical discussion on how to do the
  // important bits of the program.

  // A good gas station: one where the savings from cheaper gas outweigh the cost of travel.
  // So we can find the best station by combining the cost of gas for the tank and the cost to travel to a station.
  // At this point, the CLI is no longer needed, and can end. The rest of the program will be generating a report for each station.

}

runCLI();

module.exports = runCLI;
