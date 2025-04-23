
/**
 * Prints the final report for the program.
 * @param {array} stationsAndCosts 
 */
function printReport(stationsAndCosts) {
  stationsAndCosts.sort((a, b) => a.totalCost - b.totalCost);
  const sorted = stationsAndCosts;
  console.log(sorted);
  console.log("The best station for you is:");
  console.log(sorted[0].name);
  console.log("With a total cost of:");
  console.log(sorted[0].totalCost);
}

module.exports = printReport;
