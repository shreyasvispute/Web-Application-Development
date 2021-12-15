const express = require("express");
const router = express.Router();
const users = require("../data/users");

router.get("/", async (req, res) => {
  try {
    if (req.session.username) {
      return res.redirect("/private");
    }
    res.render("pages/login", { layout: false });
  } catch (error) {
    res.status(404).json({ message: "Page not found" });
  }
});

router.post("/login", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (!username) {
    res.status(400).render("pages/login", {
      layout: false,
      errorval: true,
      error: "Username is required",
    });
    return;
  }
  if (!password) {
    res.status(400).render("pages/login", {
      layout: false,
      errorval: true,
      error: "Password is required",
    });
    return;
  }
  username = username.toLowerCase();

  try {
    validate(username, password);

    const validateUser = await users.checkUser(username, password);
    if (validateUser.authenticated === true) {
      req.session.username = username;
      res.redirect("/private");
    }
  } catch (e) {
    res.status(400).render("pages/login", {
      layout: false,
      errorval: true,
      error: e,
    });
  }
});

router.get("/logout", async (req, res) => {
  try {
    req.session.destroy();
    res.render("pages/logout", { layout: false });
  } catch (error) {
    res.status(404).json({ message: "Page not found" });
  }
});

function validate(username, password) {
  if (typeof username != "string" || typeof password != "string")
    throw "Error: Username or password must be string";
  if (username.length === 0 || username.length < 4)
    throw "Error: Username cannot be empty or length should be atleast 4 chars long";
  else if (/\s/.test(username)) throw "Error: Username cannot contain spaces";
  if (checkAlphanumerics(username)) {
    throw "Error: Username only accepts alphanumerics";
  }
  if (password.trim().length === 0 || password.length < 6)
    throw "Error: Password cannot be blanks or length should be atleast 6 chars long";
  else if (/\s/.test(password)) throw "Error: Password cannot contain spaces";
}

function checkAlphanumerics(phrase) {
  let str = phrase;
  const checker = /[^a-z0-9]/g;
  if (checker.test(str)) {
    return true;
  }

  return false;
}

module.exports = router;
