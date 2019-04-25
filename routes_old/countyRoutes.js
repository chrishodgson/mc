const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const County = mongoose.model("counties");

module.exports = app => {
  app.get("/api/counties", requireLogin, async (req, res) => {
    const Counties = await County.find();
    res.send(Counties);
  });
};
