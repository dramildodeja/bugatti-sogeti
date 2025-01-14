var express = require("express");
var twitterAnalysisInstance = require("./platforms/twitter");
var app = express();
var twitter = new twitterAnalysisInstance();
app.use(express.static('public'));
app.get('/results/:query', function (req, res) {
    twitter.getTwitterHashTagData(req.params.query, function (error, dataScores, twitterData) {
        if (error) console.log(error);
        res.write(JSON.stringify(twitterData));
        res.end(JSON.stringify(dataScores).toString());
    });
});
var youtubeAnalysisInstance = require("./platforms/youtube");
var youtube = new youtubeAnalysisInstance();
app.get('/results/youtube/:query', function (req, res) {
    youtube.getYoutubeVideoCommentsData(req.params.query, function (error, dataScores, youtubeData) {
        if (error) console.log(error);
        res.write(JSON.stringify(youtubeData));
        res.end(JSON.stringify(dataScores).toString());
    });
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("SearchOps is online on port " + port);
});
