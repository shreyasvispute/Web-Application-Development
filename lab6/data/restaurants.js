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
  serviceOptions = checkParameters()
) {
  validateArguments(
    name,
    location,
    phoneNumber,
    website.toLowerCase(),
    priceRange,
    cuisines,
    serviceOptions
  );

  name = name.trim();
  location = location.trim();
  phoneNumber = phoneNumber.trim();
  website = website.trim();
  priceRange = priceRange.trim();
  cuisines = cuisines.map((X) => X.trim());

  let newRestaurant = {
    name,
    location,
    phoneNumber,
    website,
    priceRange,
    cuisines,
    overallRating: 0,
    serviceOptions,
    reviews: [],
  };

  const restaurantCollection = await restaurant();

  // const insertIndex = await restaurantCollection.createIndex(
  //   { name: 1, location: 1, phoneNumber: 1 },
  //   { unique: true }
  // );

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

async function getAllInfo() {
  const restaurantCollection = await restaurant();

  const restaurantList = await restaurantCollection.find().toArray();

  return restaurantList;
}

async function getAll() {
  if (arguments.length > 0) throw "Function does not accepts any arguments";

  const restaurantCollection = await restaurant();

  const restaurantList = await restaurantCollection
    .find(
      {},
      {
        projection: { _id: 1, name: 1 },
      }
    )
    .toArray();
  if (restaurantList.length === 0) throw "No restaurants here";
  return restaurantList;
}

async function remove(id = checkParameters()) {
  validate(id);
  id = id.trim();
  let delresult = {};
  let pId = ObjectId(id);

  const restaurantCollection = await restaurant();
  const restaurantObject = await restaurantCollection.findOne({ _id: pId });

  let delRestaurant = await restaurantCollection.deleteOne({ _id: pId });

  if (delRestaurant.deletedCount === 0) {
    throw "Could not delete the restaurant";
  } else {
    delresult["restaurantId"] = restaurantObject._id;
    delresult["deleted"] = true;
  }
  return delresult;
}

async function update(
  id,
  name,
  location,
  phoneNumber,
  website,
  priceRange,
  cuisines,
  serviceOptions = checkParameters()
) {
  validate(id);

  id = id.trim();
  name = name.trim();
  location = location.trim();
  phoneNumber = phoneNumber.trim();
  website = website.trim();
  priceRange = priceRange.trim();
  cuisines = cuisines.map((X) => X.trim());

  validateArguments(
    name,
    location,
    phoneNumber,
    website.toLowerCase(),
    priceRange,
    cuisines,
    serviceOptions
  );

  validateWebsite(website.toLowerCase());
  let pId = ObjectId(id);

  const restaurantCollection = await restaurant();
  const getRestaurant = await get(pId.toString());

  const updateRestaurant = {
    name: name,
    location: location,
    phoneNumber: phoneNumber,
    website: website,
    priceRange: priceRange,
    cuisines: cuisines,
    serviceOptions: serviceOptions,
  };

  const updateInfo = restaurantCollection.updateOne(
    { _id: pId },
    { $set: updateRestaurant }
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
  update,
  remove,
  getAllInfo,
};
