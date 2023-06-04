const express = require("express");
const {
  getAllTypes,
  getSingleType,
  addType,
  updateType,
  deleteType,
} = require("../controllers/types");

const router = express.Router();

// Get All Types
// Add New Type
router.route("/").get(getAllTypes).post(addType);

// GetSingle Type
// Update Type
// Delete Type
router.route("/:id").get(getSingleType).put(updateType).delete(deleteType);

module.exports = router;
