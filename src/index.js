const app = require("./lib/express");
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("App listening on http://localhost:" + port);
});