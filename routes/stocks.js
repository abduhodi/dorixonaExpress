const express = require("express");
const {
  getAllStocks,
  getSingleStock,
  addStock,
  updateStock,
  deleteStock,
} = require("../controllers/stocks");

const router = express.Router();

// Get All Stocks
// Add New Stock
router.route("/").get(getAllStocks).post(addStock);

// GetSingle Stock
// Update Stock
// Delete Stock
router.route("/:id").get(getSingleStock).put(updateStock).delete(deleteStock);

module.exports = router;
