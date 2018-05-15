//a POST routes /api/friends - this handles incoming survey results. will also used to handle the compatibility logic
//Load Data
let playerList = require('../data/friends.js');

module.exports = function(app){
  //a GET route that displays JSON of all possible friends
  app.get('/api/friends', function(req,res){
    res.json(playerList);
  });

  app.post('/api/friends', function(req,res){
    //grabs the new friend's scores to compare with friends in playerList array
    let newFriendScores = req.body.scores;
    let scoresArray = [];
    let friendCount = 0;
    let bestMatch = 0;

    //runs through all current friends in list
    for(let i=0; i<playerList.length; i++){
      let scoresDiff = 0;
      //run through scores to compare friends
      for(let j=0; j<newFriendScores.length; j++){
        scoresDiff += (Math.abs(parseInt(playerList[i].scores[j]) - parseInt(newFriendScores[j])));
      }

      //push results into scoresArray
      scoresArray.push(scoresDiff);
    }

    //after all friends are compared, find best match
    for(let i=0; i<scoresArray.length; i++){
      if(scoresArray[i] <= scoresArray[bestMatch]){
        bestMatch = i;
      }
    }

    //return bestMatch data
    let bff = playerList[bestMatch];
    res.json(bff);

    //pushes new submission into the friendsList array
    playerList.push(req.body);
  });
};