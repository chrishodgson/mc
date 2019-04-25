const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Challenge = mongoose.model("challenges");

module.exports = app => {
  //get challenges
  app.get("/api/challenges", requireLogin, async (req, res) => {
    //todo: restrict by user logged in - {'_users._user': req.user._id}
    const challenges = await Challenge.find();
    res.send(challenges);
  });

  //add challenge
  app.post("/api/challenges", requireLogin, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const userItem = { _user: req.user._id, name: req.user.name, admin: true };
    const challenge = new Challenge({
      _users: [userItem],
      title
    });

    try {
      await challenge.save();
      res.send({});
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
