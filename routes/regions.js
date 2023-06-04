const express = require("express");
const {
  getAllRegions,
  getSingleRegion,
  addRegion,
  updateRegion,
  deleteRegion,
} = require("../controllers/regions");

const router = express.Router();

// Get All Regions
// Add New Region
router.route("/").get(getAllRegions).post(addRegion);

// GetSingle Region
// Update Region
// Delete Region
router
  .route("/:id")
  .get(getSingleRegion)
  .put(updateRegion)
  .delete(deleteRegion);

module.exports = router;
