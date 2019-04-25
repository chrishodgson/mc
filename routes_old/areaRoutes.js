const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Area = mongoose.model("areas");

module.exports = app => {
  app.get("/api/areas", requireLogin, async (req, res) => {
    const Areas = await Area.find();
    res.send(Areas);
  });
};
