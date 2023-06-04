const express = require("express");
const {
  getAllMedicines,
  addMedicine,
  getSingleMedicine,
  updateMedicine,
  deleteMedicine,
} = require("../controllers/medicines");

const router = express.Router();

// Get All Medicines
// Add New Medicine
router.route("/").get(getAllMedicines).post(addMedicine);

// Get Single Medicine
// Update Medicine
// Delete Medicine
router
  .route("/:id")
  .get(getSingleMedicine)
  .put(updateMedicine)
  .delete(deleteMedicine);

module.exports = router;
