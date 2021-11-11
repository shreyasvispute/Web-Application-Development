const peopleRoutes = require("./people");
const stockRoutes = require("./stocks");

const constructorMethod = (app) => {
  app.use("/people", peopleRoutes);
  app.use("/stocks", stockRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Path Not Found" });
  });
};

module.exports = constructorMethod;
