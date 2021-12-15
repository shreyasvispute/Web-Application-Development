const express = require("express");
const session = require("express-session");

const app = express();

const static = express.static(__dirname + "/public");

const configRoutes = require("./routes");
const exphbs = require("express-handlebars");

app.use("/public", static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: "AuthCookie",
    secret: "619349a0e0fd477d2b352be5",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

//private not allowed without username
app.use("/private", (req, res, next) => {
  if (!req.session.username) {
    return res.status(403).render("pages/error", {
      layout: false,
    });
  } else {
    next();
  }
});

//logging middleware
app.use(function (req, res, next) {
  userStatus = !req.session.username
    ? "Non-Authenticated User"
    : "Authenticated User";
  console.log(
    "[" +
      new Date().toUTCString() +
      "]:" +
      " " +
      req.method +
      " " +
      req.originalUrl +
      " (" +
      userStatus +
      ")"
  );
  next();
});
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
