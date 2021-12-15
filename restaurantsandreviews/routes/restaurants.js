const { ObjectId } = require("bson");
const express = require("express");
const router = express.Router();
const data = require("../data");
const restaurantData = data.restaurants;

router.get("/", async (req, res) => {
  try {
    const getData = await restaurantData.getAll();
    res.json(getData);
  } catch (error) {
    res.status(404).json({ message: "Data not found" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let validResult = validate(req.params.id);
    if (!validResult) {
      res
        .status(400)
        .json({ error: "Id must be a valid string and an Object Id" });
      return;
    }
    const getData = await restaurantData.get(req.params.id);
    res.json(getData);
  } catch (error) {
    res.status(404).json({ message: "Data not found" });
  }
});

router.post("/", async (req, res) => {
  const restaurantPostData = req.body;
  if (!restaurantPostData.name) {
    res.status(400).json({ error: "You must provide name" });
    return;
  }
  if (!restaurantPostData.location) {
    res.status(400).json({ error: "You must provide location" });
    return;
  }
  if (!restaurantPostData.phoneNumber) {
    res.status(400).json({ error: "You must provide phone number" });
    return;
  }
  if (!restaurantPostData.website) {
    res.status(400).json({ error: "You must provide website" });
    return;
  }
  if (!restaurantPostData.priceRange) {
    res.status(400).json({ error: "You must provide price range" });
    return;
  }
  if (!restaurantPostData.cuisines) {
    res.status(400).json({ error: "You must provide cuisines" });
    return;
  }
  if (!restaurantPostData.serviceOptions) {
    res.status(400).json({ error: "You must provide service options" });
    return;
  }
  try {
    const {
      name,
      location,
      phoneNumber,
      website,
      priceRange,
      cuisines,
      serviceOptions,
    } = restaurantPostData;

    let validateString = validateArguments(
      name,
      location,
      phoneNumber,
      website,
      priceRange,
      cuisines,
      serviceOptions
    );

    if (validateString != undefined) {
      res.status(400).json({ error: validateString });
      return;
    }

    const newPost = await restaurantData.create(
      name,
      location,
      phoneNumber,
      website,
      priceRange,
      cuisines,
      serviceOptions
    );
    res.json(newPost);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.put("/:id", async (req, res) => {
  const updatedData = req.body;
  let validResult = validate(req.params.id);
  if (!validResult) {
    res
      .status(400)
      .json({ error: "Id must be a valid string and an Object Id" });
    return;
  }

  if (
    !updatedData.name ||
    !updatedData.location ||
    !updatedData.phoneNumber ||
    !updatedData.website ||
    !updatedData.priceRange ||
    !updatedData.cuisines ||
    !updatedData.serviceOptions
  ) {
    res.status(400).json({ error: "You must supply all fields" });
    return;
  }
  let validateString = validateArguments(
    updatedData.name,
    updatedData.location,
    updatedData.phoneNumber,
    updatedData.website,
    updatedData.priceRange,
    updatedData.cuisines,
    updatedData.serviceOptions
  );

  if (validateString != undefined) {
    res.status(400).json({ error: validateString });
    return;
  }

  try {
    await restaurantData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Restaurant not found" });
    return;
  }

  try {
    const updatedRestaurant = await restaurantData.update(
      req.params.id,
      updatedData.name,
      updatedData.location,
      updatedData.phoneNumber,
      updatedData.website,
      updatedData.priceRange,
      updatedData.cuisines,
      updatedData.serviceOptions
    );
    res.json(updatedRestaurant);
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
    await restaurantData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Restaurant not found" });
    return;
  }
  try {
    const deleteRestaurant = await restaurantData.remove(req.params.id);
    res.status(200).json(deleteRestaurant);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

function validate(id) {
  if (typeof id != "string") {
    return false;
  } else if (id.trim().length === 0) {
    return false;
  } else if (!ObjectId.isValid(id)) {
    return false;
  } else return true;
}

function validateArguments(
  name,
  location,
  phoneNumber,
  website,
  priceRange,
  cuisines,
  serviceOptions
) {
  if (
    typeof name != "string" ||
    typeof location != "string" ||
    typeof phoneNumber != "string" ||
    typeof website != "string" ||
    typeof priceRange != "string"
  ) {
    return "Parameter of defined type not found!";
  } else if (
    name.length === 0 ||
    priceRange.length === 0 ||
    location.length === 0 ||
    phoneNumber.length === 0 ||
    website.length === 0
  ) {
    return "Parameter cannot be blank spaces or empty values!";
  }
  //website validator
  if (typeof website === "string") {
    let start = website.startsWith("http://www.", 0);
    let end = website.endsWith(".com");

    let comCount = (website.match(/.com/g) || []).length;

    if (comCount > 1) {
      return "Website is malformed!";
    }

    if (!(start && end)) {
      return "Website needs to have a valid http://www. or .com!";
    }

    let middle = website.slice(11, website.length - 4);
    if (!(middle.length >= 5)) {
      return "Website name showld be greater than 5 chars!";
    }
  }
  //phone number validator ** REUSED from https://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number **
  if (typeof phoneNumber === "string") {
    let regexForPhone = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;
    if (!phoneNumber.match(regexForPhone)) {
      return "Phone number is not valid!";
    }
  }
  //price range validator
  if (
    typeof priceRange == "string" &&
    priceRange.length >= 1 &&
    priceRange.length < 5
  ) {
    let dollar = priceRange.split("");
    const isDollar = (x) => x === "$";
    if (!dollar.every(isDollar))
      return "price range takes only $-$$$$ as input!";
  } else {
    return "price range is more than $$$$!";
  }
  //cuisines validator
  if (Array.isArray(cuisines) && cuisines.length >= 1) {
    const isString = (x) => typeof x == "string" && x.trim().length != 0;
    if (!cuisines.every(isString)) {
      return "Cuisines must contain strings!";
    }
  } else {
    return "Cuisines must be an array having atleast 1 string!";
  }

  //service options validator
  if (typeof serviceOptions === "object") {
    if (
      typeof serviceOptions.dineIn != "boolean" ||
      typeof serviceOptions.takeOut != "boolean" ||
      typeof serviceOptions.delivery != "boolean"
    ) {
      return "Service options expects boolean true/false only or missing dineIn, takeOut or delivery fields!";
    }
    if (Object.keys(serviceOptions).length > 3) {
      return "Service options can be only DineIn, takeout or delivery!";
    }
  }
}

module.exports = router;
