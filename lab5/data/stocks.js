const { default: axios } = require("axios");

async function getStocks() {
  const { data } = await axios
    .get(
      "https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json"
    )
    .catch(function (e) {
      throw "Error: Data connection error " + e.response.data;
    });
  return data;
}

function validate(str) {
  if (!str) {
    throw "Error: Expected parameter missing";
  }
  if (typeof str != "string") {
    throw "Error: Expected parameter of type string";
  }
  if (!isNaN(str)) {
    throw "Error: Expected string but got number or blank spaces instead";
  }
}

async function getStockById(id) {
  validate(id);
  let obj = {};
  const stocksdata = await getStocks();
  stocksdata.forEach((x) => {
    if (x.id == id.trim()) {
      obj = x;
    }
  });
  if (Object.keys(obj).length === 0) {
    throw "Error: Stock not found";
  }
  return obj;
}

module.exports = {
  getStocks,
  getStockById,
};
