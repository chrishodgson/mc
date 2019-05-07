const mongoose = require("mongoose");
const { Schema } = mongoose;
const ChallengeMinimal = require("./ChallengeMinimal");
const MountainMinimal = require("./MountainMinimal");

const activitySchema = new Schema({
  title: String,
  description: String,
  startDate: Date,
  _challenge: ChallengeMinimal,
  _mountains: [ MountainMinimal ],
  _user: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("activities", activitySchema);
