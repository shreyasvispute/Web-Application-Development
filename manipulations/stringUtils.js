function checkStringErrors(str) {
  if (!(typeof str === "string")) {
    throw "Error: string expected";
  }
  if (str.length <= 0) {
    throw "Error: String length is 0";
  }
  if (!(str.trim().length > 0)) {
    throw "Error: String contains only spaces";
  }
}

function sortString(str) {
  checkStringErrors(str);
  let capitals = [];
  let small = [];
  let specials = [];
  let spaces = [];
  let numbers = [];
  for (let i in str) {
    let code = str.charCodeAt(i);
    if (str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 90) {
      capitals.push(str[i]);
    }
    if (str.charCodeAt(i) >= 97 && str.charCodeAt(i) < 122) {
      small.push(str[i]);
    }
    if (
      (code >= 33 && code <= 47) ||
      (code >= 58 && code <= 64) ||
      (code >= 91 && code <= 96) ||
      (code >= 123 && code <= 126)
    ) {
      specials.push(str[i]);
    }
    if (code == 32) {
      spaces.push(str[i]);
    }
    if (code >= 48 && code <= 57) {
      numbers.push(str[i]);
    }
  }
  capitals.sort();
  small.sort();
  specials.sort();
  numbers.sort();
  let result =
    capitals.join("") +
    small.join("") +
    specials.join("") +
    numbers.join("") +
    spaces.join("");
  return result;
}
// -2
function replaceChar(str, idx) {
  checkStringErrors(str);

  if (!(typeof idx === "number" && idx > 0 && idx < str.length - 2)) {
    throw "Error: Index is in improper range";
  }

  let before = str.charAt(idx - 1);
  let index = str.charAt(idx);
  let after = str.charAt(idx + 1);
  let replaceCount = 0;
  // ;) :0
  str = str.replace(index, "#");
  for (i in str) {
    if (replaceCount == 0) {
      str = str.replace(index, before);
      replaceCount = 1;
    } else {
      str = str.replace(index, after);
      replaceCount = 0;
    }
  }
  // ;) :0
  return str.replace("#", index);
}

function mashUp(string1, string2, char) {
  checkStringErrors(string1);
  checkStringErrors(string2);
  checkStringErrors(char);
  if (string1.length == string2.length) {
  } else if (string1.length < string2.length) {
    string1 = string1.padEnd(string2.length, char);
  } else {
    string2 = string2.padEnd(string1.length, char);
  }
  let result = "";
  for (i in (string1, string2)) {
    result += string1[i] + string2[i];
  }
  return result;
}

module.exports = {
  sortString,
  replaceChar,
  mashUp,
};
