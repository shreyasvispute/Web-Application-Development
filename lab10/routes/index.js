const loginRoutes = require("./login");
const signupRoutes = require("./signup");
const privateRoutes = require("./private");

const constructorMethod = (app) => {
  app.use("/", loginRoutes);
  app.use("/signup", signupRoutes);
  app.use("/private", privateRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Path Not Found" });
  });
};

module.exports = constructorMethod;
