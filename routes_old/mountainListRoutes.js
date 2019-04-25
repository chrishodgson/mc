const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const MountainList = mongoose.model("mountainLists");

module.exports = app => {
  //search mountain lists
  app.get("/api/mountainLists", requireLogin, async (req, res) => {
    console.log(req.query, "mountainLists query");
    const { country } = req.query;
    const criteria = country !== "UK" ? { countryCode: country } : {};
    const MountainLists = await MountainList.find(criteria);
    res.send(MountainLists);
  });
};
