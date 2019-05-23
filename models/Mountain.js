const mongoose = require("mongoose");
const { Schema } = mongoose;

// used by subMountainSchema and subUserActivityMountainSchema
const mountainSchema = new Schema({
  dobihId: Number,
  name: String
});

mongoose.model("mountains", mountainSchema);
