const express = require("express");
const { getHomePage } = require("../controllers/home");

const router = express.Router();

router.route("/").get(getHomePage);

module.exports = router;
