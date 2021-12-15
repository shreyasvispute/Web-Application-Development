const { ObjectId } = require("bson");
const mongoCollections = require("../config/mongoCollections");
const restaurant = mongoCollections.restaurants;

//es6 syntax for undefined parameter
async function get(id = checkParameters()) {
  validate(id);
  id = id.trim();

  let pId = ObjectId(id);

  const getRestaurant = await restaurant();
  const newId = await getRestaurant.findOne({ _id: pId });

  if (newId === null) throw "No restaurant with that id";
  newId._id = newId._id.toString();

  return newId;
}

async function create(
  name,
  location,
  phoneNumber,
  website,
  priceRange,
  cuisines,
  overallRating,
  serviceOptions = checkParameters()
) {
  validateArguments(
    name,
    location,
    phoneNumber,
    website.toLowerCase(),
    priceRange,
    cuisines,
    overallRating,
    serviceOptions
  );

  name = name.trim();
  location = location.trim();
  phoneNumber = phoneNumber.trim();
  website = website.trim();
  priceRange = priceRange.trim();
  let color = "yellow";
  cuisines = cuisines.map((X) => X.trim());
  let newRestaurant = {
    name,
    location,
    phoneNumber,
    website,
    priceRange,
    cuisines,
    overallRating,
    serviceOptions,
    color,
  };

  const restaurantCollection = await restaurant();

  const insertIndex = await restaurantCollection.createIndex(
    { name: 1, location: 1, phoneNumber: 1 },
    { unique: true }
  );

  const insertInfo = await restaurantCollection
    .insertOne(newRestaurant)
    .catch(function (e) {
      throw "Restaurant already exists!";
    });

  if (insertInfo.insertedCount === 0) throw "Could not add new restaurant";

  const newId = insertInfo.insertedId;

  const resto = await get(newId.toString());

  resto._id = resto._id.toString();

  return resto;
}

async function getAll() {
  if (arguments.length > 0) throw "Function does not accepts any arguments";
  const restaurantCollection = await restaurant();

  const restaurantList = await restaurantCollection.find().toArray();

  restaurantList.forEach((element) => {
    element._id = element._id.toString();
  });

  return restaurantList;
}

async function remove(id = checkParameters()) {
  validate(id);
  id = id.trim();
  let delresult = "";
  let pId = ObjectId(id);

  const restaurantCollection = await restaurant();
  const restaurantObject = await restaurantCollection.findOne({ _id: pId });

  let delRestaurant = await restaurantCollection.deleteOne({ _id: pId });

  if (delRestaurant.deletedCount === 0) {
    throw "Could not delete the restaurant";
  } else {
    delresult = `${restaurantObject.name} has been successfully deleted!`;
  }
  return delresult;
}

async function rename(id, newWebsite = checkParameters()) {
  validate(id);

  id = id.trim();
  newWebsite = newWebsite.trim();
  validateWebsite(newWebsite.toLowerCase());
  let pId = ObjectId(id);

  const restaurantCollection = await restaurant();
  const getRestaurant = await get(pId.toString());

  let website = getRestaurant.website;

  if (website.toLowerCase() === newWebsite.toLowerCase()) {
    throw "Website name is same!";
  }
  const updateSite = {
    website: newWebsite,
  };

  const updateInfo = restaurantCollection.updateOne(
    { _id: pId },
    { $set: updateSite }
  );
  if (updateInfo.modifiedCount === 0) throw "Could not update restaurant";

  const updatedRestaurant = await get(pId.toString());

  return updatedRestaurant;
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

function validateArguments(
  name,
  location,
  phoneNumber,
  website,
  priceRange,
  cuisines,
  overallRating,
  serviceOptions
) {
  if (
    typeof name != "string" ||
    typeof location != "string" ||
    typeof phoneNumber != "string" ||
    typeof website != "string" ||
    typeof priceRange != "string"
  ) {
    throw "Parameter of defined type not found";
  } else if (
    name.length === 0 ||
    priceRange.length === 0 ||
    location.length === 0 ||
    phoneNumber.length === 0 ||
    website.length === 0
  ) {
    throw "Parameter cannot be blank spaces or empty values";
  }
  //website validator
  if (typeof website === "string") {
    validateWebsite(website);
  }
  //phone number validator ** REUSED from https://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number **
  if (typeof phoneNumber === "string") {
    let regexForPhone = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;
    if (!phoneNumber.match(regexForPhone)) {
      throw "Phone number is not valid";
    }
  }
  //price range validator
  if (
    typeof priceRange == "string" &&
    priceRange.length >= 1 &&
    priceRange.length < 5
  ) {
    let dollar = priceRange.split("");
    dollar.forEach((x) => {
      if (x != "$") throw "price range takes only $-$$$$ as input";
    });
  } else {
    throw "price range is more than $$$$";
  }
  //cuisines validator
  if (Array.isArray(cuisines) && cuisines.length >= 1) {
    cuisines.forEach((x) => {
      if (typeof x != "string") throw "Cuisines must contain strings";
      if (x.trim().length === 0) throw "Cuisines cannot be blanks or empty";
    });
  } else {
    throw "Cuisines must be an array having atleast 1 string";
  }
  //overall ratings validator
  if (typeof overallRating === "number") {
    if (!(overallRating >= 0 && overallRating <= 5)) {
      throw "Rating should be between 0 to 5";
    }
  } else {
    throw "Rating should be a number";
  }

  //service options validator
  if (typeof serviceOptions === "object") {
    if (
      typeof serviceOptions.dineIn != "boolean" ||
      typeof serviceOptions.takeOut != "boolean" ||
      typeof serviceOptions.delivery != "boolean"
    ) {
      throw "Service options expects boolean true/false only or missing dineIn, takeOut or delivery fields";
    }
    if (Object.keys(serviceOptions).length > 3) {
      throw "Service options can be only DineIn, takeout or delivery";
    }
  }
}

function validateWebsite(website) {
  let start = website.startsWith("http://www.", 0);
  let end = website.endsWith(".com");

  let comCount = (website.match(/.com/g) || []).length;

  if (comCount > 1) {
    throw "Website is malformed";
  }

  if (!(start && end)) {
    throw "Website needs to have a valid http://www. or .com";
  }

  let middle = website.slice(11, website.length - 4);
  if (!(middle.length >= 5)) {
    throw "Website name showld be greater than 5 chars";
  }
}
//check parameters validator
const checkParameters = () => {
  throw "Expected arguments not found";
};

module.exports = {
  create,
  getAll,
  get,
  rename,
  remove,
};
