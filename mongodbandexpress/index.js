const connection = require("./config/mongoConnection");
const restaurants = require("./data/restaurants");

const main = async () => {
  let firstRestaurant, secondRestaurant, thirdRestaurant, firstWebsite;

  //create a new restaurant
  try {
    firstRestaurant = await restaurants.create(
      "Mirazur1111111",
      "Menton, France",
      "123-456-5476",
      "http://www.mirazur.com",
      "$$$$",
      ["French", "Italian"],
      5,
      { dineIn: true, takeOut: false, delivery: false }
    );
  } catch (error) {
    console.log(error);
  }

  //log the created restaurant
  if (firstRestaurant) console.log(firstRestaurant);

  //Create another restaurant
  try {
    secondRestaurant = await restaurants.create(
      "Noma",
      "Copenhagen, Denmark",
      "123-456-6677",
      "http://www.noma-denmark.com",
      "$$$$",
      ["French", "Continental"],
      3.2,
      { dineIn: true, takeOut: false, delivery: false }
    );
  } catch (error) {
    console.log(error);
  }

  //get all restaurants
  try {
    const allRestaurants = await restaurants.getAll();
    console.log(allRestaurants);
  } catch (error) {
    console.log(error);
  }

  //Create 3rd restaurant
  try {
    thirdRestaurant = await restaurants.create(
      "Attica",
      "Melbourne, Australia",
      "123-456-5466",
      "http://www.attica.com",
      "$$$$",
      ["Australian", "Italian"],
      4,
      { dineIn: true, takeOut: false, delivery: false }
    );
  } catch (error) {
    console.log(error);
  }

  //Log the newly created 3rd restaurant
  if (thirdRestaurant) console.log(thirdRestaurant);

  //Rename the first restaurant website
  try {
    if (firstRestaurant) {
      firstWebsite = await restaurants.rename(
        firstRestaurant._id.toString(),
        "http://www.mirazur-exotic.com"
      );
    }
  } catch (error) {
    console.log(error);
  }

  //Log the first restaurant with the updated website.
  if (firstWebsite) console.log(firstWebsite);

  //Remove the second restaurant you created.
  try {
    if (secondRestaurant) {
      const renamedSaffronLounge = await restaurants.remove(
        secondRestaurant._id.toString()
      );
      console.log(renamedSaffronLounge);
    }
  } catch (error) {
    console.log(error);
  }

  //Query all restaurants, and log them all
  try {
    const allRestaurants = await restaurants.getAll();
    console.log(allRestaurants);
  } catch (error) {
    console.log(error);
  }

  //Try to create a restaurant with bad input parameters to make sure it throws errors.
  try {
    const newRestaurant = await restaurants.create(
      "Ultraviolet",
      "Shanghai, China",
      "123-456-XXXX",
      "http://www.ultraviolet.com",
      "$$$$",
      ["Chinese", "Italian"],
      3,
      { dineIn: true, takeOut: true, delivery: false }
    );
  } catch (error) {
    console.log(error);
  }

  //Try to remove a restaurant that does not exist to make sure it throws errors.
  try {
    const renamedSaffronLounge = await restaurants.remove(
      secondRestaurant._id.toString()
    );
  } catch (error) {
    console.log(error);
  }

  //Try to rename a restaurant that does not exist to make sure it throws errors.
  try {
    const newWebsite = "http://www.Lafayette.com";
    const firstWebsite = await restaurants.rename(
      secondRestaurant._id.toString(),
      newWebsite
    );
  } catch (error) {
    console.log(error);
  }

  //Try to rename a restaurant passing in invalid data for the parameter to make sure it throws errors.
  try {
    const firstWebsite = await restaurants.rename(123, "http://www.Mira.com");
  } catch (error) {
    console.log(error);
  }

  //Try getting a restaurant by ID that does not exist to make sure it throws errors.
  try {
    const renamedSaffronLounge = await restaurants.get(
      secondRestaurant._id.toString()
    );
  } catch (error) {
    console.log(error);
  }

  //close the connections
  const db = await connection();
  await db._connection.close();
};

main().catch((error) => {
  console.log(error);
});
