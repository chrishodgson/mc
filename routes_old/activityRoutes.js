const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Activity = mongoose.model("activities");

module.exports = app => {
  //get activities
  app.get("/api/activities", requireLogin, async (req, res) => {
    //todo: restrict by user logged in - {'_users._user': req.user._id}
    // const activities = await Activity.find({ _users: req.user._id });
    const activities = await Activity.find();
    res.send(activities);
  });

  //add activity
  app.post("/api/activities", requireLogin, async (req, res) => {
    const {
      activityDetails: { title, description, minutes, hours, date },
      mountains
    } = req.body;
    const userItem = { _user: req.user._id, name: req.user.name, admin: true };
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
    const activity = new Activity({
      _users: [userItem],
      title,
      description,
      minutes,
      hours,
      date,
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
