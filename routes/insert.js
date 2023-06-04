const express = require("express");
const { getInsertPage } = require("../controllers/insert");

const router = express.Router();

router.route("/").get(getInsertPage);

module.exports = router;
