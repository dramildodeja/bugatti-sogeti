app.controller("main-ctrl", ["$scope", "$http", function ($scope, $http) {
    $scope.title = "Realtime Data Analyzer";
       $scope.getResponseFromTwitter = function () {
           $http.get("/results/" + $scope.searchInput).then(function (data) {
               var twitterData = data.data;
               twitterData = twitterData.split(/[{}]+/);
               var scores = "{" + twitterData[1] + "}";
               scores = JSON.parse(scores);
               var finalScores = [scores["Very Negative"], scores["Negative"], scores["Neutral"], scores["Positive"], scores["Very Positive"]];
               var canvas = document.getElementById('tweet-chart'),
                   ctx = canvas.getContext('2d'),
                   startingData = {
                       labels: ["Very Negative", "Negative", "Neutral", "Positive", "Very Positive"],
                       datasets: [
                           {
                               fillColor: "rgba(29,161,242,0.5)",
                               strokeColor: "rgba(220,220,220,1)",
                               pointColor: "rgba(220,220,220,1)",
                               pointStrokeColor: "#fff",
                               data: finalScores
                           }
                       ]
                   };
               var tweetChart = new Chart(ctx).Line(startingData, {animationSteps: 50});
               $scope.tweets = JSON.parse(twitterData[0]);
           });
       };

    $scope.getResponseFromYoutube = function () {
        var str = $scope.searchInput;
        var parameter = str.substr(str.search("/?v="), str.length).split("&");
        var vid="";
        parameter.forEach(function(item, index){
            if(item.includes("v=")){
                vid=item.split("=")[1];
            };
        });
        if (vid) {
            $http.get("/results/youtube/" + vid).then(function (data) {
                var youtubeData = data.data;
                youtubeData = youtubeData.split(/[{}]+/);
                var scores = "{" + youtubeData[1] + "}";
                scores = JSON.parse(scores);
                var finalScores = [scores["Very Negative"], scores["Negative"], scores["Neutral"], scores["Positive"], scores["Very Positive"]];
                var canvas = document.getElementById('tweet-chart'),
                    ctx = canvas.getContext('2d'),
                    startingData = {
                        labels: ["Very Negative", "Negative", "Neutral", "Positive", "Very Positive"],
                        datasets: [
                            {
                                fillColor: "rgba(29,161,242,0.5)",
                                strokeColor: "rgba(220,220,220,1)",
                                pointColor: "rgba(220,220,220,1)",
                                pointStrokeColor: "#fff",
                                data: finalScores
                            }
                        ]
                    };
                var youtubeChart = new Chart(ctx).Line(startingData, {animationSteps: 50});
                $scope.comment = JSON.parse(youtubeData[0]);
            });
        } else {
            $scope.comment =JSON.parse('{"error":"Please provide a valid video URL"}')
        };
    };
}]);