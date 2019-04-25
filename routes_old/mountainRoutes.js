const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Mountain = mongoose.model("mountains");

module.exports = app => {
  //search mountains
  app.get("/api/mountains", requireLogin, async (req, res) => {
    console.log(req.query, "query");
    const { term, country } = req.query;
    const regex = new RegExp(term, "i");
    const criteria = country
      ? { name: regex, countryCode: country }
      : { name: regex };
    const mountains = await Mountain.find(criteria).select(
      "name metres gridRef easting northing"
    );
    res.send(mountains);
  });
};
