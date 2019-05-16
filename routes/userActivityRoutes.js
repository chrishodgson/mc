const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const UserActivity = mongoose.model("userActivities");

module.exports = app => {
  // get user activities - TODO paging
  app.get("/api/userActivities", requireLogin, async (req, res) => {
    const activities = await Activity.find({ _userId: req.user._id });
    res.send(activities);
  });

  // add activity
  app.post("/api/userActivities", requireLogin, async (req, res) => {
    const {
      activityDetails: { title, description, startDate },
      mountains
    } = req.body;
    const mountainItems = mountains.map(mountain => {
      return {
        _mountain: mountain._id,
        name: mountain.name,
        northing: mountain.northing,
        easting: mountain.easting,
        gridRef: mountain.gridRef,
        metres: mountain.metres
      };
    });
    const UserActivity = new userActivity({
      _userId: req.user._id,
      //_userChallengeId
      title,
      description,
      startDate,
      mountainCount: mountainItems.length,
      _mountains: mountainItems
    });

    try {
      await activity.save();
      res.send({});
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
