const mongoose = require("mongoose");
const { Schema } = mongoose;
const MountainItem = require("./embedded/MountainItem"); //embedded document

/**
 * indexes on _userId and _userChallengeId {_userId: 1, _userChallengeId: 1}
 */
const userActivitySchema = new Schema({
  title: String,
  description: String,
  startDate: Date,
  _userChallengeId: { type: Schema.Types.ObjectId, ref: "UserChallenge" },
  _userId: { type: Schema.Types.ObjectId, ref: "User" },
  _mountains: [ MountainItem ]
});

mongoose.model("userActivities", userActivitySchema);
