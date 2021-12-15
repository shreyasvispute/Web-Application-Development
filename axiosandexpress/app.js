const people = require("./people");
const stocks = require("./stocks");

async function main() {
  try {
    const peopledata = await people.getPersonById(
      "7989fa5e-5617-43f7-a931-46036f9dbcff"
    );
    console.log(peopledata);
  } catch (e) {
    console.log(e);
  }
  try {
    const peopledata = await people.sameStreet("sutherland", "Point");
    console.log(peopledata);
  } catch (e) {
    console.log(e);
  }
  try {
    const peopledata = await people.sameBirthday("6", "9");
    console.log(peopledata);
  } catch (e) {
    console.log(e);
  }
  try {
    const peopledata = await people.manipulateSsn();
    console.log(peopledata);
  } catch (e) {
    console.log(e);
  }
  try {
    const stocksdata = await stocks.listShareholders();
    console.log(stocksdata);
  } catch (e) {
    console.log(e);
  }
  try {
    const stocksdata = await stocks.topShareholder("vital Therapies, Inc.");
    console.log(stocksdata);
  } catch (e) {
    console.log(e);
  }
  try {
    const stocksdata = await stocks.listStocks("      fred", "Gawn");
    console.log(stocksdata);
  } catch (e) {
    console.log(e);
  }
  try {
    const stocksdata = await stocks.getStockById(
      "   7283e5d6-7481-41cb-83b3-5a4a2da34717"
    );
    console.log(stocksdata);
  } catch (e) {
    console.log(e);
  }
}

main();
