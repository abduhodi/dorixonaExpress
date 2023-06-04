const { absPath } = require("../utils/absPath");

function getHomePage(req, res) {
  try {
    res.render(absPath("index"), { data: false });
  } catch (error) {
    res.render(absPath("error"));
  }
}

function getErrorPage(req, res) {
  try {
    res.render(absPath("error"));
  } catch (error) {
    res.render(absPath("error"));
  }
}

module.exports = {
  getHomePage,
  getErrorPage,
};
