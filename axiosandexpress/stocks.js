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

async function getPeople() {
  const { data } = await axios
    .get(
      "https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json"
    )
    .catch(function (e) {
      throw "Error: Data connection error " + e.response.data;
    });

  return data;
}

//const peopledata = await people.getPeople();
async function listShareholders() {
  if (arguments.length > 0) throw "Error: Function takes no arguments";

  const stocksdata = await getStocks();
  const peopleData = await getPeople();
  stocksdata.forEach((e) => {
    let objShareholders = [];

    e.shareholders.forEach((s) => {
      let obj = {};

      let x = getUserDetails(s, peopleData);
      obj["first_name"] = x.first_name;
      obj["last_name"] = x.last_name;
      obj["number_of_shares"] = x.number_of_shares;
      objShareholders.push(obj);
    });
    e.shareholders = objShareholders;
  });
  return stocksdata;
}

function getUserDetails(s, people) {
  let obj = {};
  people.forEach((x) => {
    if (x.id == s.userId) {
      obj.first_name = x.first_name;
      obj.last_name = x.last_name;
      obj.number_of_shares = s.number_of_shares;
    }
  });
  return obj;
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

async function topShareholder(stockName) {
  validate(stockName);
  stockName = stockName.trim();
  const data = await listShareholders();
  let shares = "";
  let firstlast = "";
  let result = "";
  data.forEach((x) => {
    if (x.stock_name == stockName) {
      let a = Math.max.apply(
        Math,
        x.shareholders.map(function (o) {
          return o.number_of_shares;
        })
      );
      x.shareholders.forEach((e) => {
        if (e.number_of_shares === a) {
          shares = a;
          firstlast = e.first_name + " " + e.last_name;
        }
      });
    }
  });
  if (!shares == 0) {
    result = `With ${shares} shares in ${stockName}, ${firstlast} is the top shareholder.`;
  } else {
    result = `${stockName} currently has no shareholders.`;
  }
  return result;
}

async function listStocks(firstName, lastName) {
  validate(firstName);
  validate(lastName);
  const stocksdata = await getStocks();
  let arr = [];
  var userId = await getNameData(firstName, lastName);
  stocksdata.forEach((x) => {
    x.shareholders.forEach((e) => {
      let p = {};
      if (e.userId == userId) {
        p["stock_name"] = x.stock_name;
        p["number_of_shares"] = e.number_of_shares;
        arr.push(p);
      }
    });
  });
  return arr;
}

async function getNameData(firstName, lastName) {
  firstName = firstName.trim();
  lastName = lastName.trim();
  const peopleData = await getPeople();
  userId = "";
  peopleData.forEach((y) => {
    if (y.first_name == firstName && y.last_name == lastName) {
      userId = y.id;
    }
  });
  if (userId == "") {
    throw "Error: No person with stock found";
  }
  return userId;
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
  listShareholders,
  topShareholder,
  listStocks,
  getStockById,
};
