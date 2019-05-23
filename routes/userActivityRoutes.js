const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const UserActivity = mongoose.model("userActivities");

hydrateUserChallenge(userChallenge, mountains) {

  // let officersIds = officers.map(function (officer) {
  //   return officer.id
  // });
    //TODO - for each mountain: 
    // 1. check if mountain already climbed and if not increment _userChallengeId.climbedCount and decrement _userChallengeId.remainingCount
    // 2. push sub document per mountain { _mountainId: , _userActivityId: userActivity._id }

    //map mountains
    // const mountainItems = { 
    //   _userChallengeMountainId: userChallengeMountainId,
    //   _userChallengeId: userChallengeId,
    // };
    //userChallenge._climbed.push(mountainItems);
    //userChallenge._climbedCount;
    //userChallenge._remainingCount;

    console.log(userChallenge);
    return userChallenge;
}

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
      userChallenge = hydrateUserChallenge(userChallenge, mountains);
      //await userChallenge.save();
      res.send({});
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
