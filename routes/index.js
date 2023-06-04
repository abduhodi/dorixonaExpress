const express = require("express");
const { getErrorPage } = require("../controllers/home");

const router = express.Router();

// Home Router
router.use("/", require("./home"));

// Insert Data Router
router.use("/insert", require("./insert"));

// Mount Pharmacies Router
router.use("/pharmacies", require("./pharmacies"));

// Mount Regions Router
router.use("/regions", require("./regions"));

// Mount Districts Router
router.use("/districts", require("./districts"));

// Mount Types Router
router.use("/types", require("./types"));

// Mount Medicines Router
router.use("/medicines", require("./medicines"));

// Mount Stocks Router
router.use("/stocks", require("./stocks"));

// Mount Search Router
router.use("/search", require("./search"));

// Error page
router.use(getErrorPage);

module.exports = router;
