const _ = require("lodash");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const UserActivity = mongoose.model("userActivities");
const UserChallenge = mongoose.model("userChallenges");

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
    
    let userChallenge = await UserChallenge.findById(userChallengeId);

    if (!userChallenge) {
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
      userChallenge = hydrateUserChallenge(userChallenge, mountains, userActivity._id);
      await userChallenge.save();
      console.log('added activity ' + userActivity.name, 'POST api/userActivities');
      res.send({});
    } catch (e) {
      console.log('ERROR - ' + e, 'POST api/userActivities');
      res.status(422).send(e);
    }
  });

  //todo move elsewhere
  const hydrateUserChallenge = (userChallenge, mountains, userActivityId) => {
    mountains.forEach(mountain => { 
      let climbedCount = userChallenge.climbedCount || 0,
          remainingCount = userChallenge.climbedCount || 0,
          found = _.find(userChallenge._climbed, { _mountainId: mountain._mountainId });
  
      if (!found) {
        climbedCount++;
        remainingCount--;  
      }

      userChallenge.climbedCount = climbedCount;
      userChallenge.remainingCount = remainingCount;  
      userChallenge._climbed.push({ 
        _mountainId: mountain._id, 
        _userActivityId: userActivityId
      });    
    });
    return userChallenge;
  }  
};
