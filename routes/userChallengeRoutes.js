const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Challenge = mongoose.model("challenges");
const UserChallenge = mongoose.model("userChallenges");

module.exports = app => {
  /**
   * Get a user challenge with the mountains from the challenge
   */
  app.get("/api/userChallenge", requireLogin, async (req, res) => {  
    const { challengeId } = req.query, 
          challenge = await Challenge.findById(challengeId),
          userChallenge = await UserChallenge.findOne({_user: req.user._id, _challenge: challengeId});

    console.log(userChallenge._mountainsClimbed, '_mountainsClimbed');
    console.log(challenge._mountains, '_mountains');

    res.send({userChallenge, challenge});    
  });

  /**
   * Join challenge (ie create a userChallenge)
   */
  app.post("/api/userChallenges", requireLogin, async (req, res) => {
    const { challengeId } = req.body,
          challenge = await Challenge.findById(challengeId);
    
    let userChallenge = await UserChallenge.findOne({_user: req.user._id, _challenge: challengeId});

    if (userChallenge) {
      console.log('already joined challenge ' + challenge.title, 'POST api/userChallenges');
      return;
    }
    
    userChallenge = new UserChallenge({
      title: challenge.title,
      climbedCount: 0,
      remainingCount: challenge._mountains.length,
      _challenge: challengeId,
      _user: req.user._id,
    });
    
    try {
      await userChallenge.save();
      console.log('joined challenge ' + challenge.title, 'POST api/userChallenges');
      res.send({});
    } catch (e) {
      console.log('error ' + e, 'POST api/userChallenges');
      res.status(422).send(err);
    }
  });
};
