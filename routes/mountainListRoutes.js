const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const MountainList = mongoose.model("mountainLists");

module.exports = app => {
  /**
   * get single MountainList
   */
  app.get("/api/mountainList", requireLogin, async (req, res) => {
    const { mountainListId } = req.query, 
          mountainList = await MountainList.findById(mountainListId);
    res.send(mountainList);    
  });
};
