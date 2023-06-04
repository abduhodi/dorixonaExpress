const path = require("path");

function absPath(page) {
  return path.resolve(__dirname, "../views", `${page}.ejs`);
}

module.exports = {
  absPath,
};
