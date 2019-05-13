const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Area = mongoose.model("areas");

module.exports = app => {
/**
 * Get all Areas
 */
app.get("/api/areas", requireLogin, async (req, res) => {
    const areas = await Area.find({});
    res.send(areas);
  });
};
