var express = require("express");
var router = express.Router();
var axios = require("axios");
var fs = require("fs");
const fileName ="performance-check.json" 
/* GET performance dates. */
router.get("/dates", async function (req, res, next) {
    var data = await fs.readFileSync(fileName);
    var dataArray = JSON.parse(data);
    var date = [];
    dataArray.forEach((element) => {
        date.push(element["date"]);
    });
  
    return res.send({ status: 200, date });
});
/* GET performance speedindex. */
router.get("/speed-index", async function (req, res, next) {
  var data = await fs.readFileSync(fileName);
  var dataArray = JSON.parse(data);
  var speedIndex = [];
  dataArray.forEach((element) => {
    speedIndex.push(element["speed-index"]);
  });

  return res.send({ status: 200, speedIndex });
});

/* GET performance firstContentfulPaint. */
router.get("/fcp", async function (req, res, next) {
  var data = await fs.readFileSync(fileName);
  var dataArray = JSON.parse(data);
  var firstContentfulPaint = [];
  dataArray.forEach((element) => {
    firstContentfulPaint.push(element["first-contentful-paint"]);
  });

  return res.send({ status: 200, firstContentfulPaint });
});

/* GET performance interactive. */
router.get("/interactive", async function (req, res, next) {
  var data = await fs.readFileSync(fileName);
  var dataArray = JSON.parse(data);
  var interactive = [];
  dataArray.forEach((element) => {
    interactive.push(element["interactive"]);
  });

  return res.send({ status: 200, interactive });
});

/* GET performance score. */
router.get("/score", async function (req, res, next) {
  var data = await fs.readFileSync(fileName);
  var dataArray = JSON.parse(data);
  var score = [];
  dataArray.forEach((element) => {
    score.push(element["score"]);
  });

  return res.send({ status: 200, score });
});

module.exports = router;
