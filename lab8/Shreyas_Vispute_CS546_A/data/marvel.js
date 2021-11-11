const { default: axios } = require("axios");
const md5 = require("blueimp-md5");

async function getMarvelSearchCharacters(searchterm) {
  validate(searchterm);
  const publickey = "be3f31438c0d0dca365602ae44e1256e";
  const privatekey = "943eee94a11e331175bd7a9dbab6650308c4fab6";
  const ts = new Date().getTime();
  const stringToHash = ts + privatekey + publickey;
  const hash = md5(stringToHash);
  const baseUrl = "https://gateway.marvel.com:443/v1/public/characters";
  const url =
    baseUrl +
    "?nameStartsWith=" +
    searchterm +
    "&ts=" +
    ts +
    "&limit=20&apikey=" +
    publickey +
    "&hash=" +
    hash;

  const { data } = await axios.get(url);

  return data;
}

async function getMarvelCharacters(id) {
  validate(id);
  if (isNaN(Number(id))) {
    throw "Expected type Number";
  }
  const publickey = "be3f31438c0d0dca365602ae44e1256e";
  const privatekey = "943eee94a11e331175bd7a9dbab6650308c4fab6";
  const ts = new Date().getTime();
  const stringToHash = ts + privatekey + publickey;
  const hash = md5(stringToHash);
  const baseUrl = "https://gateway.marvel.com:443/v1/public/characters/";
  const url =
    baseUrl +
    id +
    "?ts=" +
    ts +
    "&limit=20&apikey=" +
    publickey +
    "&hash=" +
    hash;

  const { data } = await axios.get(url);
  return data;
}

function validate(arg) {
  if (!arg) {
    throw "Error: expected at least one parameter";
  } else if (typeof arg != "string") {
    throw "Error: expected parameter of type string";
  } else if (arg.trim().length == 0) {
    throw "Error: string parameter cannot be empty spaces";
  }
}

module.exports = { getMarvelCharacters, getMarvelSearchCharacters };
