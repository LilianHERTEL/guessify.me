const express = require("express");
const bodyParser = require("body-parser");
const connectdb = require("./../dbconnect");
const Reports = require("./../models/Report");

const router = express.Router();

//report
router.route("/").get((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;

  connectdb.then(db => {
    let data = Report.find({ message: "Anonymous" });
    Report.find({}).then(report => {
      res.json(report);
    });
  });
});

module.exports = router;
