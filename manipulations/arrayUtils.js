const { commonKeys } = require("./objUtils");

function CheckErrors(val, varName) {
  if (val == undefined) {
    throw "Error: Array is empty";
  }
  if (!Array.isArray(val)) {
    throw "Error: Expecting an array";
  }
  if (!(val.length > 0)) {
    throw "Error: Array is empty";
  }
}

function average(arr) {
  CheckErrors(arr);
  let count = 0;
  let avg = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length == 0) {
      throw "Error: Empty array or string found";
    }
    for (let j = 0; j < arr[i].length; j++) {
      if (typeof arr[i][j] == "number") {
        avg = avg + arr[i][j];
        count++;
      } else {
        throw "Error: Number is expected";
      }
    }
  }
  return Math.round(avg / 5);
}

function modeSquared(arr) {
  CheckErrors(arr);
  let result;
  let modeSquare = 0;
  let resultObj = [];

  arr.forEach(function (n) {
    if (typeof n != "number") {
      throw "Error: Array contains strings, undefined or null values";
    }
    let findMode = resultObj.find(function (e) {
      return e.n == n;
    });

    if (findMode) {
      findMode.count++;
      modeSquare = n;
      result = findMode;
    } else {
      resultObj.push({ n: n, count: 1 });
    }
  });
  modeSquare = result.n * result.n;
  return modeSquare;
}

function medianElement(arr) {
  CheckErrors(arr);
  let result = {};
  arr.forEach((x) => {
    if (typeof x != "number") {
      throw "Error: Array does not contain numbers";
    }
  });
  let sortArr = arr.map((x) => x);
  sortArr.sort(function (a, b) {
    return a - b;
  });
  let middle = Math.floor(sortArr.length / 2);
  if (sortArr.length % 2 == 0) {
    let val = (sortArr[middle - 1] + sortArr[middle]) / 2;
    result[arr[middle]] = val;
    return result;
  } else {
    let val = sortArr[middle];
    result[arr.indexOf(val)] = val;
    return result;
  }
}

function merge(arrayOne, arrayTwo) {
  CheckErrors(arrayOne);
  CheckErrors(arrayTwo);
  let result = [];

  let numbers = [];
  let chars = [];
  let capitals = [];
  arrayOne.forEach((a) => {
    if (typeof a == "string") {
      a = a.trim();
      if (a == a.toUpperCase()) {
        capitals.push(a);
      } else {
        chars.push(a);
      }
    } else if (typeof a == "number") {
      numbers.push(a);
    } else {
      throw "Error: Array contains undefined or null values";
    }
  });
  arrayTwo.forEach((b) => {
    if (typeof b == "string") {
      b = b.trim();
      if (b == b.toUpperCase()) {
        capitals.push(b);
      } else {
        chars.push(b);
      }
    } else if (typeof b == "number") {
      numbers.push(b);
    } else {
      throw "Error: Array contains undefined or null values";
    }
  });

  chars.sort();
  numbers.sort();
  capitals.sort();
  result = result.concat(chars);
  result = result.concat(capitals);
  result = result.concat(numbers);
  return result;
}

module.exports = {
  average,
  modeSquared,
  medianElement,
  merge,
};
