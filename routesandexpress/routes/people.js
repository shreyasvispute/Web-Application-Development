const express = require("express");
const router = express.Router();
const data = require("../data");
const peopleData = data.people;

router.get("/", async (req, res) => {
  try {
    const getData = await peopleData.getPeople();
    res.json(getData);
  } catch (error) {
    res.status(404).json({ message: "Data not found" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (req.params.id.trim().length <= 0) {
      res.status(400).json({ message: "Id must not be blank spaces" });
      return;
    }
    const getData = await peopleData.getPersonById(req.params.id);
    res.json(getData);
  } catch (error) {
    res.status(404).json({ message: "Data not found" });
  }
});

module.exports = router;
