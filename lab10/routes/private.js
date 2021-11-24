const express = require("express");
const router = express.Router();
const users = require("../data/users");

router.get("/", async (req, res) => {
  try {
    res.render("layouts/main", {
      username: req.session.username,
    });
  } catch (error) {
    res.status(404).json({ message: "Page not found" });
  }
});

module.exports = router;
