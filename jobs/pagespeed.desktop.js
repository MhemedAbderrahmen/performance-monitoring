var cron = require("node-cron");
var axios = require("axios");
var fs = require("fs");

module.exports = () => {
  cron.schedule("* * * * *", async () => {
    console.log("Ruunning Cron");
    const response = await axios.get(
      process.env.PAGESPEED_API_URL +
        "url=" +
        process.env.URL +
        "&category=performance&strategy=desktop"
    );
    const responseData = {
      date: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
      score: response.data.lighthouseResult.categories.performance.score * 100,
      "first-contentful-paint":
        response.data.lighthouseResult.audits["first-contentful-paint"]
          .numericValue,
      "largest-contentful-paint":
        response.data.lighthouseResult.audits["largest-contentful-paint"]
          .numericValue,
      "cumulative-layout-shift":
        response.data.lighthouseResult.audits["cumulative-layout-shift"]
          .numericValue,
      "speed-index":
        response.data.lighthouseResult.audits["speed-index"].numericValue,
      interactive:
        response.data.lighthouseResult.audits["interactive"].numericValue,
    };

    var data = fs.readFileSync("performance-check.json");
    var myObject = JSON.parse(data);
    myObject.push(responseData);
    var newData = JSON.stringify(myObject);

    fs.writeFile("./performance-check.json", newData, "utf8", function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }
      console.log("JSON file has been saved.");
    });
  });
};
