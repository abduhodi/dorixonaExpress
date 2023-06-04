const express = require("express");
const {
  getAllPharmacies,
  addPharmacy,
  getSinglePharmacy,
  updatePharmacy,
  deletePharmacy,
} = require("../controllers/pharmacies");

const router = express.Router();

// Get All Pharmacies
// Add New Pharmacy
router.route("/").get(getAllPharmacies).post(addPharmacy);

// Get Single Pharmacy
// Update Pharmacy
// Delete Pharmacy
router
  .route("/:id")
  .get(getSinglePharmacy)
  .put(updatePharmacy)
  .delete(deletePharmacy);

module.exports = router;
