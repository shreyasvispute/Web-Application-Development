const { ObjectId } = require("bson");
const mongoCollections = require("../config/mongoCollections");
const restaurant = mongoCollections.restaurants;
const restaurantFunc = require("./restaurants");
const uuid = require("uuid");

async function get(reviewId = checkParameters()) {
  validate(reviewId);
  reviewId = reviewId.trim();
  let pId = ObjectId(reviewId);
  let restaurants = await restaurantFunc.getAllInfo();
  let res;

  restaurants.forEach((element) => {
    element.reviews.forEach((x) => {
      if (x._id.toString() == pId.toString()) {
        res = x;
      }
    });
  });

  if (!res) throw "No review found with that id";

  return res;
}

async function create(
  restaurantId,
  title,
  reviewer,
  rating,
  dateOfReview,
  review = checkParameters()
) {
  validate(restaurantId);
  validateArguments(title, reviewer, rating, dateOfReview, review);

  restaurantId = restaurantId.trim();
  title = title.trim();
  reviewer = reviewer.trim();
  dateOfReview = dateOfReview.trim();
  review = review.trim();

  let newReview = {
    _id: new ObjectId(),
    title,
    reviewer,
    rating,
    dateOfReview,
    review,
  };
  let pId = ObjectId(restaurantId);

  const restaurantCollection = await restaurant();

  const addReview = await restaurantCollection.updateOne(
    { _id: pId },
    { $push: { reviews: newReview } }
  );

  if (!addReview) throw "Cannot add review";

  let avg = await calculateAvg(restaurantId);
  const updateRating = await restaurantCollection.updateOne(
    { _id: pId },
    { $set: { overallRating: avg } }
  );
  if (!updateRating) throw "Cannot update rating";

  return await restaurantFunc.get(restaurantId);
}

//function to calculate rating average
async function calculateAvg(restaurantId = checkParameters()) {
  let ratingsArray = [];

  const averageRestaurant = await restaurantFunc.getAllInfo();
  if (averageRestaurant) {
    averageRestaurant.forEach((x) => {
      if (x._id.toString() == restaurantId) {
        x.reviews.forEach((y) => {
          ratingsArray.push(y.rating);
        });
      }
    });
  }

  let totalRatings = 0;
  ratingsArray.forEach((x) => {
    totalRatings += x;
  });

  if (ratingsArray.length <= 0) return 0;

  return totalRatings / ratingsArray.length;
}

async function getAll(restaurantId = checkParameters()) {
  validate(restaurantId);

  const restaurantList = await restaurantFunc.get(restaurantId);
  return restaurantList.reviews;
}

async function remove(reviewId = checkParameters()) {
  validate(reviewId);
  reviewId = reviewId.trim();
  let pId = ObjectId(reviewId);
  let deleteVal = {};
  const restaurantCollection = await restaurant();

  //calculate rating average
  const restaurants = await restaurantFunc.getAllInfo();
  let res;
  let restaurantID;
  restaurants.forEach((element) => {
    element.reviews.forEach((x) => {
      if (x._id.toString() == reviewId) {
        restaurantID = element._id;
        res = element._id;
      }
    });
  });

  if (!res) throw "Review Id not found";

  const restaurantObject = await restaurantCollection.updateOne(
    { _id: restaurantID },
    {
      $pull: { reviews: { _id: pId } },
    }
  );

  if (restaurantObject.modifiedCount === 0) {
    throw "Could not delete the review";
  } else {
    let avg = await calculateAvg(res);
    let restId = ObjectId(res);

    const updateRating = await restaurantCollection.updateOne(
      { _id: restId },
      { $set: { overallRating: avg } }
    );

    if (!updateRating) throw "Cannot update rating";

    deleteVal["reviewId"] = reviewId;
    deleteVal["deleted"] = true;
  }
  return deleteVal;
}

function validate(id) {
  if (typeof id != "string") {
    throw "Argument of type string expected";
  }
  if (id.trim().length === 0) {
    throw "String cannot be blanks or empty";
  }
  if (!ObjectId.isValid(id)) {
    throw "Object Id is not valid";
  }
}

function validateArguments(title, reviewer, rating, dateOfReview, review) {
  if (
    typeof title != "string" ||
    typeof reviewer != "string" ||
    typeof review != "string"
  ) {
    throw "Parameter of defined type not found";
  } else if (
    title.trim().length === 0 ||
    reviewer.trim().length === 0 ||
    review.trim().length === 0
  ) {
    throw "Parameter cannot be blank spaces or empty values";
  }
  //overall ratings validator
  if (typeof rating === "number") {
    if (!(rating >= 0 && rating <= 5)) {
      throw "Rating should be between 0 to 5";
    }
  } else {
    throw "Rating should be a number";
  }
  if (typeof dateOfReview === "string") {
    if (!isDateToday(dateOfReview.trim())) {
      throw "Date must be today's date in MM/DD/YYYY format";
    }
  } else {
    throw "Date must be a string";
  }
}

//check valid date; function reused from tutorialspoint's comment
let isDateToday = (someDate) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  if (today === someDate) {
    return true;
  }
  return false;
};

//check parameters validator
const checkParameters = () => {
  throw "Expected arguments not found";
};

module.exports = {
  get,
  create,
  getAll,
  remove,
};
