const mongoose = require("mongoose");
const { Schema } = mongoose;
const SubMountain = require("./SubMountain"); //sub document

const userActivitySchema = new Schema({
  name: String,
  description: String,
  startDate: Date,
  _userChallengeId: { type: Schema.Types.ObjectId, ref: "UserChallenge" },
  _userId: { type: Schema.Types.ObjectId, ref: "User" },
  _mountains: [ SubMountain ] // change to _climbed ?
});

mongoose.model("userActivities", userActivitySchema);
