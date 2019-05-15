const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Challenge = mongoose.model("challenges");
const UserChallenge = mongoose.model("userChallenges");

module.exports = app => {
  /**
   * Get all User Challenges
   */
  app.get("/api/userChallenges", requireLogin, async (req, res) => {  
    const userChallenges = await UserChallenge.find({_userId: req.user._id});
    res.send(userChallenges);    
  });

  /**
   * Create a  User Challenge
   */
  app.post("/api/userChallenges", requireLogin, async (req, res) => {

    const { challengeId } = req.body,
          challenge = await Challenge.findById(challengeId);
    
    let userChallenge = await UserChallenge.findOne({_userId: req.user._id, _challengeId: challengeId});

    if (userChallenge) {
      console.log('already joined challenge ' + challenge.title, 'POST api/userChallenges');
      return;
    }
    
    userChallenge = new UserChallenge({
      name: challenge.name,
      remainingCount: challenge.mountainCount,
      _mountainListId: challenge._mountainListId,
      _challengeId: challengeId,
      _userId: req.user._id,
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
