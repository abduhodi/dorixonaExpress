const { absPath } = require("../utils/absPath");

function getInsertPage(req, res) {
  try {
    res.render(absPath("insert"));
  } catch (error) {
    console.log("Error while rendering Insert Page");
    res.render(absPath("error"));
  }
}

module.exports = {
  getInsertPage,
};
