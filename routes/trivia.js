const express = require("express");

// triviaRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /trivia.
const triviaRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the trivia.
triviaRoutes.route("/trivia").get(function (req, res) {
  let db_connect = dbo.getDb("trivia");
  db_connect
    .collection("questions")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Get a single trivia object by index
triviaRoutes.route("/trivia/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { index: req.params.id };
  db_connect.collection("questions").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you get a single trivia object by id
triviaRoutes.route("/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("questions").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = triviaRoutes;
