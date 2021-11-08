const lab1 = require("./lab1");

//Question 1
console.log(lab1.questionOne([2]));
// should return and output: {'3': true}

console.log(lab1.questionOne([5, 3, 10]));
//returns and outputs: {'18': false, '2': true, '93': false}

console.log(lab1.questionOne([]));
// returns and outputs: {}

console.log(lab1.questionOne([-1, -2]));
// returns and outputs: { '3': true, '6': false }
console.log(lab1.questionOne());
// returns and outputs: {}

//Question 2
console.log(lab1.questionTwo([1, 2, 3, 2, 1]));
// should return and output: [1, 2, 3]

console.log(lab1.questionTwo([1, 1, 1, 1, 1, 1]));
//returns and outputs: [1]

console.log(lab1.questionTwo([1, "1", 1, "1", 2]));
// returns and outputs: [1, '1', 2]

console.log(lab1.questionTwo([3, "a", "b", 3, "1"]));
// returns and outputs: [3, 'a', 'b', '1']

console.log(lab1.questionTwo([]));
//returns and outputs: []

//Question 3
console.log(lab1.questionThree(["bar", "car", "car", "arc"]));
// should return and output: { acr: ["car", "arc"] }

console.log(lab1.questionThree(["cat", "act", "foo", "bar"]));
// returns and outputs: { act: ["cat", "act"] }

console.log(lab1.questionThree(["race", "care", "foo", "foo", "foo"]));
// returns and outputs: { acer: ["race", "care"] }

console.log(lab1.questionThree(["foo", "bar", "test", "Patrick", "Hill"]));
// returns and outputs: {}

console.log(lab1.questionThree([]));
// returns and outputs: {}

//Question 4
console.log(lab1.questionFour(1, 3, 2));
//returns and outputs: 4

console.log(lab1.questionFour(2, 5, 6));
//returns and outputs: 194

console.log(lab1.questionFour(0, 0, 0));
//returns and outputs:Divide by 0 error

console.log(lab1.questionFour(1, 2, 0));
//returns and outputs: 4

console.log(lab1.questionFour(12, 15, 116));
//returns and outputs: 7.118409827521461e+188
