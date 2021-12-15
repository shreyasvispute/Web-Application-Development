const express = require("express");
const app = express();
const configRoutes = require("./routes");

configRoutes(app);
app.listen(8000, () => {
  console.log("server running...");
});
