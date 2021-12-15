const { default: axios } = require("axios");

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

async function getPersonById(userid) {
  validate(userid);
  const peopledata = await getPeople();
  let people = {};
  peopledata.forEach((e) => {
    if (e.id == userid.trim()) {
      people = e;
    }
  });
  if (Object.keys(people).length === 0) {
    throw "Error: Person not found";
  }
  return people;
}

async function sameStreet(streetName, streetSuffix) {
  validate(streetName);
  validate(streetSuffix);
  const peopledata = await getPeople();
  let people = {};
  let arrayOfPeople = [];
  streetName = streetName.trim().toLowerCase();
  streetSuffix = streetSuffix.trim().toLowerCase();

  peopledata.forEach((e) => {
    if (
      (e.address.home.street_name.toLowerCase() == streetName &&
        e.address.home.street_suffix.toLowerCase() == streetSuffix) ||
      (e.address.work.street_name.toLowerCase() == streetName &&
        e.address.work.street_suffix.toLowerCase() == streetSuffix)
    ) {
      arrayOfPeople.push(e);
    }
  });
  people = arrayOfPeople;
  if (Object.keys(people).length < 2) {
    throw "Error: No neighbhours found :p";
  }
  return people;
}

async function sameBirthday(month, day) {
  validateParam(month);
  validateParam(day);
  let date = validateMonthDate(month, day);
  let arrayOfDates = [];
  const peopledata = await getPeople();
  peopledata.forEach((e) => {
    let d = e.date_of_birth.split("/");
    d = parseInt(d[0]) + "/" + d[1];
    if (d == date) {
      let name = e.first_name + " " + e.last_name;
      arrayOfDates.push(name);
    }
  });
  if (arrayOfDates.length == 0) {
    throw "Error: No person found";
  }
  return arrayOfDates;
}

function validateMonthDate(month, day) {
  let date;
  m = parseInt(month);
  d = parseInt(day);
  if (d < 1) {
    throw "Error: Day parameter is out of range";
  }
  if (
    (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) &&
    d <= 31
  ) {
    date = m + "/" + d;
  } else if ((m == 4 || m == 6 || m == 9 || m == 11) && d <= 30) {
    date = m + "/" + d;
  } else if (m == 2 && d <= 28) {
    date = m + "/" + d;
  } else {
    throw "Error: Month or Day parameter is out of range";
  }
  return date;
}

function validateParam(strnum) {
  if (!strnum) {
    throw "Error: Month or Day parameter missing";
  }
  if (typeof strnum == "string") {
    if (strnum.trim().length === 0) {
      throw "Error: Parameter cannot be just blanks";
    }
  }

  if (isNaN(strnum)) {
    throw "Error: Expected string of numbers or numbers in parameters";
  }
}

function validate(arg) {
  if (!arg) {
    throw "Error: expected at least one parameter";
  } else if (typeof arg != "string") {
    throw "Error: expected parameter of type string";
  } else if (arg.trim().length == 0) {
    throw "Error: string parameter cannot be empty spaces";
  }
}

async function manipulateSsn() {
  if (arguments.length > 0) throw "Error: Function takes no arguments";
  const peopledata = await getPeople();
  let sumArray = {};
  let maxMinSSN = [];
  let avgCount = 0;

  peopledata.forEach((e) => {
    avgCount++;
    let ssn = e.ssn.split("-").join("");
    ssn = sortAlphabets(ssn);
    maxMinSSN.push(parseInt(ssn));
    let arr = [];
    arr.push(e.first_name);
    arr.push(e.last_name);
    sumArray[parseInt(ssn)] = arr;
  });
  const s = maxMinSSN.reduce(addSum, 0);
  let avg = Math.floor(s / peopledata.length);
  let maxc = Math.max(...maxMinSSN);
  let minc = Math.min(...maxMinSSN);
  let person = findPerson(maxc, minc, sumArray, avg);
  return person;
}

function addSum(x, a) {
  return x + a;
}

function findPerson(maxc, minc, obj, avg) {
  let maxMinPerson = new Object();

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      if (key == maxc) {
        maxMinPerson["highest"] = {};
        maxMinPerson["highest"]["first_name"] = obj[key][0];
        maxMinPerson["highest"]["last_name"] = obj[key][1];
      }
      if (key == minc) {
        maxMinPerson["lowest"] = {};
        maxMinPerson["lowest"]["first_name"] = obj[key][0];
        maxMinPerson["lowest"]["last_name"] = obj[key][1];
      }
    }
  }
  maxMinPerson["average"] = avg;
  return maxMinPerson;
}

let sortAlphabets = function (str) {
  str = str.split("").sort().join("");
  return str;
};

module.exports = {
  getPersonById,
  sameStreet,
  sameBirthday,
  manipulateSsn,
};
