const mongoCollections = require("../config/mongoCollections");
const bcrypt = require("bcryptjs");
const users = mongoCollections.users;

const salt = 5;

async function createUser(username, password = checkParameters()) {
  username = username.trim();
  password = password.trim();
  username = username.toLowerCase();
  validate(username, password);

  let result = {};
  const hashedPassword = await bcrypt.hash(password, salt).catch(function (e) {
    throw "Error while hashing!";
  });

  let loginInfo = {
    username,
    password: hashedPassword,
  };

  const usersCollection = await users().catch(function (e) {
    throw "InternalServerError";
  });

  const uniqueIndex = await usersCollection.createIndex(
    { username: 1 },
    { unique: true }
  );

  const addUser = await usersCollection
    .insertOne(loginInfo)
    .catch(function (e) {
      throw "Username already exists";
    });

  if (addUser.insertedInfo === 0) throw "Error adding new user";
  result.userInserted = true;

  return result;
}

async function checkUser(username, password = checkParameters()) {
  username = username.trim();
  password = password.trim();
  let uname = username.toLowerCase();
  validate(username, password);

  let result = {};

  const userCollection = await users();
  const checkData = await userCollection.findOne({ username: uname });

  if (checkData === null) throw "Either the username or password is invalid";

  const comparePasswords = await bcrypt
    .compare(password, checkData.password)
    .catch(function (e) {
      throw "Error while comparing hashes " + e;
    });

  if (comparePasswords) {
    result.authenticated = true;
  } else {
    throw "Either the username or password is invalid";
  }

  return result;
}

function validate(username, password) {
  if (typeof username != "string" || typeof password != "string")
    throw "Error: Username or password must be string";
  if (username.length === 0 || username.length < 4)
    throw "Error: Username cannot be empty or length should be atleast 4 chars long";
  else if (/\s/.test(username)) throw "Error: Username cannot contain spaces";
  if (checkAlphanumerics(username)) {
    throw "Error: Username only accepts alphanumerics";
  }

  if (password.trim().length === 0 || password.length < 6)
    throw "Error: Password cannot be blanks or length should be atleast 6 chars long";
  else if (/\s/.test(password)) throw "Error: Password cannot contain spaces";
}

//check parameters validator
const checkParameters = () => {
  throw "Expected arguments not found";
};

function checkAlphanumerics(phrase) {
  let str = phrase;
  const checker = /[^a-z0-9]/g;
  if (checker.test(str)) {
    return true;
  }
}

module.exports = {
  createUser,
  checkUser,
};
