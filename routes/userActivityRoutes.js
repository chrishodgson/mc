const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const UserActivity = mongoose.model("userActivities");

module.exports = app => {
  // get user activities - TODO paging
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
      res.send({});
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
