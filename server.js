const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

function requireHttps(req, res, next) {
  if (!req.secure && req.get("x-forwarded-proto")) {
    return res.redirect("https://" + res.get("host") + req.url);
  }
  next();
}
app.use(requireHttps);
app.use(require("./routes/trivia"));
const path = require("path");
app.use(express.static(path.join(__dirname, "client", "build")));
// get driver connection
const dbo = require("./db/conn");

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
