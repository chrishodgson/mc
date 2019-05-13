const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Challenge = mongoose.model("challenges");

module.exports = app => {
  /**
   * Get all Challenges
   */
  app.get("/api/challenges", requireLogin, async (req, res) => {
    const challenges = await Challenge.find({});
    res.send(challenges);
  });
};
