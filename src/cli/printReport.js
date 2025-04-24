/**
 * Prints the final report for the program.
 * @param {array} stationsAndCosts
 */
function printReport(stationsAndCosts) {
  stationsAndCosts.sort((a, b) => a.totalCost - b.totalCost);
  const sorted = stationsAndCosts;
  // console.log(sorted);
  console.log("The best station for you is:");
  console.log(sorted[0].name + " at " + sorted[0].address);
  console.log("With a total cost of:");
  console.log("$" + sorted[0].totalCost.toFixed(3));
  console.log("\n")
  console.log("The second best station for you is:");
  console.log(sorted[1].name + " at " + sorted[1].address);
  console.log("With a total cost of:");
  console.log("$" + sorted[1].totalCost.toFixed(3));
}

module.exports = printReport;
