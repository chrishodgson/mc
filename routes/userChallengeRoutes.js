const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Challenge = mongoose.model("challenges");
const UserChallenge = mongoose.model("userChallenges");

module.exports = app => {
  /**
   * Get single User Challenges (with _climbed) - do we need this ?
   */
  // app.get("/api/userChallengeClimbed", requireLogin, async (req, res) => {
  //   const { userChallengeId } = req.body,
  //         userChallengeClimbed = await UserChallenge.findById(userChallengeId, { _climbed: 1 });
  //   res.send(userChallengeClimbed);
  // });


  /**
   * Get all User Challenges
   */
  app.get("/api/userChallenges", requireLogin, async (req, res) => {  
    // const userChallenges = await UserChallenge.find({_userId: req.user._id}, { _climbed: 0 });
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
      console.log('ERROR - already joined challenge ' + challenge.title, 'POST api/userChallenges');
      return;
    }
    
    userChallenge = new UserChallenge({
      title: challenge.name,
      climbedCount: 0,
      mountainCount: challenge.mountainCount,
      remainingCount: challenge.mountainCount,
      _mountainListId: challenge._mountainListId,
      _challengeId: challengeId,
      _userId: req.user._id,
      _climbed: []
    });
    
    try {
      await userChallenge.save();
      console.log('joined challenge ' + challenge.title, 'POST api/userChallenges');
      res.send({});
    } catch (e) {
      console.log('ERROR - ' + e, 'POST api/userChallenges');
      res.status(422).send(e);
    }
  });
};
