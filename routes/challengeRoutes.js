const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Challenge = mongoose.model("challenges");
const UserChallenge = mongoose.model("userChallenges");

module.exports = app => {
  // get challenges
  app.get("/api/challenges", requireLogin, async (req, res) => {
    //todo: restrict by user logged in - {'_users._user': req.user._id}
    const challenges = await Challenge.find();
    res.send(challenges);
  });

  // join challenge
  app.post("/api/challenges", requireLogin, async (req, res) => {
    const { id } = req.body;

    console.log(id, 'POST api/challenges');

    const challenge = await Challenge.findById(id);
    // const challenge = await Challenge.findOne({_id: id} );
    
    let userChallenge = await UserChallenge.findOne({_user: req.user._id, _challenge: id});
    if (userChallenge) {
      console.log('userChallenge already exists', 'POST api/challenges');
      return;
    }
    
    userChallenge = new UserChallenge({
      title: challenge.title,
      climbedCount: 0,
      remainingCount: challenge._mountains.length,
      _mountainsClimbed: challenge._mountains,
      _challenge: id,
      _user: req.user._id,
    });
    
    try {
      await userChallenge.save();
      console.log('saved', 'POST api/challenges');
      res.send({});
    } catch (e) {
      console.log('error ' + e, 'POST api/challenges');
      res.status(422).send(err);
    }
  });
};
