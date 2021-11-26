const pRoutes = require("./dashboardRoutes");

const constructorMethod = (app) => {
  app.use("/", pRoutes);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Path not found" });
  });
};

module.exports = constructorMethod;
