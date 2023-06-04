const express = require("express");
const { parseQueryBody } = require("../controllers/search");

const router = express.Router();

router.route("/").get(parseQueryBody); // render search page

// router.route("/");

module.exports = router;
