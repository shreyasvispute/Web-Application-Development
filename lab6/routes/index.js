const restaurantRoutes = require("./restaurants");
const reviewsRoutes = require("./reviews");

const constructorMethod = (app) => {
  app.use("/restaurants", restaurantRoutes);
  app.use("/reviews", reviewsRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Path Not Found" });
  });
};

module.exports = constructorMethod;
