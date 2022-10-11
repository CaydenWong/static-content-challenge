const fs = require("fs");
const path = require("path");

exports.getMarkDownContent = async (dirPath) => {
  return fs.promises.readFile(path.join(__dirname, "content", dirPath, "index.md"), "utf8");
}