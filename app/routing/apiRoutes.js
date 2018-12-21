var friends = require("../data/friends");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
      var matchedFriend = {
        name: "",
        photo: "",
        differences: Infinity
      };

      var userScores = req.body.scores;

      for (var i = 0; i < friends.length; i++){
        var currentFriend = friends[i];
        var differences = 0;
        var currentFriendScores = friends[i].scores;

        for (var j = 0; j < currentFriendScores.length; j++) {
          differences += Math.abs(currentFriendScores[j] - userScores[j]);
        }
        //console.log("Difference between: " + currentFriend.name + "and " + req.body.name + " = " + differences);

        if (differences <= matchedFriend.differences) {
          matchedFriend.name = currentFriend.name;
          matchedFriend.photo = currentFriend.photo;
          matchedFriend.differences = differences;
        }
      }
      friends.push(req.body);
      res.json(matchedFriend);
  });
};
