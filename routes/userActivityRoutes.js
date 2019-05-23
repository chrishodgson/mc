const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const UserActivity = mongoose.model("userActivities");

module.exports = app => {
  // get user activities - TODO add paging parameter
  app.get("/api/userActivities", requireLogin, async (req, res) => {
    const userActivities = await UserActivity.find({ _userId: req.user._id });
    res.send(userActivities);
  });

  // add activity
  app.post("/api/userActivities", requireLogin, async (req, res) => {
    const {
      details: { name, description, startDate },
      mountains,
      userChallengeId
    } = req.body;
    
    let userChallenge = await UserChallenge.findById({ userChallengeId });

    if (userChallenge) {
      console.log('ERROR - User challenge not found', 'POST api/userActivities');
      return;
    }

    //map mountains
    // const mountainItems = { 
    //   _userChallengeMountainId: userChallengeMountainId,
    //   _userChallengeId: userChallengeId,
    // };
    //userChallenge._climbed.push(mountainItems);
    //userChallenge._climbedCount;
    //userChallenge._remainingCount;

    const userActivity = new UserActivity({
      name,
      description,
      startDate,
      _userChallengeId: userChallengeId,
      _userId: req.user._id,
      _mountains: mountains
    });

    try {
      await userActivity.save();
      //await userChallenge.save();
      res.send({});
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
