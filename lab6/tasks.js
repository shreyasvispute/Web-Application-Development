const dbConnection = require("./config/mongoConnections");
const data = require("./data");
const restaurants = data.restaurants;
const reviews = data.reviews;

async function main() {
  const db = await dbConnection();
  await db._db.dropDatabase();

  try {
    const restaurant = await restaurants.create(
      "Attica",
      "Melbourne, Australia",
      "123-456-5466",
      "http://www.attica.com",
      "$$$$",
      ["Australian", "Italian"],
      { dineIn: true, takeOut: false, delivery: false }
    );
  } catch (error) {
    console.log(error);
  }

  try {
    const restaurant = await restaurants.create(
      "Ultraviolet",
      "Shanghai, China",
      "123-456-4566",
      "http://www.ultraviolet.com",
      "$$$$",
      ["Chinese", "Italian"],
      { dineIn: true, takeOut: true, delivery: false }
    );

    const id = restaurant._id;

    await reviews.create(
      id,
      "This place was great!",
      "scaredycat",
      1,
      "10/28/2021",
      "This place was great!"
    );
    await reviews.create(
      id,
      "This place was great!",
      "scaredycat",
      3,
      "10/28/2021",
      "This place was great!"
    );
  } catch (error) {
    console.log(error);
  }

  try {
    const restaurant = await restaurants.create(
      "Le Chef",
      "NYC, New York",
      "123-456-5466",
      "http://www.le-chef.com",
      "$$$$",
      ["Australian", "Italian"],
      { dineIn: true, takeOut: false, delivery: false }
    );

    const id = restaurant._id;

    await reviews.create(
      id,
      "This place was great!",
      "scaredycat",
      1,
      "10/28/2021",
      "This place was great!"
    );
    await reviews.create(
      id,
      "This place was great!",
      "scaredycat",
      3,
      "10/28/2021",
      "This place was great!"
    );
  } catch (error) {
    console.log(error);
  }

  try {
    const restaurant = await restaurants.create(
      "Mira",
      "Sydney, Australia",
      "123-456-5466",
      "http://www.Miraj.com",
      "$$$$",
      ["Australian", "Italian"],
      { dineIn: true, takeOut: false, delivery: false }
    );

    const id = restaurant._id;

    await reviews.create(
      id,
      "This place was great!",
      "scaredycat",
      2,
      "10/28/2021",
      "This place was great!"
    );
    await reviews.create(
      id,
      "This place was great!",
      "scaredycat",
      5,
      "10/28/2021",
      "This place was great!"
    );
  } catch (error) {
    console.log(error);
  }

  console.log("Done seeding database");

  await db._connection.close();
}

main();
