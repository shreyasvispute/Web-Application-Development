const dbConnection = require("./config/mongoConnections");
const users = require("./data/users");

async function main() {
  try {
    const restaurant = await users.createUser("fame", "123456");
    console.log(restaurant);
  } catch (error) {
    console.log(error);
  }

  //   try {
  //     const restaurant = await users.checkUser("abcde", "1234565");
  //     console.log(restaurant);
  //   } catch (error) {
  //     console.log(error);
  //   }

  const db = await dbConnection();
  await db._connection.close();
}

main().catch(function (e) {
  console.log(e);
});
