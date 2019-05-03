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

    //const challenge = await Challenge.findById(id);
    const challenge = await Challenge.findOne({_id: id} );
    
    //todo: check that that we have not already joined (ie userChallenge doesnt exist)

    //TODO FIX ME _challenge is not an id 
    let userChallenge = await UserChallenge.findOne({_user: req.user._id, _challenge: id});
    if (userChallenge) {
      return;
    }
    
    userChallenge = new UserChallenge({
      title,
      climbedCount: 0,
      remainingCount: challenge._mountains,
      // _challenge: { _challenge: id, title: challenge.title },
      _mountainsClimbed: challenge._mountains,
      _user: req.user._id,
    });
    
    console.log(userChallenge, 'POST api/challenges 2');
    // try {
    //   await userChallenge.save();
    //   res.send({});
    // } catch (err) {
    //   res.status(422).send(err);
    // }
  });
};
