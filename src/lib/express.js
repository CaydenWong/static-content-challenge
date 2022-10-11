const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const marked = require("marked");
const utils = require("./utils");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/styles.css", (req, res) => {
  res.sendFile(path.join(__dirname, "../styles.css"));
});

app.get("*", async (req, res) => {
  const templateString = await fs.promises.readFile(path.join(__dirname, "../template.html"), "utf8");
  try {
    const mdContent = await utils.getMarkDownContent(req.path);
    const outputHtml = templateString.replace("{{content}}", marked.parse(mdContent))
    res.send(outputHtml)
  } catch (err) {
    return res.status(404).send("NO content found")
  }
});

module.exports = app