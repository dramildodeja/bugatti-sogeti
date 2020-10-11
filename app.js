var express = require("express");
var twitterAnalysisInstance = require("./platforms/twitter");
var app = express();
var twitter = new twitterAnalysisInstance();
var score;
app.use(express.static('public'));
app.get('/results/:query', function (req, res) {
    twitter.getTwitterHashTagData(req.params.query, function (error, dataScores, twitterData) {
        if (error) console.log(error);
        res.write(JSON.stringify(twitterData));
        res.end(JSON.stringify(dataScores).toString());
    });
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Real time data analyzer is online on port " + port);
});
