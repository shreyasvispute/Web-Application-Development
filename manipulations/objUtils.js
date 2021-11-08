function computeObjects(obj, func) {
  if (!Array.isArray(obj)) {
    throw "Error: Expecting array of objects as input to function";
  }
  if (typeof func != "function" || func == null) {
    throw "Error: expecting function";
  }
  let result = {};
  for (const key in obj) {
    if (typeof obj[key] != "object" && Object.keys(obj).length === 0) {
      throw "Error:Expecting objects or objects length is 0";
    }
    if (Object.hasOwnProperty.call(obj, key)) {
      const element = obj[key];
      for (const k in element) {
        if (Object.hasOwnProperty.call(element, k)) {
          const e = element[k];
          if (!(k in result)) {
            result[k] = func(e);
          } else {
            result[k] += func(element[k]);
          }
        }
      }
    }
  }
  return result;
}

function commonKeys(obj1, obj2) {
  let result = {};
  let reArr;
  if (
    typeof obj1 == null ||
    typeof obj1 == undefined ||
    typeof obj2 == null ||
    typeof obj2 == undefined
  ) {
    throw "Error: Object is null or undefined";
  }
  if (typeof obj1 != "object" || typeof obj2 != "object") {
    throw "Error: Input only accepts objects";
  }
  if (Object.keys(obj1).length === 0 || Object.keys(obj1).length === 0) {
    return result;
  }
  const recurse = (obj1, obj2) => {
    Object.keys(obj1).forEach(function (key) {
      if (typeof obj1[key] == "object") {
        reArr = key;
        recurse(obj1[key], obj2[key]);
      }
      if (typeof obj2[key] == "object") {
        reArr = key;
        recurse(obj1[key], obj2[key]);
      }
      if (obj1[key] == obj2[key] && key == key) {
        if (reArr != "" && reArr != undefined) {
          let obj = new Object({});
          obj[key] = obj1[key];
          result[reArr] = obj;
          reArr = "";
        } else {
          return (result[key] = obj1[key]);
        }
      } else {
        return result.toString();
      }
    });
  };

  recurse(obj1, obj2);
  return result;
}

function flipObject(obj) {
  let result = {};
  let rearr;
  if (typeof obj != "object" || obj == null || obj == undefined) {
    throw "Error: Input only accepts objects; null or undefined detected";
  }
  if (Object.keys(obj).length <= 0) {
    throw "Error: Expected atleast one Key-Value pair";
  }
  let recursive = (obj1) => {
    let obj = new Object({});
    let arrobj = new Object({});
    let check = false;
    Object.keys(obj1).forEach(function (key) {
      if (Array.isArray(obj1[key])) {
        obj1[key].forEach((element) => {
          check = true;
          result[element] = key;
        });
      } else if (typeof obj1[key] == "object") {
        rearr = key;
        return recursive(obj1[key]);
      }
      if (rearr != "" && rearr != undefined && check == false) {
        obj[obj1[key]] = key;
        result[rearr] = obj;
        reArr = "";
      } else {
        if (!Array.isArray(obj1[key])) result[obj1[key]] = key;
      }
    });
  };

  recursive(obj);
  return result;
}

module.exports = {
  computeObjects,
  commonKeys,
  flipObject,
};
