const { default: axios } = require("axios");

async function getPeople() {
  const { data } = await axios
    .get(
      "https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json"
    )
    .catch(function (e) {
      throw "Error: Data connection error " + e.response.data;
    });

  return data;
}


async function getPersonById(userid) {
  validate(userid);
  const peopledata = await getPeople();
  let people = {};
  peopledata.forEach((e) => {
    if (e.id == userid.trim()) {
      people = e;
    }
  });
  if (Object.keys(people).length === 0) {
    throw "Error: Person not found";
  }
  return people;
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

module.exports = {
  getPeople,
  getPersonById,
};
