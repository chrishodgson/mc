const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Challenge = mongoose.model("challenges");

module.exports = app => {
  /**
   * Get a list of all challenges (without _mountains)
   * TODO - replace with static reducer
   */
  app.get("/api/challenges", requireLogin, async (req, res) => {
    const challenges = await Challenge.find({}, {"_mountains": 0});
    res.send(challenges);
  });
};
