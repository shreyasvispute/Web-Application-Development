const questionOne = function questionOne(arr) {
  const myObj = {};
  if (!arr) {
    //return if array is null
    return myObj;
  }
  //array values each func to check calculation and return object
  arr.forEach((x) => {
    //calc absolute value
    let calcNum = Math.abs(x * x - 7);
    //check is prime
    let boolVal = isPrime(calcNum);
    //add key and value to object
    myObj[calcNum] = boolVal;
  });
  return myObj;
};

//prime function to check prime numbers
const isPrime = (x) => {
  if (x < 1 || x == 0) return false;
  //factorization of numbers
  for (let i = 2; i < x; i++) {
    if (x % i === 0) return false;
  }
  return x > 1;
};

const questionTwo = function questionTwo(arr) {
  let res = [];
  //return if array is null
  if (!arr) {
    return res;
  }
  //create new array without duplicates
  res = checkDuplicates(arr);
  return res;
};

//check duplicates function
function checkDuplicates(arr) {
  let temp = [];
  let duplicate = [];
  arr.map((i) => {
    //check if new list already has the current element
    if (!temp.includes(i)) {
      //add if unique
      temp.push(i);
    }
  });
  return temp;
}

const questionThree = function questionThree(arr) {
  let strObj = {};
  //Check if array is missing
  if (!arr) {
    return strObj;
  }
  let stringArr = checkDuplicates(arr);
  //Loop to check if the letters in word 1 matches word 2
  stringArr.forEach((x) => {
    let alpbets = alphabets(x);
    strObj[alpbets] = strObj[alpbets] || [];
    strObj[alpbets].push(x);
  });
  //Delete the object with values 1
  for (const [key, value] of Object.entries(strObj)) {
    //debugger;
    if (value.length == 1) {
      delete strObj[key];
    }
  }
  return strObj;
};

//Convert words to letters
const alphabets = (x) => {
  return x.split("").sort().join("");
};

const questionFour = function questionFour(num1, num2, num3) {
  try {
    //Check for errors in params
    checkError(num1);
    checkError(num2);
    checkError(num3);

    //Calculate the factorials
    let n1 = fact(num1);
    let n2 = fact(num2);
    let n3 = fact(num3);

    let addN = num1 + num2 + num3;
    //Divide by 0 errors

    if (addN == 0) {
      throw "Divide by 0 error";
    }
    //Calculation logic
    let origAvg = addN / 3;
    let avg = (n1 + n2 + n3) / origAvg;
    return Math.floor(avg);
  } catch (error) {
    console.log(error);
  }
};

//Factorial check using recursion
const fact = (x) => {
  if (x == 0 || x == 1) {
    return 1;
  } else {
    return x * fact(x - 1);
  }
};
//Check errors for number less than 0
function checkError(n) {
  if (n < 0) {
    throw "Please enter numbers greater than 0";
  }
}

module.exports = {
  firstName: "Shreyas",
  lastName: "Vispute",
  studentId: "10456773",
  questionOne,
  questionTwo,
  questionThree,
  questionFour,
};
