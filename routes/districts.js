const express = require("express");
const {
  getAllDistricts,
  getSingleDistrict,
  addDistrict,
  updateDistrict,
  deleteDistrict,
} = require("../controllers/districts");

const router = express.Router();

// Get All Districts
// Add New District
router.route("/").get(getAllDistricts).post(addDistrict);

// GetSingle District
// Update District
// Delete District
router
  .route("/:id")
  .get(getSingleDistrict)
  .put(updateDistrict)
  .delete(deleteDistrict);

module.exports = router;
