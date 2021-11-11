const { ObjectId } = require("bson");
const express = require("express");
const router = express.Router();
const restaurantFunc = require("./restaurants");
const data = require("../data");
const reviewsData = data.reviews;

router.get("/review/:id", async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ error: "You must supply an review Id" });
    return;
  }
  let validResult = validate(req.params.id);
  if (!validResult) {
    res
      .status(400)
      .json({ error: "Id must be a valid string and an Object Id" });
    return;
  }

  try {
    const getData = await reviewsData.get(req.params.id);
    res.json(getData);
  } catch (error) {
    res.status(404).json({ message: "Data not found " });
  }
});

router.get("/:id", async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ error: "You must supply an restaurant Id" });
    return;
  }
  let validResult = validate(req.params.id);
  if (!validResult) {
    res
      .status(400)
      .json({ error: "Id must be a valid string and an Object Id" });
    return;
  }

  try {
    const getData = await reviewsData.getAll(req.params.id);
    if (getData.length === 0) {
      res.status(404).json({ error: "Restaurant has no reviews" });
      return;
    }
    res.json(getData);
  } catch (error) {
    res.status(404).json({ message: "Data not found" });
  }
});

router.post("/:id", async (req, res) => {
  const reviewPostData = req.body;
  if (!reviewPostData.title) {
    res.status(400).json({ error: "You must provide title" });
    return;
  }
  if (!reviewPostData.reviewer) {
    res.status(400).json({ error: "You must provide a reviewer" });
    return;
  }
  if (!reviewPostData.rating) {
    res.status(400).json({ error: "You must provide rating" });
    return;
  }
  if (!reviewPostData.dateOfReview) {
    res.status(400).json({ error: "You must provide dateOfReview" });
    return;
  }
  if (!reviewPostData.review) {
    res.status(400).json({ error: "You must provide review" });
    return;
  }

  let validResult = validate(req.params.id);
  if (!validResult) {
    res
      .status(400)
      .json({ error: "Id must be a valid string and an Object Id" });
    return;
  }

  let validateString = validateArguments(
    reviewPostData.title,
    reviewPostData.reviewer,
    reviewPostData.rating,
    reviewPostData.dateOfReview,
    reviewPostData.review
  );

  if (validateString != undefined) {
    res.status(400).json({ error: validateString });
    return;
  }

  //check if restaurant exists
  try {
    const restaurantExists = restaurantFunc.get(req.params.id);
    if (!restaurantExists) throw "Error finding restaurants";
  } catch (error) {
    res.status(400).json({ error: "Restaurant not found" });
    return;
  }

  //check or insert review
  try {
    const { title, reviewer, rating, dateOfReview, review } = reviewPostData;

    const newReview = await reviewsData.create(
      req.params.id,
      title,
      reviewer,
      rating,
      dateOfReview,
      review
    );

    res.json(newReview);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.delete("/:id", async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ error: "You must supply an ID to delete" });
    return;
  }

  let validResult = validate(req.params.id);
  if (!validResult) {
    res
      .status(400)
      .json({ error: "Id must be a valid string and an Object Id" });
    return;
  }

  try {
    const deleteResult = await reviewsData.remove(req.params.id);
    res.json(deleteResult);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

//Validations
function validate(id) {
  if (typeof id != "string") {
    return false;
  } else if (id.trim().length === 0) {
    return false;
  } else if (!ObjectId.isValid(id)) {
    return false;
  } else return true;
}

function validateArguments(title, reviewer, rating, dateOfReview, review) {
  //string and empty spaces validator
  if (
    typeof title != "string" ||
    typeof reviewer != "string" ||
    typeof review != "string"
  ) {
    return "Parameter of defined type not found!";
  } else if (
    title.trim().length === 0 ||
    reviewer.trim().length === 0 ||
    review.trim().length === 0
  ) {
    return "Parameter cannot be blank spaces or empty values!";
  }
  //overall ratings validator
  if (typeof rating === "number") {
    if (!(rating >= 0 && rating <= 5)) {
      return "Rating should be between 0 to 5!";
    }
  } else {
    return "Rating should be a number!";
  }
  //date validator
  if (typeof dateOfReview === "string") {
    if (!isDateToday(dateOfReview.trim())) {
      return "Date must be today's date in MM/DD/YYYY format!";
    }
  } else {
    return "Date must be a string";
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

module.exports = router;
