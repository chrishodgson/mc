const mongoose = require("mongoose");
const { Schema } = mongoose;
const MountainItem = require("./MountainItem");

/**
 * do we need mountainCount as a separate field ??
 */
const activitySchema = new Schema({
  title: String,
  description: String,
  mountainCount: Number,
  startDate: Date,
  _challenge: { type: Schema.Types.ObjectId, ref: "Challenge" },
  _mountains: [MountainItem]
});

mongoose.model("activities", activitySchema);
