var express = require("express");
var router = express.Router();
var fs = require("fs");
var axios = require("axios");
/* GET home page. */
router.get("/", async function (req, res, next) {
  var responseDates = await axios.get(
    process.env.BASE_URL + "performance/dates"
  );
  var responseFcp = await axios.get(process.env.BASE_URL + "performance/fcp");
  var responseSpeedIndex = await axios.get(
    process.env.BASE_URL + "performance/speed-index"
  );
  var responseScore = await axios.get(
    process.env.BASE_URL + "performance/score"
  );
  var responseInteractive = await axios.get(
    process.env.BASE_URL +"performance/interactive"
  );
  const dates = responseDates.data.date;
  const speedIndex = responseSpeedIndex.data.speedIndex;
  const score = responseScore.data.score;
  const firstContentfulPaint = responseFcp.data.firstContentfulPaint;
  const interactive = responseInteractive.data.interactive;
  res.render("index", {
    dates: dates,
    firstContentfulPaint: firstContentfulPaint,
    speedIndex: speedIndex,
    score: score,
    interactive:interactive
  });
});

module.exports = router;
