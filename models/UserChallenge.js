const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserActivityMountainItem = require("./embedded/UserActivityMountainItem"); //embedded document

/**
 * indexes on _userId and _challengeId {_userId: 1, _challengeId: 1}
 */
const userChallengeSchema = new Schema({
  title: String,
  climbedCount: Number,
  remainingCount: Number,
  mountainCount: Number,
  _mountainListId: { type: Schema.Types.ObjectId, ref: "MountainList" },
  _challengeId: { type: Schema.Types.ObjectId, ref: "Challenge" },
  _userId: { type: Schema.Types.ObjectId, ref: "User" },
  _climbed: [ UserActivityMountainItem ]
});

mongoose.model("userChallenges", userChallengeSchema);
