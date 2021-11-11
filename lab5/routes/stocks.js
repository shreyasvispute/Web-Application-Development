const express = require("express");
const router = express.Router();
const data = require("../data");
const stocksData = data.stocks;

router.get("/", async (req, res) => {
  try {
    const stocks = await stocksData.getStocks();
    res.json(stocks);
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
    const stocks = await stocksData.getStockById(req.params.id);
    res.json(stocks);
  } catch (error) {
    res.status(404).json({ message: "Data not found" });
  }
});

module.exports = router;
