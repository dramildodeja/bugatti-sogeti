var youtube = function () {
    require('dotenv').config();
    var {google} = require('googleapis');
    var async = require('async');
    var sentiment = require("sentiment");
    this.getYoutubeVideoCommentsData = function (vid, callback) {
        var dataScore = {"Very Negative": 0, "Negative": 0, "Neutral": 0, "Positive": 0, "Very Positive": 0};
        var sum = 0;
        google.youtube("v3").commentThreads.list(
            {
                key: process.env.YOUTUBE_TOKEN,
                part: 'snippet',
                videoId: vid,
                maxResults: '100',
            }, function (error, comments, response) {
                var youtubeData = [];
                var sortedYoutubeData = [];
                if (error) callback(error);
                async.each(comments.data.items, function (item, callEach) {
                    var text = item.snippet.topLevelComment.snippet.textOriginal;
                    youtubeData.push(text);
                    var sentScore = sentiment(text, function (err, data) {
                        if (data.score < -4) {
                            sortedYoutubeData.unshift(text);
                            dataScore["Very Negative"] += 1;
                        } else if (data.score >= -3 && data.score < 0) {
                            sortedYoutubeData.splice(2, 0, text);
                            dataScore["Negative"] += 1;
                        } else if (data.score == 0) {
                            sortedYoutubeData.splice(3, 0, text);
                            dataScore["Neutral"] += 1;
                        } else if (data.score > 0 && data.score <= 3) {
                            sortedYoutubeData.splice(4, 0, text);
                            dataScore["Positive"] += 1;
                        } else {
                            sortedYoutubeData.push(text);
                            dataScore["Very Positive"] += 1;
                        }
                        callEach();
                    });
                }, function () {
                    callback(null, dataScore, sortedYoutubeData);
                });

            })
    }
}
module.exports = youtube;