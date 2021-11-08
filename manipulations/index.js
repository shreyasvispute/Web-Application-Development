const arrUtils = require("./arrayUtils");
const strUtils = require("./stringUtils");
const objUtils = require("./objUtils");

////#region stringUtils
// try {
//   // Should Pass
//   const sortstring = strUtils.sortString("  a");
//   console.log("sortString passed successfully");
// } catch (e) {
//   console.error("sortString failed test case ");
// }
// try {
//   // Should Fail
//   const Sortstring = strUtils.sortString(123);
//   console.error("sortString did not error");
// } catch (e) {
//   console.log("sortString failed successfully");
// }

// try {
//   // Should Pass
//   const replacechar = strUtils.replaceChar("Daddy", 2);
//   console.log("replaceChar passed successfully");
// } catch (e) {
//   console.error("replaceChar failed test case ");
// }
// try {
//   // Should Fail
//   const Replacechar = strUtils.replaceChar("foobar", 0);
//   console.error("replaceChar did not error");
// } catch (e) {
//   console.log("replaceChar failed successfully ");
// }

// try {
//   // Should Pass
//   const mashup = strUtils.mashUp("hello", "wor", "#");
//   console.log("mashUp passed successfully");
// } catch (e) {
//   console.error("mashUp failed test case ");
// }
// try {
//   // Should Fail
//   const Mashup = strUtils.mashUp("John");
//   console.error("mashUp did not error");
// } catch (e) {
//   console.log("mashUp failed successfully");
// }

//#region Arrays
// try {
//   // Should Pass
//   const average = arrUtils.average([[100]]);
//   console.log("average passed successfully");
//   console.log(average);
// } catch (e) {
//   console.error("average failed test case ");
// }
// try {
//   // Should Fail
//   const Average = arrUtils.average("banana");
//   console.error("average did not error");
// } catch (e) {
//   console.log("average failed successfully");
// }

// try {
//   // Should Pass
//   const medianElement = arrUtils.medianElement([5, 6, 9, 2]);
//   console.log(medianElement);
//   console.log("medianElement passed successfully");
// } catch (e) {
//   console.error("medianElement failed test case ");
// }
// try {
//   // Should Fail
//   const MedianElement = arrUtils.medianElement([1, 2, "nope"]);
//   console.error("medianElement did not error");
// } catch (e) {
//   console.log("medianElement failed successfully");
// }

// try {
//   // Should Pass
//   const modeSquared = arrUtils.modeSquared([1, 2, 3, 3, 4]);
//   console.log("modeSquared passed successfully");
// } catch (e) {
//   console.error("modeSquared failed test case ");
// }
// try {
//   // Should Fail
//   const ModeSquared = arrUtils.modeSquared();
//   console.error("modeSquared did not error");
// } catch (e) {
//   console.log("modeSquared failed successfully");
// }

// try {
//   // Should Pass
//   const merge = arrUtils.merge(["b", "a", "c"], [3, "a", 19, 1]);
//   console.log(merge);
//   console.log("merge passed successfully");
// } catch (e) {
//   console.error("merge failed test case ");
// }
// try {
//   // Should Fail
//   const Merge = arrUtils.merge([null, null, null], [null, null, null]);
//   console.error("merge did not error");
// } catch (e) {
//   console.log("merge failed successfully");
// }
// //#endregion

// //#region Objects
// try {
//   // Should Pass
//   const first = { x: 2, y: 3 };
//   const second = { a: 70, x: 4, z: 5 };
//   const ComputeObjects = objUtils.computeObjects([first, second], (x) => x * 2);
//   console.log("computeObjects passed successfully");
// } catch (e) {
//   console.error("computeObjects failed test case ");
// }
// try {
//   // Should Fail
//   const ComputeObjects = objUtils.computeObjects({}, "2");
//   console.error("computeObjects did not error");
//   console.log(ComputeObjects);
// } catch (e) {
//   console.log("computeObjects failed successfully");
// }

// try {
//   // Should Pass
//   const first = { a: 2, b: 4 };
//   const second = { a: 5, b: 4 };
//   const commonKeys = objUtils.commonKeys(first, second);
//   console.log("commonKeys passed successfully");
// } catch (e) {
//   console.error("commonKeys failed test case ");
// }
// try {
//   // Should Fail
//   const first = { a: 2, b: 4 };
//   const second = { a: 5, b: 4 };
//   const CommonKeys = objUtils.commonKeys(null, null);
//   console.error("commonKeys did not error");
// } catch (e) {
//   console.log("commonKeys failed successfully");
// }

// try {
//   // Should Pass
//   const flipObject = objUtils.flipObject({
//     a: 3,
//     b: 7,
//     c: { x: 1, d: [1, 2, 3] },
//   });
//   console.log("flipObject passed successfully");
// } catch (e) {
//   console.error("flipObject failed test case ");
// }
// try {
//   // Should Fail
//   const flipObject = objUtils.flipObject(null);
//   console.error("flipObject did not error");
// } catch (e) {
//   console.log("flipObject failed successfully");
// }

//#endregion
